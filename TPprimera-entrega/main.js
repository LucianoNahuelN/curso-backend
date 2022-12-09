const { connect } = require("./server.js");

async function main() {
    try {
        const serv = await connect(8080);
        console.log(`conectado al puerto ${serv.address().port}`);
    } catch (error) {
        console.log('algo falló: ' + error);
    }
}

main()