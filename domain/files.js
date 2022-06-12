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
    const errorMessage = 'FS operation failed';
    const filePath = path.join(directory, fileName);

    let fileStat = null;

    try {
        fileStat = await fs.stat(filePath);

        if (fileStat)
            throw new Error(errorMessage);
    } catch (error) {
        if (error && fileStat) {
            throw new Error(errorMessage);
        } else {
            await fs.appendFile(filePath, '');
        }
    }
};

export const deleteFile = async (filePath) => {
    const errorMessage = 'FS operation failed';

    try {
        await fs.stat(filePath);
    } catch (error) {
        throw new Error(errorMessage);
    }

    await fs.rm(filePath);
};

export const renameFile = async (filePath, newName) => {
    const oldFilePath = filePath;
    const newFilePath = getNewPathForRenamedFile(filePath, newName);

    const errorMessage = 'FS operation failed';

    let oldFileStat = null;
    let newFileStat = null;

    try {
        oldFileStat = await fs.stat(oldFilePath);

        try {
            newFileStat = await fs.stat(newFilePath);
        } catch (error) {
            await fs.rename(oldFilePath, newFilePath);
        }
    } catch (error) {
        throw new Error(errorMessage);
    }

    if (newFileStat) {
        throw new Error(errorMessage);
    }
};

export const copyFile = async (filePath, newFileDirectory) => {
    try {
        await fs.stat(filePath);

        const fileName = getFileNameFromPath(filePath);
        const newFilePath = path.join(newFileDirectory, fileName);

        await fs.copyFile(filePath, newFilePath);
    } catch (error) {
        // throw new Error('FS operation failed');
    }
};

export const moveFile = async (filePath, newFileDirectory) => {
    try {
        await copyFile(filePath, newFileDirectory);
        await deleteFile(filePath);
    } catch (error) {

    }
};
