/*
calculator-1 not installed yet 192.168.1.110
calculator-2 (island) is 192.168.1.144
*/

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

var finger_tap = createAudio('audio/finger_tap.mp3', { volume: 1.0 }, function() {
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

var SOUNDS = ['finger_tap', 'beep'];


let input = []
let expression1Array = []
let expression2Array = []
let expression3Array = []
let expressionCarryOver = []
var operator2Variable = ''
var operator3Variable = ''
var counter = 0;
var currentElement = 1;
const isNumber = s => !isNaN(parseFloat(s))
const isOperator = s => '+-*/^#()'.includes(s)
//const exprElement = document.getElementById('expr')
const expression1 = document.getElementById('expr1')
const operator2 = document.getElementById('exprOperator2')
const expression2 = document.getElementById('expr2')
const operator3 = document.getElementById('exprOperator3')
const expression3 = document.getElementById('expr3')
const resultant = document.getElementById('result')


function myTimeoutFunction()
{
    counterFunction();
    setTimeout(myTimeoutFunction, 1000);
}

myTimeoutFunction();

function counterFunction(){
  //console.log("we're here")
  counter++;
  if(counter > 300){ //5 MINUTES
    window.open ('splash.html','_self',false)
  }
}

function buttonClick(e) {
  //console.log("key pressed");
  counter = 0;

  //finger_tap.play();
  // var audioUrl = "audio/finger_tap.mp3";
  // var audio = new Audio(audioUrl);
  // audio.play();

  if (e.target.tagName != 'BUTTON') return
  let token = e.target.textContent
  //console.log(token)
  if (token == '=') {

    //beep.play();
    // var audioUrl = "audio/beep.mp3";
    // var audio = new Audio(audioUrl);
    // audio.play();
    let result
    if (expression1Array.length == 0) {  //there's nothing to evaluate
      result = 0
    } else if(expression1Array.length != 0 && expression2Array.length == 0){  //only the first field is populated
      result = expression1Array;
    } else if(operator2Variable != '' && expression2Array.length != 0 && currentElement == 2){  //evaluate two fields with one operator
      var temp1 = expression1Array.join("");
      var temp2 = expression2Array.join("");
      console.log(math.eval(temp1 + operator2Variable + temp2))
      result = math.eval(temp1 + operator2Variable + temp2)
      result = result.toString()
      resultant.innerHTML = "= " + result
    } else if(operator3Variable != '' && expression3Array.length != 0 && currentElement > 2){  //evaluate two fields with one operator
      var temp1 = expression1Array.join("");
      var temp2 = expression2Array.join("");
      var temp3 = expression3Array.join("");
      console.log(math.eval(temp1 + operator2Variable + temp2 + operator3Variable + temp3))
      result = math.eval(temp1 + operator2Variable + temp2 + operator3Variable + temp3)

      result = result.toString()
      if(result.length < 8){
        resultant.innerHTML = "= " + result
        currentElement = 4;
        expressionCarryOver = math.eval(temp1 + operator2Variable + temp2 + operator3Variable + temp3)
      }else{
        resultant.innerHTML = "too long"
      }
    }
  }

  if (token == 'AC') {
    input = []
    expression1Array = []
    expression2Array = []
    expression3Array = []
    operator2Variable = ''
    operator3Variable = ''
    currentElement = 1
    resultant.innerHTML = 0
    operator2.innerHTML = '&nbsp;'
    operator3.innerHTML = '&nbsp;'
    updateExpr(input)
  // } else if (token == 'DEL') {
  //   input.pop()
  //   updateExpr(input)
  }

  if ( token == '+' || token == '-'){
    console.log(currentElement)
    if(currentElement == 1){
      operator2.innerHTML = token
      operator2Variable = token
      currentElement++;
    } else if(currentElement == 2 && expression2Array.length != 0){  //before adding a second operator, make sure some numbers have been entered
      operator3.innerHTML = token
      operator3Variable = token
      currentElement++;
    } else if(currentElement == 3){
      console.log("doing nothing")
    } else if(currentElement == 4){
      expression1Array = []
      expression1Array[0] = expressionCarryOver
      expression1.textContent = expression1Array.join('')
      expression1.innerHTML += '&nbsp;'
      expression2.innerHTML = '&nbsp;'
      expression3.innerHTML = '&nbsp;'
      expression2Array = []
      expression3Array = []
      operator2Variable = token
      operator2.innerHTML = token
      operator3Variable = ''
      operator3.innerHTML = '&nbsp;'
      currentElement = 2
      resultant.innerHTML = "= "
    }
  }
  if(isNaN(token)) {
    beep.play();
  }else{  //finally assuming numbers have been pressed
    finger_tap.play();
    if(currentElement == 1){
      if(expression1Array.length < 10){
        expression1Array.push(token)
        console.log(expression1Array.length)
        expression1.textContent = expression1Array.join('')
        expression1.innerHTML += '&nbsp;';
      }
    }
    if(currentElement == 2){
      if(expression2Array.length < 9){
        expression2Array.push(token)
        expression2.textContent = expression2Array.join('')
      }
    }
    if(currentElement == 3){
      if(expression3Array.length < 9){
        expression3Array.push(token)
        expression3.textContent = expression3Array.join('')
        expression3.innerHTML += '&nbsp;';
      }
    }
    //input.push(token)
    //updateExpr(input)
    resultant.innerHTML = "= "
  }
   //console.log(input)
}
document.getElementById('calculator').addEventListener('click', buttonClick)

function test1(sounds){
  sounds.beep.play();

}
function test2(sounds){
  sounds.finger_tap.play();
}


function updateExpr(input) {
  if (input.length == 0) {
    expression1.innerHTML = '&nbsp;'
    expression2.innerHTML = '&nbsp;'
    expression3.innerHTML = '&nbsp;'
  } else {
    //exprElement.textContent = input.join('')
    //expression1.textContent = expression1Array.join('')
  }
}

function keyboardHandler(e) {
   //console.log(e)
  const buttonMap = {
    'Backspace': 'del',
    '.': 'decimal',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0',
    '+': 'plus',
    '-': 'minus',
    'x': 'multiply',
    '*': 'multiply',
    '/': 'divide',
    '^': 'pow',
    '(': 'left-paren',
    ')': 'right-paren',
    'Enter': 'equals',
    '=': 'equals',
    'c': 'ac'
  }
  const id = buttonMap[e.key]
  //console.log(id)
  if (id){
    //if(id != 'plus'){
    document.getElementById(id).click();
    //}
  }
}

window.addEventListener('keydown', keyboardHandler)

// loadSounds(SOUNDS, test1);
// loadSounds(SOUNDS, test2);
