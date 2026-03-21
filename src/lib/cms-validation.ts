import { z } from "zod";

export function validateFormData<T extends z.ZodRawShape>(
  formData: FormData,
  schema: z.ZodObject<T>,
): z.infer<typeof schema> {
  const data: Record<string, unknown> = {};
  
  for (const [key, value] of formData.entries()) {
    let normalizedValue: unknown = value;

    if (value === "on" || value === "true") normalizedValue = true;
    else if (value === "false") normalizedValue = false;

    const existingValue = data[key];

    if (existingValue === undefined) {
      data[key] = normalizedValue;
      continue;
    }

    if (Array.isArray(existingValue)) {
      existingValue.push(normalizedValue);
      continue;
    }

    data[key] = [existingValue, normalizedValue];
  }
  
  return schema.parse(data);
}
