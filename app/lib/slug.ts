/**
 * Project names become the /projects/<slug> address. Accented letters are
 * folded rather than dropped, so L'Oréal stays readable as loreal.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
