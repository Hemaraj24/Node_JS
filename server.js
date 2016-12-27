var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
    if (req.method == 'GET') {
        var fileUrl;
        if(req.url == '/') {
            fileUrl = '/';
        }
        else {
            fileUrl = req.url;
        }
        var filePath = path.resolve('./assignmentfiles' + fileUrl);//actual physical path on webserver
        console.log('filePath: ' + filePath)

        //lookup for file mimeType
        var fileExtention = path.extname(filePath);
        var mimeType = mimeTypes[fileExtention];
        
        if(!mimeType) {
            send404(res);
            return;
        }

        //check if file exist
        fs.exists(filePath, function(isFileExist) {
            if(!isFileExist) {
                send404(res);
                return;
            }
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filePath).pipe(res);            
        });
    }
    else {
        send404(res);
    }
}).listen(8123);

var mimeTypes = {'.js': 'application/javascript',
               '.html': 'text/html'};

console.log('server running on port 8123');

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}
