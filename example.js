const { chainwayApi } = require("chainway-rfid");

const example = async () => {
    try{
        await chainwayApi.connect("192.168.99.202",8888);
        await chainwayApi.startScan();
        chainwayApi.received((data) => {
            
            // handle your logic here!
            console.log(data.epc);
            console.log(data.tid);
            console.log(data.ant);
            console.log(data.rssi);
        });
    }catch(e){
        console.log(e);
    }
}
example();