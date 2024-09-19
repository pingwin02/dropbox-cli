const fs = require("fs");
const path = require("path");

async function putFile(dbx, currentPath, localPath, remotePath = "/") {
  try {
    const fileContent = fs.readFileSync(localPath);
    await dbx.filesUpload({
      path: path.join(currentPath, remotePath),
      contents: fileContent,
    });
    console.log(`File ${localPath} uploaded to ${remotePath}`);
  } catch (error) {
    console.error("Error uploading file:", error.error);
  }
}

module.exports = putFile;
