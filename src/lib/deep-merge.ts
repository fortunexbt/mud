/* eslint-disable @typescript-eslint/no-explicit-any */
function isObject(item: unknown): item is Record<string, unknown> {
  return (item !== null && typeof item === 'object' && !Array.isArray(item));
}

export function deepMerge(
  target: Record<string, any>, 
  source: Record<string, any>
): Record<string, any> {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (isObject(targetValue)) {
          output[key] = deepMerge(targetValue as Record<string, any>, sourceValue as Record<string, any>);
        } else {
          output[key] = sourceValue;
        }
      } else {
        output[key] = sourceValue;
      }
    });
  }
  
  return output;
}
