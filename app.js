require("dotenv").config();
const readline = require("readline");
const handleCommand = require("./commandHandler");
const { getDropboxInstance } = require("./utils/dropboxInstance");
const { exit } = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentPath = "/";

(async () => {
  const dbx = await getDropboxInstance();
  if (!dbx) exit(1);

  rl.prompt();

  rl.on("line", async (line) => {
    currentPath = await handleCommand(line, dbx, currentPath);
    rl.prompt();
  });
})();
