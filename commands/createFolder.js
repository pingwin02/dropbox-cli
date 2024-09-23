const path = require("path");

async function createFolder(dbx, currentPath, folderPath) {
  try {
    await dbx.filesCreateFolderV2({ path: path.join(currentPath, folderPath) });
    console.log(`Folder ${folderPath} created.`);
  } catch (error) {
    console.error("Error creating folder:", error);
  }
}

module.exports = createFolder;
