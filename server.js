const http = require("http");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Servidor funcionando correctamente");
        return;
    }

    if (req.method === "POST" && req.url === "/archivo") {
        let totalBytes = 0;

        req.on("data", (chunk) => {
            totalBytes += chunk.length;
        });

        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Bytes recibidos: ${totalBytes}`);
        });

        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
});

server.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});