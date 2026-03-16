import { dbQuery } from "@/lib/db";
import { siteConfig as defaultSiteConfig } from "@/config/site";
import { hasDatabaseUrl } from "@/lib/server-env";

export interface ManagedSetting {
  key: string;
  value: string;
}

const SETTING_KEYS = [
  "instagramUrl",
  "whatsappNumber",
  "email",
  "hours",
] as const;

export type SettingKey = typeof SETTING_KEYS[number];

function getDefaultSettings(): Record<SettingKey, string> {
  return {
    instagramUrl: defaultSiteConfig.instagramUrl,
    whatsappNumber: defaultSiteConfig.whatsappNumber,
    email: defaultSiteConfig.email,
    hours: defaultSiteConfig.hours,
  };
}

async function seedDefaultSettings() {
  const defaults = getDefaultSettings();

  await Promise.all(
    Object.entries(defaults).map(([key, value]) =>
      dbQuery(
        `
          INSERT INTO cms_site_settings (key, value)
          VALUES ($1, $2)
          ON CONFLICT (key) DO NOTHING
        `,
        [key, value],
      ),
    ),
  );
}

export async function getManagedSettings(): Promise<Record<SettingKey, string>> {
  const defaults = getDefaultSettings();

  if (!hasDatabaseUrl()) {
    return defaults;
  }

  try {
    await seedDefaultSettings();

    const result = await dbQuery(
      `
        SELECT *
        FROM cms_site_settings
      `
    );

    const settingsMap = new Map(result.rows.map((row) => [row.key, row.value]));
    
    const resultObj = { ...defaults };
    
    SETTING_KEYS.forEach((key) => {
      if (settingsMap.has(key)) {
        resultObj[key] = String(settingsMap.get(key));
      }
    });

    return resultObj;
  } catch {
    return defaults;
  }
}

export async function saveManagedSettings(settings: Record<SettingKey, string>) {
  if (!hasDatabaseUrl()) return;

  await Promise.all(
    Object.entries(settings).map(([key, value]) =>
      dbQuery(
        `
          INSERT INTO cms_site_settings (key, value, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (key) DO UPDATE SET
            value = EXCLUDED.value,
            updated_at = NOW()
        `,
        [key, value.trim()],
      ),
    ),
  );
}
