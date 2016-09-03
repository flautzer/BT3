//Lets require/import the HTTP module
var http = require('http');
var mongoose = require('mongoose');
var dispatcher = require('httpdispatcher');

const PORT = 8080;

function handleRequest(request, response)
{
    try
    {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    }
    catch (err)
    {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

dispatcher.onGet("/units", function (req, res)
{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});

dispatcher.onPost("/units", function (req, res)
{
    
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});


var server = http.createServer(handleRequest);

server.listen(PORT, function ()
{
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});