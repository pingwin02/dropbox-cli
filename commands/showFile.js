const fs = require("fs");

async function showFile(dbx, currentPath, remoteFilePath) {
  try {
    const response = await dbx.filesDownload({
      path:
        currentPath === "/"
          ? `/${remoteFilePath}`
          : `${currentPath}/${remoteFilePath}`,
    });
    const content = response.result.fileBinary.toString("utf-8");
    console.log(content);
  } catch (error) {
    console.error("Error retrieving file content:", error);
  }
}

module.exports = showFile;
