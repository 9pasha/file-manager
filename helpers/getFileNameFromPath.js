export const getFileNameFromPath = (filePath) => {
    const splitedPath = filePath.split(/[\\]/g);

    return splitedPath[splitedPath.length - 1];
};
