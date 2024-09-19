const fs = require("fs");
const path = require("path");

async function getFile(dbx, currentPath, remotePath, localPath = ".") {
  try {
    const response = await dbx.filesDownload({
      path: path.join(currentPath, remotePath),
    });
    fs.writeFileSync(localPath, response.result.fileBinary, "binary");
    console.log(`File downloaded to ${localPath}`);
  } catch (error) {
    console.error("Error downloading file:", error.error);
  }
}

module.exports = getFile;
