const path = require("path");

async function moveFile(dbx, currentPath, srcPath, destPath) {
  try {
    await dbx.filesMoveV2({
      from_path: path.join(currentPath, srcPath),
      to_path: path.join(currentPath, destPath),
    });
    console.log(`Moved ${srcPath} to ${destPath}`);
  } catch (error) {
    console.error("Error moving file:", error);
  }
}

module.exports = moveFile;
