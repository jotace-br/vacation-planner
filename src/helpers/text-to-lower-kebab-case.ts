export function textToLowerKebabCase(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}
