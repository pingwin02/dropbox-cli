const fs = require("fs");

async function cat(dbx, currentPath, remoteFilePath) {
  try {
    const response = await dbx.filesDownload({
      path:
        currentPath === "/"
          ? `/${remoteFilePath}`
          : `${currentPath}/${remoteFilePath}`,
    });
    const content = response.result.fileBinary.toString("utf-8"); // Convert binary to string
    console.log(content);
  } catch (error) {
    console.error("Error retrieving file content:", error.error?.error_summary);
  }
}

module.exports = cat;
