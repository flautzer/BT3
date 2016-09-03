//Lets require/import the HTTP module
var http = require('http');
var mongoose = require('mongoose');
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response)
{
    try
    {
        mongoose.connect('mongodb://localhost/test');
    
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('connection successful')
        });
        
        var Cat = mongoose.model('Cat', { name: String });
    
        var kitty = new Cat({ name: 'Olaf Günther' });
        kitty.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('meow');
            }
        });
        
        
    
        //var message = this.getMessage(request);
        //var header = message.headers;
        
        response.end('hach ja');
    }
    catch(err)
    {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function ()
{
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});