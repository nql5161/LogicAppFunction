/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */
const axios = require("axios");
module.exports = async function (context) {
    function sleep(milliseconds) { 
        let timeStart = new Date().getTime(); 
        while (true) { 
            let elapsedTime = new Date().getTime() - timeStart; 
            if (elapsedTime > milliseconds) { 
                break; 
            } 
        } 
    }  
    let body = "";
    let data = context.bindings.payload;
    let parsedId = parseInt(data.userId);
    const request = async () => {
        try {
            res = await axios({
                method: 'get',
                headers: {
                    "Ocp-Apim-Subscription-Key": "39516736a40f454bbbe44abac2b63a3d",
                    "Ocp-Apim-Trace": true
                },
                url: `https://hsbapidev.azure-api.net/onsight-schedule/${parsedId}`,
                // url: data.url
              })
            sleep(JSON.stringify(data.delay));
            body = res.data
            context.log(res.data);
            return res.data
        } catch(e) {
            context.log(e);
        }

    }
    await request();
    context.log(data.userId);

    // sleep(JSON.stringify(data.payload.delay))
    return body;
};