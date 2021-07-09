const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + '/public'));
app.use(connectRoute(function(router) {
    router.get("/", function(req, resp) {
        resp.writeHead(200, {
            'Content-Type': "text/html"
        });
        resp.end("<h1>main</h1>");
    });

    router.get("/user", function(req, resp) {
        console.log(req._parsedUrl.query);

        req.query = {};
        params = (req._parsedUrl.query || "").split("&");
        params.forEach(function(parameter) {
            tokens = parameter.split("=");
            req.query[tokens[0]] = tokens[1];
        });

        resp.writeHead(200, {
            'Content-Type': "text/html"
        });
        resp.end("<h1>user no:" + req.query.no + "</h1>");
    });

    router.get("/guestbook", function(req, resp) {
        resp.writeHead(200, {
            'Content-Type': "text/html"
        });
        resp.end("<h1>guestbook list</h1>");
    });

    router.get("/board", function(req, resp) {
        resp.writeHead(200, {
            'Content-Type': "text/html"
        });
        resp.end("<h1>board list</h1>");
    });

    router.get("/board/:no", function(req, resp) {
        resp.writeHead(200, {
            'Content-Type': "text/html"
        });
        resp.end("<h1>board view(" + req.params.no + ")</h1>");
    });
}));
app.listen(port, function() {
    console.log(`Http Server running on port ${port}`);
});