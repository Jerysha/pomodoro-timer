const el = document.querySelector(".clock");
const bell = document.querySelector("audio");
const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");
const startBtn = document.querySelector(".start");

localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime");
  } else {
    mins = +localStorage.getItem("breakTime");
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decrement(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
});

function decrement() {
  /*if seconds is 116 then Math.floor(seconds/60) will be 1
  seconds % 60 will be 56
  if seconds is 34 then Math.floor(seconds/60) will be 0
  seconds % 60 will be 34 */
  mindiv.textContent = Math.floor(seconds / 60);
  //if seconds is 9,5,3 (single-digit) then it will return as 09,05,03
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  /*if we dont check and remove the danger class from circle, then if we start the timer once again without reloading the page, reset timer, danger class will still persist and it is not what we desire*/
  if(circle.classList.contains("danger")){
      circle.classList.remove("danger");
  }

  if(seconds > 0){
      /*Math.ceil ensures the number will be a whole number between 0 & 100 */
      perc = Math.ceil(((totalsecs - seconds)/ totalsecs) * 100);
      setProgress(perc);
      seconds--;
      /*so every 1 second ,this decremenT() function will be called, textContent for mins,secs will be reassigned,seconds will be decremented by 1 and later circular progress will be set until seconds reaches 0 */
      initial = window.setTimeout("decrement()", 1000);
      if(seconds < 10){
          circle.classList.add("danger");
      }
  }else{
      /*if seconds reaches 0 then mins and seconds will be reset to 0 and the bell will be played then it will get the "btn" from local storage and then if btn is focus therefore the timer ran for focusTime , next we will start timer for breakTime so we will set btn's value to "break" on localstorage else vice-versa for btn is break */
      mins = 0;
      seconds = 0;
      bell.play();

      if(btn === "focus"){
         startBtn.textContent = "start break";
         startBtn.classList.add("break"); 
         localStorage.setItem("btn", "break");
      }else{
          startBtn.classList.remove("break");
          startBtn.textContent = "start focus";
          localStorage.setItem("btn", "focus");
      }
      startBtn.style.transform = "scale(1)";//should be shown again
  }

}
