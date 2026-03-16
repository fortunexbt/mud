import { Pool, type QueryResultRow } from "pg";

import { getDatabaseUrl } from "@/lib/server-env";

declare global {
  var __mudPool: Pool | undefined;
  var __mudDbReady: Promise<void> | undefined;
}

function createPool() {
  const connectionString = getDatabaseUrl();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const useSsl = !(
    connectionString.includes("localhost")
    || connectionString.includes("127.0.0.1")
    || connectionString.includes(".railway.internal")
  );

  return new Pool({
    connectionString,
    max: 10,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });
}

export function getPool() {
  if (!globalThis.__mudPool) {
    globalThis.__mudPool = createPool();
  }

  return globalThis.__mudPool;
}

export async function ensureDatabase() {
  if (!globalThis.__mudDbReady) {
    globalThis.__mudDbReady = (async () => {
      const pool = getPool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          form_type TEXT NOT NULL,
          locale TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT NOT NULL,
          interest TEXT,
          preferred_language TEXT,
          availability TEXT,
          found_us TEXT,
          child_age TEXT,
          consent BOOLEAN NOT NULL DEFAULT FALSE,
          page_path TEXT,
          referrer TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          utm_term TEXT,
          utm_content TEXT,
          source TEXT NOT NULL DEFAULT 'website',
          status TEXT NOT NULL DEFAULT 'new',
          webhook_status TEXT NOT NULL DEFAULT 'not_configured',
          webhook_last_error TEXT,
          webhook_delivered_at TIMESTAMPTZ
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS lead_notes (
          id BIGSERIAL PRIMARY KEY,
          lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
          body TEXT NOT NULL,
          author_label TEXT NOT NULL DEFAULT 'director',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS lead_notes_lead_id_idx ON lead_notes(lead_id, created_at DESC);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_blog_posts (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          slug TEXT NOT NULL,
          translation_key TEXT NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          content_markdown TEXT NOT NULL,
          published_at TIMESTAMPTZ NOT NULL,
          category TEXT NOT NULL,
          cover TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'draft',
          author_label TEXT NOT NULL DEFAULT 'MUD',
          UNIQUE(locale, slug)
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_blog_posts_locale_status_idx ON cms_blog_posts(locale, status, published_at DESC);
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_blog_posts_translation_key_idx ON cms_blog_posts(translation_key);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_service_tracks (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          service_key TEXT NOT NULL,
          title TEXT NOT NULL,
          summary TEXT NOT NULL,
          details TEXT NOT NULL,
          badge TEXT NOT NULL,
          cta TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          UNIQUE(locale, service_key)
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_service_tracks_locale_sort_idx ON cms_service_tracks(locale, sort_order ASC, created_at ASC);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'director',
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          last_login_at TIMESTAMPTZ
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_team_members (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          member_key TEXT NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          bio TEXT NOT NULL,
          image_key TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_featured BOOLEAN NOT NULL DEFAULT FALSE,
          tagline TEXT,
          highlights TEXT,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          UNIQUE(locale, member_key)
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_team_members_locale_sort_idx ON cms_team_members(locale, sort_order ASC, created_at ASC);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_faqs (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          faq_key TEXT NOT NULL,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          UNIQUE(locale, faq_key)
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_faqs_locale_sort_idx ON cms_faqs(locale, sort_order ASC);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_contact_texts (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          section_key TEXT NOT NULL,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          UNIQUE(locale, section_key)
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_site_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_exhibitions (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          exhibition_key TEXT NOT NULL,
          year TEXT NOT NULL,
          edition_label TEXT NOT NULL,
          title TEXT NOT NULL,
          date TEXT NOT NULL,
          location_json TEXT NOT NULL,
          description TEXT NOT NULL,
          poster_key TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          UNIQUE(locale, exhibition_key)
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS cms_home_sections (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locale TEXT NOT NULL,
          section_key TEXT NOT NULL,
          content_json TEXT NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          UNIQUE(locale, section_key)
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS cms_home_sections_locale_idx ON cms_home_sections(locale);
      `);
    })();
  }

  await globalThis.__mudDbReady;
}

export async function dbQuery<T extends QueryResultRow>(query: string, params: unknown[] = []) {
  await ensureDatabase();
  return getPool().query<T>(query, params);
}
