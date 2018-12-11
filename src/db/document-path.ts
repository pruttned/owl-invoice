import path from 'path';

export const DOC_FILE_EXT = 'yaml';
export const DOC_FILE_GLOB = `*.${DOC_FILE_EXT}`;

export function getCollectionFromPath(file: string): string {
    return path.basename(path.dirname(file));
}
export function getIdFromPath(file: string): string {
    return path.basename(file, path.extname(file))
}

