const axios = require("axios");
const fs = require("fs");

async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "https://api.dropboxapi.com/oauth2/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
          client_id: process.env.DROPBOX_CLIENT_ID,
          client_secret: process.env.DROPBOX_CLIENT_SECRET,
        },
      },
    );

    console.log(
      "Old access token:",
      process.env.DROPBOX_ACCESS_TOKEN.slice(0, 10) +
        "..." +
        process.env.DROPBOX_ACCESS_TOKEN.slice(-10),
    );
    console.log(
      "New access token:",
      response.data.access_token.slice(0, 10) +
        "..." +
        response.data.access_token.slice(-10),
    );
    console.log(
      "Expires at:",
      new Date(Date.now() + response.data.expires_in * 1000).toLocaleString(),
    );
    process.env.DROPBOX_ACCESS_TOKEN = response.data.access_token;

    let data = fs.readFileSync(".env", "utf8");
    let lines = data.split("\n");
    let newLines = lines.map((line) =>
      line.startsWith("DROPBOX_ACCESS_TOKEN")
        ? `DROPBOX_ACCESS_TOKEN=${process.env.DROPBOX_ACCESS_TOKEN}`
        : line,
    );

    fs.writeFileSync(".env", newLines.join("\n"));
  } catch (error) {
    console.error(
      "Error while refreshing token:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

module.exports = refreshAccessToken;
