'use strict'
var express = require('express');
var app = express();

var mqtt    = require('mqtt');
var cors = require('cors')
var client  = mqtt.connect("mqtt://172.16.8.233:1883");
var msg_to_be_sent = 'Nothing to send right now';

client.on("connect",function(){
console.log("connected");
var camera_detection_subscription="NVR/CameraMotion";
client.subscribe(camera_detection_subscription);

})
client.on('message',function(message, rest){
  console.log(msg_to_be_sent);
	console.log("message is "+ message + "-" + rest);
  msg_to_be_sent = rest;
});

app.get('/mqtt_response', cors(), function(req, res){
  console.log("receiving req for MQTT, responding.");
  console.log(msg_to_be_sent);
  res.send(msg_to_be_sent);
  msg_to_be_sent = "Nothing new:";
});

var server = app.listen(8081, function () {

   var host = server.address().address
   console.log(host);
   var port = server.address().port
   console.log(port);

})


