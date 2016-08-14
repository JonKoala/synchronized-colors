
var receiver;
var neutralMessage = 0;

var colors;

//
//LOADING

$(document).ready(function() {

  //checking if we can use the device's microphone
  if(!navigator.getUserMedia && !navigator.webkitGetUserMedia) {
    showWarning();
    return;
  }

  //load json with colors
  $.getJSON('src/colors.json', function(loadedColors) {
    colors = loadedColors;

    //start receiver
    receiver = new Receiver(onReceiverReady, function(e) {console.log(e);});
  });
});

function onReceiverReady() {

  //associate my onChange event
  receiver.onChangeMessage = onChangeMessage;

  /* debugging *
  startEmitter();
  /* */
}

//
//RECEIVER LOGIC

function onChangeMessage(message) {

  if (message > neutralMessage && message < (colors.length + 1)) {

    //turn it to zero-based again
    message--;

    changeColor(colors[message]);
  }
}

//
//INTERFACE

function showWarning() {
  $('#warning').show();
}

function changeColor(color) {
  $('body').css('background-color', color);
}

//
//DEBUGGING

var emitter;
function startEmitter() {
  emitter = new Emitter(receiver.context);

  receiver.stream.disconnect(receiver.analyser);
  emitter.oscillator.connect(receiver.analyser);
  delete receiver.stream;

  emitter.start();
}

function changeMessage(message) {
  emitter.setMessage(message);
}
