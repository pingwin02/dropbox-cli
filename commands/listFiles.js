const path = require("path");

async function listFiles(dbx, currentPath, newPath = "") {
  const targetPath = path.join(currentPath, newPath);
  try {
    const response = await dbx.filesListFolder({
      path: targetPath === "/" ? "" : targetPath,
    });

    console.log(`Contents of folder ${targetPath}:`);
    response.result.entries.forEach((entry) => {
      const isFolder = entry[".tag"] === "folder";
      const size = isFolder ? "-" : `${(entry.size / 1024).toFixed(2)} KB`;
      console.log(`${isFolder ? "📁" : "📄"} ${entry.name} ${size}`);
    });
  } catch (error) {
    console.error("Error fetching folder contents:", error.error);
  }
}

module.exports = listFiles;
