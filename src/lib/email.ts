import { Resend } from "resend";

import { dbQuery } from "@/lib/db";
import { type LeadRecord } from "@/lib/leads";
import { getEmailFrom, getResendApiKey, hasDatabaseUrl } from "@/lib/server-env";
import { siteConfig } from "@/config/site";

const resend = getResendApiKey() ? new Resend(getResendApiKey()) : null;

export async function sendLeadNotificationEmail(lead: LeadRecord) {
  const apiKey = getResendApiKey();
  console.log("DEBUG: Resend API Key length:", apiKey?.length);
  
  if (!resend) {
    console.error("DEBUG: Resend client not initialized. Check RESEND_API_KEY.");
    return false;
  }

  try {
    const recipients: string[] = [];

    // Always notify the site config email if present
    if (siteConfig.email) {
      recipients.push(siteConfig.email);
    }
    console.log("DEBUG: SiteConfig Email:", siteConfig.email);

    // Attempt to notify all active directors from the database
    if (hasDatabaseUrl()) {
      const directors = await dbQuery<{ email: string }>(
        `SELECT email FROM admin_users WHERE role = 'director' AND is_active = true`
      );
      console.log("DEBUG: Found directors in DB:", directors.rows.length);
      for (const row of directors.rows) {
        if (!recipients.includes(row.email)) {
          recipients.push(row.email);
        }
      }
    }

    console.log("DEBUG: Recipients list:", recipients);
    if (recipients.length === 0) {
      console.warn("No recipients configured for lead notifications.");
      return false;
    }


    const { error } = await resend.emails.send({
      from: getEmailFrom(),
      to: recipients,
      subject: `[MUD] Novo lead: ${lead.firstName} ${lead.lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #BA5A3A; margin-top: 0;">Novo formulário recebido!</h2>
          <p>Você recebeu um novo contato através do site MUD.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.firstName} ${lead.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">E-mail</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Telefone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Interesse / Tipo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.interest || lead.formType}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Mensagem:</p>
            <p style="margin: 0; line-height: 1.5; white-space: pre-wrap;">${lead.message}</p>
          </div>

          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Acesse o <a href="${siteConfig.url}/admin/leads/${lead.id}" style="color: #BA5A3A;">Painel da Diretoria</a> para responder ou atualizar o status deste lead.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send lead notification email:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending lead notification email:", error);
    return false;
  }
}
