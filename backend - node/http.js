const http = require('http');

http.createServer(function (req, res){
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('welcome to  our  node nodemon server'); 
res.end();
}).listen(8080, function(){
    console.log(' server is running on port 8080...');
    
});


