var http = require("hhtp");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Bye World");
    response.end();
}).listen(8888);