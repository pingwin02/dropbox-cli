const { Dropbox } = require("dropbox");
const refreshAccessToken = require("./refreshToken");

async function getDropboxInstance() {
  try {
    let dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
    await dbx.usersGetCurrentAccount();
    console.log("Welcome to Dropbox CLI!");
    return dbx;
  } catch (error) {
    if (error.status >= 400 && error.status < 500) {
      console.log("Token expired, refreshing...");
      await refreshAccessToken();
      dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
      console.log("Welcome to Dropbox CLI!");
      return dbx;
    } else {
      throw error;
    }
  }
}

module.exports = { getDropboxInstance };
