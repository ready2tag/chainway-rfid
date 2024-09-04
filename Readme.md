
# Chainway UHF RFID API Gateway (Unofficial)

Welcome to the unofficial API gateway for Chainway UHF RFID readers, designed to facilitate communication with various Chainway products using Node.js. This repository provides a streamlined interface for integrating with Chainway's UHF RFID readers, making it easier to build custom applications.

## Supported Devices

This library supports the following Chainway UHF RFID readers:

- **UR4**: Connect via IP (Ready) ✅
- **R3**: Connect via USB-C (On-going)
- **R6**: Connect via USB-C (On-going) 

## Features

- **Seamless Integration**: Easily connect and communicate with Chainway UHF readers using Node.js.
- **Multi-Device Support**: Handle multiple types of readers with a single API.
- **Customizable**: Extend and customize the gateway to fit your specific needs.

## Installation

To install the library, run the following command:

```bash
npm install chainway-rfid
```

## Basic Usage

Here's an example of how to use the \`chainway-rfid\` library:

```javascript
const { chainwayApi } = require('chainway-rfid');

const example = async () => {
    try {
        await chainwayApi.connect("192.168.99.202", 8888); // Replace with your reader's IP and port
        await chainwayApi.startScan();
        chainwayApi.received((data) => {
            console.log('EPC:', data.epc);
            console.log('TID:', data.tid);
            console.log('Antenna:', data.ant);
            console.log('RSSI:', data.rssi);
        });
    } catch (e) {
        console.error("An error occurred:", e);
    }
};

example();
```

### Connecting to a Reader

To connect to a Chainway reader, use the \`connect\` method:

```javascript
await chainwayApi.connect(ipAddress, port);
```

- \`ipAddress\`: The IP address of the Chainway reader (e.g., \`"192.168.99.202"\`).
- \`port\`: The port to connect to (e.g., \`8888\`).

### Starting a Scan

To start scanning for UHF RFID tags:

```javascript
await chainwayApi.startScan();
```

### Receiving Data

To handle incoming data from the RFID reader, use the \`received\` method:

```javascript
chainwayApi.received((data) => {
    console.log('EPC:', data.epc);
    console.log('TID:', data.tid);
    console.log('Antenna:', data.ant);
    console.log('RSSI:', data.rssi);
});
```

The \`data\` object contains the following fields:

- \`epc\`: Electronic Product Code of the tag.
- \`tid\`: Tag Identifier.
- \`ant\`: Antenna number that detected the tag.
- \`rssi\`: Signal strength indicator of the tag.

## API Reference

### \`chainwayApi.connect(ipAddress: string, port: number): Promise<void>\`

Connects to the Chainway UHF RFID reader.

### \`chainwayApi.startScan(): Promise<void>\`

Starts scanning for UHF RFID tags.

### \`chainwayApi.received(callback: (data: { epc: string, tid: string, ant: number, rssi: number }) => void): void\`

Registers a callback function to handle data received from the reader.

### \`chainwayApi.stopScan(): Promise<void>\`

Stops scanning for UHF RFID tags.

### \`chainwayApi.disconnect(): Promise<void>\`

Disconnects from the Chainway UHF RFID reader.

## Error Handling

Ensure you handle errors in your application by using \`try...catch\` blocks around asynchronous operations:

```javascript
try {
    await chainwayApi.connect("192.168.99.202", 8888);
    await chainwayApi.startScan();
} catch (e) {
    console.error("Connection failed:", e);
}
```

## Customization & Commercial Support
If you require additional customization or commercial support for integrating Chainway UHF RFID readers with your applications, I offer personalized services. Whether it's adding new features, optimizing performance, or adapting the library to your specific needs, I'm here to help.

Contact
For more information, custom solutions, or to discuss your project requirements, feel free to contact me:

Email: [ready2tag@proton.me]
