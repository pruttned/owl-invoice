import slugifyRaw from 'slugify';

export function slugify(text: string): string {
    text = text.replace(/\./g, '-');
    return slugifyRaw(text, {
        replacement: '-',
        lower: true          // result in lower case
    });
}