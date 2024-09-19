const listFiles = require("./commands/listFiles");
const diskUsage = require("./commands/diskUsage");
const getFile = require("./commands/getFile");
const putFile = require("./commands/putFile");
const deleteFile = require("./commands/deleteFile");
const changeDirectory = require("./commands/changeDirectory");
const createFolder = require("./commands/createFolder");
const moveFile = require("./commands/moveFile");
const copyFile = require("./commands/copyFile");
const showFile = require("./commands/showFile");

async function handleCommand(line, dbx, currentPath) {
  const [cmd, ...args] = line.trim().split(" ");

  switch (cmd) {
    case "ls":
      await listFiles(dbx, currentPath, args[0] || "");
      break;

    case "df":
      await diskUsage(dbx);
      break;

    case "get":
      if (args.length < 2) {
        console.log("Usage: get <remote_path> <local_path>");
      } else {
        await getFile(dbx, currentPath, args[0], args[1]);
      }
      break;

    case "put":
      if (args.length < 2) {
        console.log("Usage: put <local_path> <remote_path>");
      } else {
        await putFile(dbx, currentPath, args[0], args[1]);
      }
      break;

    case "del":
      if (args.length < 1) {
        console.log("Usage: del <remote_path>");
      } else {
        await deleteFile(dbx, currentPath, args[0]);
      }
      break;

    case "cd":
      if (args.length < 1) {
        console.log("Usage: cd <remote_path>");
      } else {
        currentPath = await changeDirectory(dbx, currentPath, args[0]);
      }
      break;

    case "mkdir":
      if (args.length < 1) {
        console.log("Usage: mkdir <folder_path>");
      } else {
        await createFolder(dbx, currentPath, args[0]);
      }
      break;

    case "mv":
      if (args.length < 2) {
        console.log("Usage: mv <source_path> <destination_path>");
      } else {
        await moveFile(dbx, currentPath, args[0], args[1]);
      }
      break;

    case "cp":
      if (args.length < 2) {
        console.log("Usage: cp <source_path> <destination_path>");
      } else {
        await copyFile(dbx, currentPath, args[0], args[1]);
      }
      break;

    case "cat":
      if (args.length < 1) {
        console.log("Usage: cat <remote_file_path>");
      } else {
        await showFile(dbx, currentPath, args[0]);
      }
      break;

    case "exit":
      console.log("Exiting the application.");
      process.exit(0);

    default:
      console.log("Unknown command:", cmd);
      console.log(
        "Available commands: ls, df, get, put, del, cd, mkdir, mv, cp, cat, exit",
      );
      break;
  }

  return currentPath; // Return the updated current path after command execution
}

module.exports = handleCommand;
