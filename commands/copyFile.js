const path = require("path");

async function copyFile(dbx, currentPath, srcPath, destPath) {
  try {
    await dbx.filesCopyV2({
      from_path: path.join(currentPath, srcPath),
      to_path: path.join(currentPath, destPath),
    });
    console.log(`Copied ${srcPath} to ${destPath}`);
  } catch (error) {
    console.error("Error copying file:", error.error);
  }
}

module.exports = copyFile;
