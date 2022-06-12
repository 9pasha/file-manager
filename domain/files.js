import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';
import { getNewPathForRenamedFile } from '../helpers/pathResolverForRenamedFile.js';
import { getFileNameFromPath } from "../helpers/getFileNameFromPath.js";

export const readAndPrintFileContent = (filePath) => {
    const readableStream = fs.createReadStream(filePath);

    readableStream.on('data', (data) => {
        process.stdout.write(data.toString());
    });
};

export const createFileInDirectory = async (directory, fileName) => {
    const filePath = path.join(directory, fileName);

    await fs.appendFile(filePath, '');
};

export const deleteFile = async (filePath) => {
    await fs.rm(filePath);
};

export const renameFile = async (filePath, newName) => {
    const oldFilePath = filePath;
    const newFilePath = getNewPathForRenamedFile(filePath, newName);

    await fs.rename(oldFilePath, newFilePath);
};

export const copyFile = async (filePath, newFileDirectory) => {
    const fileName = getFileNameFromPath(filePath);
    const newFilePath = path.join(newFileDirectory, fileName);

    await fs.copyFile(filePath, newFilePath);
};

export const moveFile = async (filePath, newFileDirectory) => {
    await copyFile(filePath, newFileDirectory);
    await deleteFile(filePath);
};
