var io = require('socket.io').listen(3001);
var mysql=require("mysql");
var Q=require("q");
var express = require('express');

//Setup Express
var app = express();

//Setup public Directory
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

//Create Connection to DB

var conn=mysql.createConnection(
    {
      host: 'localhost',
      user: 'chat',
      password: 'chat123',
      database: 'chatserver',
      insecureAuth: true
    }
    );

var getImage=function(){
  var d=Q.defer();
  conn.query("select image from images limit 1", function(err, result, fields){
      //Check if there is image
      if(result.length<=0){
        return d.reject("No Image Available");
      }
      //Return Image
      var imgBuffer=new Buffer(result[0].image,  'binary');
      var img=imgBuffer.toString('base64');
      d.resolve(img);
  });

  return d.promise;
};

function initializeServer(){
  //Handle Client Connections
  io.sockets.on("connection", function(socket){
      socket.emit('image', imgBase64);

      //Cleanup socket on disconnect
      socket.on("disconnect", function(){
        console.log("Client Disconnected");
      });
  });
}

function cleanUp(){
  //Close DB
  conn.end();
  //Gracefully Exit
  process.exit();
}
//Shutdown gracefully
process.on("SIGINT", function(){
  //Clean Up
  cleanUp();
});


//Main
//Global buffer to store image
var imgBase64;

//Make DB connection
conn.connect();

//Cache Image to be delivered
getImage().then(function(img){
  imgBase64=img;
  //Start Handling clients
  initializeServer();

}).fail(function(){
  //Some Problem with DB
  cleanUp();
}).done();



