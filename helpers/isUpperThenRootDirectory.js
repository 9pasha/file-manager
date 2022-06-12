import path from 'node:path';

export const isUpperThenRootDirectory = (directory, rootDirectory) => {
    directory = path.normalize(directory);
    rootDirectory = path.normalize(rootDirectory);

    const relative = path.relative(directory, rootDirectory);

    return relative
        && !relative.startsWith('..')
        && !path.isAbsolute(relative);
};