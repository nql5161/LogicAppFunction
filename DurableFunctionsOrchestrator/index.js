/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    const data = context.df.getInput();
    // Replace "Hello" with the name of your Durable Activity Function.
    outputs.push(yield context.df.callActivity("MrTest", data));
    
    // returns ["Hello Munich Re - WOLF test!"]
    return outputs;
});