# Dropbox CLI

Dropbox CLI is an application that allows you to manage files on your Dropbox account from the terminal.

## Requirements

- Node.js
- A Dropbox developer account (https://www.dropbox.com/developers)

## Configuration

### 1. Create an application in Dropbox

To use this app, you need to create your own application in the Dropbox developer console:

1. Go to: [Dropbox Developers](https://www.dropbox.com/developers/apps).
2. Click `Create App`.
3. Choose API: Dropbox API.
4. Select the access type: Full Dropbox or App folder (depending on your needs).
5. Name your app and click `Create App`.
6. On the application page, note down the **App Key** and **App Secret**.

### 2. Get the `authorization_code`

With your **App Key** (`DROPBOX_CLIENT_ID`), get the authorization code by navigating to the following URL:

```

https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=<DROPBOX_CLIENT_ID>&token_access_type=offline

```

Replace `<DROPBOX_CLIENT_ID>` with your **App Key**.

After accepting the permissions, Dropbox will redirect you to a page with the **Authorization Code**.

### 3. Obtain the `ACCESS_TOKEN` and `REFRESH_TOKEN`

Use the following `curl` example to obtain both tokens.

```bash

curl https://api.dropboxapi.com/oauth2/token \
    -d code=<AUTHORIZATION_CODE> \
    -d grant_type=authorization_code \
    -d client_id=<APP_KEY> \
    -d client_secret=<APP_SECRET>

```

Replace `<AUTHORIZATION_CODE>`, `<APP_KEY>`, and `<APP_SECRET>` with your data:

- `AUTHORIZATION_CODE` is the authorization code obtained in step 2.
- `APP_KEY` is the **App Key** of your Dropbox application.
- `APP_SECRET` is the **App Secret** of your Dropbox application.

### 4. Configure the `.env` file

After making the request, you will receive two tokens:

- `access_token` (short-lived access token starting with `sl.`)
- `refresh_token` (long-lived refresh token)

Save these tokens in the `.env` file in the application's root folder. Example `.env` file:

```bash

DROPBOX_ACCESS_TOKEN=<YOUR_SHORT_LIVED_TOKEN>
DROPBOX_REFRESH_TOKEN=<YOUR_REFRESH_TOKEN>
DROPBOX_CLIENT_ID=<YOUR_APP_KEY>
DROPBOX_CLIENT_SECRET=<YOUR_APP_SECRET>

```

Replace `<YOUR_SHORT_LIVED_TOKEN>`, `<YOUR_REFRESH_TOKEN>`, `<YOUR_APP_KEY>`, and `<YOUR_APP_SECRET>` with the appropriate values obtained in the previous steps.

### 5. Install dependencies

In the main application folder, run the following command to install dependencies:

```bash

npm install

```

### 6. Run the application

After configuring the `.env` file and installing dependencies, you can start the application using:

```bash

npm start

```

### 7. Available commands

Once the application is running in the terminal, the following commands are available:

- `ls` - Displays the contents of the current folder in Dropbox.
- `df` - Shows the amount of space used on the account.
- `get <remote_path> <local_path>` - Downloads a file from Dropbox to a local folder.
- `put <local_path> <remote_path>` - Uploads a file to Dropbox.
- `del <remote_path>` - Deletes a file from Dropbox.
- `cd <remote_path>` - Changes the directory in Dropbox.
- `mkdir <folder_path>` - Creates a new folder in Dropbox.
- `mv <source_path> <destination_path>` - Moves a file/folder in Dropbox.
- `cp <source_path> <destination_path>` - Copies a file/folder in Dropbox.
- `cat <remote_path>` - Displays the contents of a file.
- `exit` - Closes the application.

### Authorization issues

If you notice that the token expires, the application will automatically refresh the token using the `refresh_token`, and the new token will be saved in the `.env` file.
