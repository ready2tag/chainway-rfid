import * as net from 'net';
import { RFID } from './interface';

class TCPClient {
    private client: net.Socket | null = null;

    connect(host: string, port: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client = new net.Socket();
            this.client.connect(port, host, () => {
                console.log(`Connected to ${host}:${port}`);
                resolve(true);
            });

            this.client.on('error', (err: Error) => {
                console.log("[Chainway-api] Err to Connect Hardware, please check your IP!");
                reject(false);
            });
        });
    }

    send(message: Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.write(message, (err: Error | undefined) => {
                    if (err) {
                        console.error('Send error:', err.message);
                        reject(err);
                    } else {
                        console.log('Message sent:', message);
                        resolve();
                    }
                });
            } else {
                reject(new Error('Client not connected'));
            }
        });
    }

    startScan(): void {
        const _0xabc = [165, 90, 0, 10, 130, 39, 16, 191, 13, 10];
        const _0xdef = ['from', 'Buffer'];
        const _0xgh = _0xabc.map((v, i) => {
            return v ^ (i % 3 ? 0 : 1);
        });
        const _0xijk = (globalThis as any)[_0xdef[1]][_0xdef[0]](
            _0xgh.map((v, i) => v ^ (i % 3 ? 0 : 1))
        );
        (this as any)['s' + 'end'](_0xijk);
    }

    stopScan(): void {
        const _0xabc = [200, 140, 0, 8, 140, 132, 13, 10];
        const _0xdef = ['from', 'Buffer'];
        const _0xghi = _0xabc.map((v, i) => {
            return v ^ (i % 2 ? 0x0F : 0xFF);
        });
        const _0xjkl = (globalThis as any)[_0xdef[1]][_0xdef[0]](
            _0xghi.map((v, i) => v ^ (i % 2 ? 0x0F : 0xFF))
        );
        (this as any)['s' + 'end'](_0xjkl);
    }

    received(cb?: (data: RFID ) => void): void {
        if (cb && this.client) {
            this.client.on('data', (data: Buffer) => {
                cb(f(data));
            });

            this.client.on('close', () => {
                console.log('Connection closed');
            });
        }
    }

    disconnect(): void {
        if (this.client) {
            this.client.end(() => {
                console.log('Disconnected from server');
            });
        }
    }
}

// helper fucntion ===============================================================================================
const f = (data: Buffer): RFID  => {
    const HEADER_LENGTH = 5;
    const END_FRAME_LENGTH = 3;
    const TID_LENGTH = 12;
    const RSSI_LENGTH = 2;
    const ATN_LENGTH = 1;

    // Calculate EPC length dynamically
    const epcStart = HEADER_LENGTH;
    const epcLength = data.length - (HEADER_LENGTH + TID_LENGTH + RSSI_LENGTH + ATN_LENGTH + END_FRAME_LENGTH);
    const epcEnd = epcStart + epcLength;

    if (data.length < HEADER_LENGTH + TID_LENGTH + RSSI_LENGTH + ATN_LENGTH + END_FRAME_LENGTH) {
        return{
            epc: undefined,
            rssi: undefined,
            ant: undefined,
            tid: undefined
        }
    }
    

    // Extract EPC
    let epc = '';
    for (let i = epcStart; i < epcEnd; ++i) {
        if (data[i] < 0x10) epc += '0';  // Add leading zero for single hex digits
        epc += data[i].toString(16);  // Convert to hex string
    }
    epc = epc.toUpperCase();

    // Extract TID
    const tidStart = epcEnd;
    const tidEnd = tidStart + TID_LENGTH;
    let tid = '';
    for (let i = tidStart; i < tidEnd; ++i) {
        if (data[i] < 0x10) tid += '0';  // Add leading zero for single hex digits
        tid += data[i].toString(16);  // Convert to hex string
    }
    tid = tid.toUpperCase();

    // Extract RSSI
    const rssiStart = tidEnd;
    const rssiEnd = rssiStart + RSSI_LENGTH;
    let rssi = '';
    for (let i = rssiStart; i < rssiEnd; ++i) {
        if (data[i] < 0x10) rssi += '0';  // Add leading zero for single hex digits
        rssi += data[i].toString(16);  // Convert to hex string
    }

    // Extract ATN as a number
    const antStart = rssiEnd;
    const ant = data[antStart];  // Directly assign the numeric value

    // Return the extracted data in the RFID format
    return {
        epc,
        tid,
        rssi,
        ant
    };
};

export default new TCPClient();
