//cash_register1 is 192.168.1.103 closest to oven
//cash_register2 is 192.168.1.123 not installed yet



function createAudio(src, options, canplay) {
  var audio = document.createElement('audio');
  audio.addEventListener('canplay', canplay, false);
  audio.volume = options.volume || 0.5;
  audio.loop   = options.loop;
  audio.src    = src;
  return audio;
}

var beep = createAudio('audio/beep.mp3', { volume: 1.0 }, function() {
  // ready for zap.play()
});

var cash_register = createAudio('audio/cash_register.mp3', { volume: 1.0 }, function() {
  // ready for zap.play()
});


function loadSounds(names, callback) {

  var n,name,
      result = {},
      count  = names.length,
      canplay = function() { if (--count == 0) callback(result); };

  for(n = 0 ; n < names.length ; n++) {
    name = names[n];
    result[name] = document.createElement('audio');
    result[name].addEventListener('canplay', canplay, false);
    result[name].src = "audio/" + name + ".mp3";
  }

}

var SOUNDS = ['cash_register', 'beep'];

// function run(sounds) {
//
//   // game loop goes here, during which we can...
//
//   sounds.zap.play();
//   sounds.pow.play();
//   sounds.boom.play();
//
// }




var counter = 0;

function myTimeoutFunction()
{
    counterFunction();
    setTimeout(myTimeoutFunction, 1000);
}

myTimeoutFunction();

function counterFunction(){
  //console.log("we're here")
  counter++;
  if(counter > 300){ //3000 is 5 MINUTES
    window.open ('splash.html','_self',false)
  }
}




function countUp(sounds) {
  var countEl = document.querySelector('.counter');
  var countBar = document.querySelector('.progress-bar');
  var x = 0;

  function clearNum() {

    x = 0;
    countEl.innerHTML = x;
    console.log(x)
  }

  function addNum() {
    x += 1;
    countEl.innerHTML = x;
    console.log(x)
  }
  document.onkeypress=function(e){
    counter = 0;
    console.log("key pressed");
    console.log(e.keyCode);
    if(e.keyCode == 114){ //keycode for r or reset
      //console.log("clearing");
      clearNum();
      //var audioUrl = "audio/beep.mp3";
      //var audio = new Audio(audioUrl);
      //audio.play();
      sounds.beep.play();
    }
    if(e.keyCode == 97){ //keycode for a or add number
      addNum();
      //var audioUrl = "audio/cash_register.mp3";
      //var audio = new Audio(audioUrl);
      //audio.play();
      sounds.cash_register.play();
    }
  }
  document.onclick = function(e){
    console.log("clearing");
    clearNum();
    // var audioUrl = "audio/beep.mp3";
    // var audio = new Audio(audioUrl);
    // audio.play();
  }
}
// function run(sounds){
//
//   countUp();
//
// }
//countUp();

loadSounds(SOUNDS, countUp);
