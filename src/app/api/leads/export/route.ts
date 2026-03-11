import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { listLeads } from "@/lib/leads";

export async function GET() {
  const actor = await requireAdmin();

  if (!actor) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch all leads (listLeads defaults to 250, we should perhaps fetch all or enough for export)
  const leads = await listLeads({ status: "all" });

  const headers = [
    "ID",
    "Data de Criação",
    "Tipo de Formulário",
    "Idioma",
    "Nome",
    "Sobrenome",
    "E-mail",
    "Telefone",
    "Interesse",
    "Idioma Preferido",
    "Disponibilidade",
    "Como nos conheceu",
    "Idade da criança",
    "Consentimento",
    "Status",
    "Mensagem",
    "Página de Origem",
    "Referrer",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Term",
    "UTM Content"
  ];

  const escapeCSV = (value: string | boolean | null | undefined) => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map(lead => [
    lead.id,
    lead.createdAt,
    lead.formType,
    lead.locale,
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.interest,
    lead.preferredLanguage,
    lead.availability,
    lead.foundUs,
    lead.childAge,
    lead.consent,
    lead.status,
    lead.message,
    lead.pagePath,
    lead.referrer,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.utmTerm,
    lead.utmContent
  ].map(escapeCSV).join(","));

  const csvContent = [headers.join(","), ...rows].join("\n");

  const response = new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mud-leads-export.csv"',
    },
  });

  return response;
}
