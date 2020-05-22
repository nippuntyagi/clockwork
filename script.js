let timerObj = {
   minutes: 0,
   seconds: 0,
   timerId: 0
}

function soundAlarm(){
   let amount = 3;
   let audio = new Audio("Timer_Sound_Effect.mp3");

   function playSound(){
     audio.pause();
     audio.currenttime = 0;
     audio.play();
   }

   for(let i = 0; i < amount; i++){
     setTimeout(playSound, 1200 * i);
   }
}

function updatevalue(key, value){
  if(value < 0){
    value=0
    console.log("Positive numbers only.");
  }
  if(key == "seconds"){
    if(value < 10){
      value = "0"+value;
    };
    if(value > 59){
      value = 59;
    }
  }
  $('#'+key).html(value || 0);
  timerObj[key] = value;
}

(function detectChange(key){
  let input = "#"+key+"-input";

  $(input).change(function(){
    updatevalue(key, $(input).val());
  });

  $(input).keyup(function(){
    updatevalue(key, $(input).val());
  });

  return arguments.callee;
})("minutes")("seconds");

function startTimer(){
  buttonManager(['start', false], ['pause', true], ['stop', true]);
  freezeInputs();
  timerObj.timerId = setInterval(function(){
    timerObj.seconds--;
    console.log(timerObj.seconds)
    if(timerObj.seconds < 0){
      console.log(timerObj.minutes)
      if(timerObj.minutes == 0){
        console.log(timerObj.minutes)
        soundAlarm();
        return stopTimer();
      }
      timerObj.seconds=59
      timerObj.minutes--;
    }
    updatevalue("minutes", timerObj.minutes);
    updatevalue("seconds", timerObj.seconds);
  }, 1000)
}
function stopTimer(){
  clearInterval(timerObj.timerId);
  buttonManager(['start', true], ['pause', false], ['stop', false]);
  unfreezeInputs();
  updatevalue("minutes", $('#minutes-input').val());
  let seconds = $("#seconds-input").val() || "0";
  updatevalue("seconds", seconds);
}
function pauseTimer(){
  buttonManager(['start', true], ['pause', false], ['stop', true]);
  clearInterval(timerObj.timerId);
}

//Rest operatior - pass as many of arguments in a function  (...numbs) its an array of params
function buttonManager(...buttonsArray){
  for(let i=0; i < buttonsArray.length; i++){
    let button = "#"+buttonsArray[i][0] + "-button";
    if(buttonsArray[i][1]){
      $(button).removeAttr('disabled');
    } else{
      $(button).attr('disabled','disabled');
    }
  }
}

function freezeInputs(){
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}
function unfreezeInputs(){
  $("#minutes-input").removeAttr("disabled");
  $("#seconds-input").removeAttr("disabled");
}
