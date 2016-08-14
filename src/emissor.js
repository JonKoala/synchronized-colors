
var nonColorDivs = [7, 16, 26, 37, 49, 62, 76, 89, 101, 112, 122, 131];
var emitter;

$(document).ready(function() {

  createColors();
  createQRCode();

  startEmitter();
});

//
//EMITTER

function startEmitter() {
  emitter = new Emitter();
  emitter.start();
}

function changeMessage(message) {
  emitter.setMessage(message);
}

//
//EVENTS

function onColorClick(index, e) {
  selectColor(e);

  //send one-based message
  changeMessage(index + 1);
}

function onShowQRCode (button) {
  toggleQRCode(button);
}

//
//INTERFACE

function createColors() {
  $.getJSON('src/colors.json', function(colors) {
    var i, j = 0;
    for (i = 0; i < 139; i++) {
      div = $('<div>');
      if (nonColorDivs.indexOf(i) === -1) {
        div.addClass('color');
        div.css('background-color', colors[j])
        div.on('click', onColorClick.bind(this, j))
        j++;
      } else {
        div.css('visibility', 'hidden');
      }

      $('#colorPicker').append(div);
    }
  }, function(e) {console.log(e);});
}

function createQRCode() {

  //create my qr code url
  var url = window.location.href;
  url = url.replace('emissor', 'client');

  new QRCode($('#qRCode')[0], url)
}

function selectColor(event) {

  //unselect every selected color
  $('#colorPicker .color[selected]').each(function() {
    $(this).css('border-color', 'white');
    $(this).removeAttr('selected');
  });

  //select the clicked color
  var target = $(event.target);
  target.css('border-color', 'black');
  target.attr('selected', '');
}

function toggleQRCode(button) {

  button = $(button);
  var qRCode = $('#qRCode');

  if (qRCode.attr('hidden')) {
    button.text('HIDE QR CODE');
    qRCode.slideDown(500).removeAttr('hidden');
  } else {
    button.text('SHOW QR CODE');
    qRCode.slideUp(500).attr('hidden','');
  }
}
