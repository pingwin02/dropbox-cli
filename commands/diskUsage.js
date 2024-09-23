async function diskUsage(dbx) {
  try {
    const usage = await dbx.usersGetSpaceUsage();
    console.log(
      "Used space:",
      (usage.result.used / 1024 ** 3).toFixed(2),
      "GB",
    );
    console.log(
      "Total capacity:",
      (usage.result.allocation.allocated / 1024 ** 3).toFixed(2),
      "GB",
    );
  } catch (error) {
    console.error("Error fetching disk usage:", error);
  }
}

module.exports = diskUsage;
