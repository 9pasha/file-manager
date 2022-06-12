import fs from 'node:fs/promises';
import path from 'node:path';
import {getHomeDirectory} from "./operatingSystem.js";

export const upDirectory = (currentWorkingDirectory) => {
    if (getHomeDirectory() === currentWorkingDirectory) {
        return currentWorkingDirectory;
    }

    const directoryArrayPath = currentWorkingDirectory.split(/[\\]/g);

    return directoryArrayPath.splice(0, (directoryArrayPath.length - 1)).join('\\');
};

export const getListOfDirectoryFiles = async (directory) => {
    return await fs.readdir(directory);
};

export const changeDirectory = async (currentDirectoryPath, newDirectoryPath) => {
    let changedPath = null;
    changedPath = path.resolve(currentDirectoryPath, newDirectoryPath);

    return changedPath;
};
