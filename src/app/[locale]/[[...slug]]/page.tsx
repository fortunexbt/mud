import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("../../../components/pages/about-page").then((mod) => mod.AboutPage));
const BlogIndexPage = dynamic(() => import("../../../components/pages/blog-index-page").then((mod) => mod.BlogIndexPage));
const BlogPostPage = dynamic(() => import("../../../components/pages/blog-post-page").then((mod) => mod.BlogPostPage));
const ClassesPage = dynamic(() => import("../../../components/pages/classes-page").then((mod) => mod.ClassesPage));
const ContactPage = dynamic(() => import("../../../components/pages/contact-page").then((mod) => mod.ContactPage));
const HomePage = dynamic(() => import("../../../components/pages/home-page").then((mod) => mod.HomePage));
const InquiryPage = dynamic(() => import("../../../components/pages/inquiry-page").then((mod) => mod.InquiryPage));
const PrivacyPage = dynamic(() => import("../../../components/pages/privacy-page").then((mod) => mod.PrivacyPage));
const TeamPage = dynamic(() => import("../../../components/pages/team-page").then((mod) => mod.TeamPage));
import { SiteFrame } from "../../../components/site/site-frame";
import { JsonLd } from "@/components/ui/json-ld";
import { getDictionary } from "@/content/site";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getPosts, getPostTranslations } from "@/lib/blog";
import { getMediaAsset } from "@/lib/media";
import { hasLeadRoutingConfigured } from "@/config/site";
import { isLocale, locales, type Locale } from "@/lib/i18n-config";
import { getNavItems, getPagePaths } from "@/lib/navigation";
import { getLocalizedPath, getRouteSegments, resolveRoute, type PageKey } from "@/lib/routes";
import { buildResolvedMetadata, resolveSocialMetadata } from "@/lib/social";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/lib/utils";
import { getManagedTeamMembers, getManagedFeaturedProfile } from "@/lib/team-content";

type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  const pageRoutes = locales.flatMap((locale) => {
    const pageKeys: PageKey[] = [
      "home",
      "about",
      "classes",
      "team",
      "inquiry",
      "blog",
      "contact",
      "privacy",
    ];

    return pageKeys.map((page) => ({
      locale,
      slug: page === "home" ? [] : getRouteSegments(locale, page),
    }));
  });

  const blogRoutes = (
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getPosts(locale);
        return posts.map((post) => ({
          locale,
          slug: [...getRouteSegments(locale, "blog"), post.slug],
        }));
      }),
    )
  ).flat();

  return [...pageRoutes, ...blogRoutes];
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam, slug = [] } = await params;
  const data = await resolveSocialMetadata({ localeParam, slug });

  return buildResolvedMetadata(data);
}

export default async function LocalizedPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, slug = [] } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const hasPlayedIntro = cookieStore.has("mud-intro-played");

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);
  const route = resolveRoute(locale, slug);

  if (!route) {
    notFound();
  }

  const currentPage: PageKey = route.type === "blogPost" ? "blog" : route.page;
  const paths = getPagePaths(locale);
  const navItems = getNavItems(locale, dictionary);
  const configured = hasLeadRoutingConfigured();
  const whatsappHref = buildWhatsAppUrl(locale, "general");

  let localePaths: Record<Locale, string> = {
    pt: getLocalizedPath("pt", currentPage),
    es: getLocalizedPath("es", currentPage),
    en: getLocalizedPath("en", currentPage),
  };

  let pageContent: ReactNode | null = null;
  const pageJsonLd = buildOrganizationJsonLd(locale);
  let extraJsonLd: Record<string, unknown> | null = null;

  if (route.type === "blogPost") {
    const post = await getPostBySlug(locale, route.slug);

    if (!post) {
      notFound();
    }

    const translations = await getPostTranslations(post.translationKey);
    localePaths = {
      pt: translations.find((entry) => entry.locale === "pt")
        ? getLocalizedPath("pt", "blog", { slug: translations.find((entry) => entry.locale === "pt")!.slug })
        : getLocalizedPath("pt", "blog"),
      es: translations.find((entry) => entry.locale === "es")
        ? getLocalizedPath("es", "blog", { slug: translations.find((entry) => entry.locale === "es")!.slug })
        : getLocalizedPath("es", "blog"),
      en: translations.find((entry) => entry.locale === "en")
        ? getLocalizedPath("en", "blog", { slug: translations.find((entry) => entry.locale === "en")!.slug })
        : getLocalizedPath("en", "blog"),
    };

    const posts = await getPosts(locale);
    const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

    pageContent = (
      <BlogPostPage
        locale={locale}
        dictionary={dictionary}
        paths={paths}
        whatsappHref={whatsappHref}
        configured={configured}
        post={post}
        relatedPosts={relatedPosts}
      />
    );

    extraJsonLd = buildBlogPostingJsonLd({
      title: post.title,
      description: post.excerpt,
      publishedAt: post.publishedAt,
      locale,
      path: getLocalizedPath(locale, "blog", { slug: post.slug }),
      image: getMediaAsset(post.cover).src.src,
    });
  } else {
    switch (route.page) {
      case "home": {
        const posts = await getPosts(locale);
        pageContent = (
          <HomePage
            locale={locale}
            dictionary={dictionary}
            paths={paths}
            whatsappHref={whatsappHref}
            configured={configured}
            posts={posts}
          />
        );
        break;
      }
      case "about":
        pageContent = <AboutPage locale={locale} dictionary={dictionary} paths={paths} whatsappHref={whatsappHref} configured={configured} />;
        break;
      case "classes":
        pageContent = <ClassesPage locale={locale} dictionary={dictionary} paths={paths} whatsappHref={whatsappHref} configured={configured} />;
        extraJsonLd = buildFaqJsonLd(dictionary.classes.faqs);
        break;
      case "team": {
        const [members, featuredMember] = await Promise.all([
          getManagedTeamMembers(locale),
          getManagedFeaturedProfile(locale),
        ]);
        pageContent = (
          <TeamPage
            locale={locale}
            dictionary={getDictionary(locale, {
              team: {
                featuredMember,
                members,
              },
            })}
            paths={paths}
            whatsappHref={whatsappHref}
            configured={configured}
          />
        );
        break;
      }
      case "inquiry":
        pageContent = (
          <InquiryPage
            locale={locale}
            dictionary={dictionary}
            paths={paths}
            whatsappHref={whatsappHref}
            configured={configured}
            initialInterest={
              typeof query.interest === "string" && ["adults", "kids", "oneOff", "wheel", "groups"].includes(query.interest)
                ? (query.interest as "adults" | "kids" | "oneOff" | "wheel" | "groups")
                : undefined
            }
          />
        );
        break;
      case "blog": {
        const posts = await getPosts(locale);
        pageContent = (
          <BlogIndexPage
            locale={locale}
            dictionary={dictionary}
            paths={paths}
            whatsappHref={whatsappHref}
            configured={configured}
            posts={posts}
          />
        );
        break;
      }
      case "contact":
        pageContent = <ContactPage locale={locale} dictionary={dictionary} paths={paths} whatsappHref={whatsappHref} configured={configured} />;
        break;
      case "privacy":
        pageContent = <PrivacyPage locale={locale} dictionary={dictionary} paths={paths} whatsappHref={whatsappHref} configured={configured} />;
        break;
    }
  }

  const breadcrumbs =
    route.type === "blogPost"
      ? buildBreadcrumbJsonLd([
          { name: dictionary.nav.home, url: absoluteUrl(siteConfig.url, paths.home) },
          { name: dictionary.nav.blog, url: absoluteUrl(siteConfig.url, paths.blog) },
          {
            name: (await getPostBySlug(locale, route.slug))?.title || dictionary.nav.blog,
            url: absoluteUrl(siteConfig.url, getLocalizedPath(locale, "blog", { slug: route.slug })),
          },
        ])
      : null;

  if (!pageContent) {
    notFound();
  }

  return (
      <SiteFrame
        hasPlayedIntro={hasPlayedIntro}
        locale={locale}
        dictionary={dictionary}
        currentPage={currentPage}
        navItems={navItems.map((item) => ({ ...item }))}
        localePaths={localePaths}
        instagramUrl={siteConfig.instagramUrl}
        whatsappHref={whatsappHref}
        privacyHref={paths.privacy}
        email={siteConfig.email || undefined}
        phone={siteConfig.whatsappNumber}
        addressLines={[
          siteConfig.address.street,
          `${siteConfig.address.neighborhood} - ${siteConfig.address.city}`,
          `CEP ${siteConfig.address.postalCode}`,
        ]}
      >
      <JsonLd data={pageJsonLd} />
      {extraJsonLd ? <JsonLd data={extraJsonLd} /> : null}
      {breadcrumbs ? <JsonLd data={breadcrumbs} /> : null}
      {pageContent}
    </SiteFrame>
  );
}
