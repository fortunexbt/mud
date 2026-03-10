import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AboutPage } from "../../../components/pages/about-page";
import { BlogIndexPage } from "../../../components/pages/blog-index-page";
import { BlogPostPage } from "../../../components/pages/blog-post-page";
import { ClassesPage } from "../../../components/pages/classes-page";
import { ContactPage } from "../../../components/pages/contact-page";
import { HomePage } from "../../../components/pages/home-page";
import { InquiryPage } from "../../../components/pages/inquiry-page";
import { PrivacyPage } from "../../../components/pages/privacy-page";
import { TeamPage } from "../../../components/pages/team-page";
import { SiteFrame } from "../../../components/site/site-frame";
import { JsonLd } from "@/components/ui/json-ld";
import { getDictionary } from "@/content/site";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getPosts, getPostTranslations } from "@/lib/blog";
import { hasLeadRoutingConfigured } from "@/config/site";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n-config";
import { buildMetadata } from "@/lib/metadata";
import { getNavItems, getPagePaths } from "@/lib/navigation";
import { getLocalizedPath, getRouteSegments, resolveRoute, type PageKey } from "@/lib/routes";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/lib/utils";

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
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const dictionary = getDictionary(locale);
  const route = resolveRoute(locale, slug);

  if (!route) {
    return buildMetadata({
      locale,
      path: `/${locale}/${slug.join("/")}`,
      title: dictionary.seo.pages.notFound.title,
      description: dictionary.seo.pages.notFound.description,
    });
  }

  if (route.type === "blogPost") {
    const post = await getPostBySlug(locale, route.slug);

    if (!post) {
      return buildMetadata({
        locale,
        path: `/${locale}/${slug.join("/")}`,
        title: dictionary.seo.pages.notFound.title,
        description: dictionary.seo.pages.notFound.description,
      });
    }

    const translations = await getPostTranslations(post.translationKey);
    const languages = Object.fromEntries(
      translations.map((entry) => [
        entry.locale,
        absoluteUrl(siteConfig.url, getLocalizedPath(entry.locale, "blog", { slug: entry.slug })),
      ]),
    );

    languages["x-default"] = languages.pt || absoluteUrl(siteConfig.url, "/pt");

    return buildMetadata({
      locale,
      path: getLocalizedPath(locale, "blog", { slug: post.slug }),
      title: `${post.title} | ${siteConfig.shortName}`,
      description: post.excerpt,
      languages,
    });
  }

  const page = route.page;
  const pagePaths = Object.fromEntries(
    locales.map((currentLocale) => [currentLocale, getLocalizedPath(currentLocale, page)]),
  );

  return buildMetadata({
    locale,
    path: getLocalizedPath(locale, page),
    title: dictionary.seo.pages[page].title,
    description: dictionary.seo.pages[page].description,
    languages: {
      ...Object.fromEntries(
        Object.entries(pagePaths).map(([key, value]) => [key, absoluteUrl(siteConfig.url, value)]),
      ),
      "x-default": absoluteUrl(siteConfig.url, pagePaths.pt),
    },
  });
}

export default async function LocalizedPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, slug = [] } = await params;
  const query = await searchParams;

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
  const pageJsonLd = buildOrganizationJsonLd(
    locale,
    route.type === "blogPost"
      ? getLocalizedPath(locale, "blog", { slug: route.slug })
      : paths[currentPage],
  );
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
      case "team":
        pageContent = <TeamPage locale={locale} dictionary={dictionary} paths={paths} whatsappHref={whatsappHref} configured={configured} />;
        break;
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
