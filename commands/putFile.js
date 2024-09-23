const fs = require("fs");
const path = require("path");
const os = require("os");

async function putFile(dbx, currentPath, localPath, remotePath = "") {
  try {
    if (localPath.startsWith("~")) {
      localPath = path.join(os.homedir(), localPath.slice(1));
    }

    const fileContent = fs.readFileSync(localPath);

    if (!remotePath) {
      remotePath = path.basename(localPath);
    }

    const fullRemotePath = path.join(currentPath, remotePath);

    await dbx.filesUpload({
      path: fullRemotePath,
      contents: fileContent,
      mode: { ".tag": "overwrite" },
    });

    console.log(`File ${localPath} uploaded to ${fullRemotePath}`);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

module.exports = putFile;
