export function toKebabCase(input: string) {
   return input.replaceAll(/[^A-Za-z0-9\s]|^[0-9]+/g, '').trim().replaceAll(/\s+/g, '-').toLowerCase();
}