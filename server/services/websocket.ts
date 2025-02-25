const webSocketConnections: {[key: string]: WebSocket} = {};

const websocket = async (request: any, response: any) => {
    const connection = await response.accept();
    const userId = request?.params?.id;
    
    if(!userId) {
        connection.close()
        return;
    }
    
    webSocketConnections[userId] = connection;

    connection.on('close', () => {
        delete webSocketConnections[userId];
    })

    connection.on('message', (message: any) => {
        const msg = message.toString();
        if (msg === "__ping__") {
            connection.send("__pong__")
        }
    });
}

export default websocket;
export { webSocketConnections };