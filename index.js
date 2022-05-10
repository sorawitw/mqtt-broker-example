const aedes = require('aedes')()
// This case use both receive body from client such as IOT and real-time chat app on web
const server = require('http').createServer()
const ws = require('websocket-stream')
const port = 8888

ws.createServer({ server: server }, aedes.handle)

aedes.authenticate = function(client, username, password, callback) {
    //console.log(username)
    callback(null, username == 'testbroker101' && password == '1234')
}

aedes.on("clientReady", (client) => {
    console.log('Client Ready: ', client.id)
})

aedes.on("clientDisconnect", (client) => {
    console.log('Client Disconnect: ', client.id)
})

aedes.on("publish", (packet, client) => {
    console.log("Published: ", packet)
})

server.listen(port, function() {
    console.log('server started and listening on port ', port)
})