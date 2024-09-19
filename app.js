require("dotenv").config();
const readline = require("readline");
const handleCommand = require("./commandHandler");
const { getDropboxInstance } = require("./utils/dropboxInstance");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentPath = "/";

(async () => {
  const dbx = await getDropboxInstance();
  rl.prompt();

  // Handle command input
  rl.on("line", async (line) => {
    currentPath = await handleCommand(line, dbx, currentPath);
    rl.prompt();
  });
})();
