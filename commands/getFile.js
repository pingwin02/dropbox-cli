const fs = require("fs");
const path = require("path");
const os = require("os");

async function getFile(dbx, currentPath, remotePath, localPath = ".") {
  try {
    const response = await dbx.filesDownload({
      path: path.join(currentPath, remotePath),
    });

    if (localPath.startsWith("~")) {
      localPath = path.join(os.homedir(), localPath.slice(1));
    }

    const fullLocalPath = path.join(localPath, path.basename(remotePath));
    fs.writeFileSync(fullLocalPath, response.result.fileBinary, "binary");
    console.log(`File downloaded to ${fullLocalPath}`);
  } catch (error) {
    console.error("Error downloading file:", error.error);
  }
}

module.exports = getFile;
