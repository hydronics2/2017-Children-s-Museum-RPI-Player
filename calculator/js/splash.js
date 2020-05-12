/*
Globals and helper functions
*/






function buttonClick(e) {
  console.log("key pressed");
  window.open ('index.html','_self',false)
   //console.log(input)
}
window.addEventListener('keypress', buttonClick)
