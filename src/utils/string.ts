export function toKebabCase(input: string) {
   return input.replaceAll(/[^A-Za-z0-9\s]|^[0-9]+/g, '').trim().replaceAll(/\s+/g, '-').toLowerCase();
}

export function fromKebabCase(input: string) {
   return input.split("-").map(i => `${i.at(0)?.toUpperCase()}${i.substring(1)}`).join(" ");
}