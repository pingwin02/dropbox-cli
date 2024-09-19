const path = require("path");

async function deleteFile(dbx, currentPath, remotePath) {
  try {
    await dbx.filesDeleteV2({ path: path.join(currentPath, remotePath) });
    console.log(`Deleted ${remotePath}`);
  } catch (error) {
    console.error("Error deleting file:", error.error);
  }
}

module.exports = deleteFile;
