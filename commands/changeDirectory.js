const path = require("path");

async function changeDirectory(dbx, currentPath, newPath) {
  let targetPath;

  if (newPath === "..") {
    // Navigate to the parent directory
    targetPath = path.dirname(currentPath);
  } else {
    targetPath = path.join(currentPath, newPath);
  }

  try {
    await dbx.filesListFolder({ path: targetPath === "/" ? "" : targetPath });
    console.log(`Changed directory to: ${targetPath}`);
    return targetPath; // Return the updated current path
  } catch (error) {
    console.error("Error changing directory:", error.error?.error_summary);
    return currentPath; // Return original path on error
  }
}

module.exports = changeDirectory;
