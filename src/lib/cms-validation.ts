import { z } from "zod";

export function validateFormData<T extends z.ZodRawShape>(
  formData: FormData,
  schema: z.ZodObject<T>,
): z.infer<typeof schema> {
  const data: Record<string, unknown> = {};
  
  for (const [key, value] of formData.entries()) {
    if (value === "on" || value === "true") data[key] = true;
    else if (value === "false") data[key] = false;
    else data[key] = value;
  }
  
  return schema.parse(data);
}
