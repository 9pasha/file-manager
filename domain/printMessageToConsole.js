export const printExitMessage = (username) => {
    console.log(`Thank you for using File Manager, ${username}!`);
};

export const printMessageOfCurrentDirectory = (currentWorkingDirectory) => {
    console.log(`You are currently in ${currentWorkingDirectory}`);
};

export const printStartMessage = (username, currentWorkingDirectory) => {
    console.log(`Welcome to the File Manager, ${username}!`);
    printMessageOfCurrentDirectory(currentWorkingDirectory);
};

export const printInvalidCommand = () => {
    console.log('Invalid input');
};

export const operationFailed = () => {
    console.log('Operation failed');
};
