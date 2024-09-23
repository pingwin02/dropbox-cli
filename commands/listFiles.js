const path = require("path");

async function listFiles(dbx, currentPath, newPath = "") {
  const targetPath = path.join(currentPath, newPath);
  try {
    const response = await dbx.filesListFolder({
      path: targetPath === "/" ? "" : targetPath,
    });

    console.log(`Contents of folder ${targetPath}:`);

    function formatSize(bytes) {
      if (bytes >= 1024 ** 3) {
        return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
      } else if (bytes >= 1024 ** 2) {
        return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
      } else {
        return `${(bytes / 1024).toFixed(2)} KB`;
      }
    }

    const maxNameLength = Math.max(
      ...response.result.entries.map((entry) => entry.name.length),
    );

    response.result.entries
      .sort((a, b) => {
        if (a[".tag"] === "folder" && b[".tag"] !== "folder") return -1;
        if (a[".tag"] !== "folder" && b[".tag"] === "folder") return 1;

        return a.name.localeCompare(b.name);
      })
      .forEach((entry) => {
        const isFolder = entry[".tag"] === "folder";
        const name = entry.name.padEnd(maxNameLength, " ");
        const size = isFolder ? "-" : formatSize(entry.size);
        const modifiedDate = isFolder
          ? "-"
          : new Date(entry.server_modified).toLocaleString();

        console.log(
          `${isFolder ? "📁" : "📄"} ${name} \t${modifiedDate} \t${size}`,
        );
      });
  } catch (error) {
    console.error("Error fetching folder contents:", error.error);
  }
}

module.exports = listFiles;
