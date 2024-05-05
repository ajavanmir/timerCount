/*
Copyright amir javanmir
Released on: May 5, 2024
*/
let startBox = document.querySelector(".start-box");
let inputCounter = startBox.querySelector("#input-counter");
let startCounter = startBox.querySelector("#start-counter");
let timerCircle = document.querySelector(".c100");
let numPlace = timerCircle.querySelector("span")
let lastPrecent, valInput,originalNum,timerId;

startCounter.addEventListener('click',function(){
    valInput = parseInt(inputCounter.value);
    if(isNaN(valInput))return showErrorMessage({"show":true,"message":"زمان را بدرستی وارد کنید!"});
    showErrorMessage({"show":false});
    showStartBox({"show":false});
    showLoading({"show":true})
    
    numPlace.textContent = valInput;
    originalNum = valInput;
    lastPrecent = 'p100';
    timerId = setInterval(startTimer,1000)
})

function showErrorMessage({show,message}){
    let errorMessage = document.querySelector("#error-message");
    if(show){
        errorMessage.textContent = message;
        errorMessage.classList.add("active");
        return true;
    }else{
        errorMessage.classList.remove("active");
        return false;
    }
}

function showStartBox({show}){
    if(show){
        startBox.classList.add("active");
        startBox.style.display = "block";
        timerCircle.style.display = "none";
        
    }else{
        startBox.classList.remove("active");
        startBox.style.display = "none";
        timerCircle.style.display = "block";
    }
    inputCounter.value = "";
}

function showLoading({show}){
    let loadingMessage = document.querySelector(".message .loading");
    let successMessage = document.querySelector(".message .success");
    if(show){
        successMessage.style.display = "none";
        loadingMessage.style.display = "block";
    }else{
        loadingMessage.style.display = "none";
        successMessage.style.display = "block";
    }
}

function startTimer(){
    lastPrecent?timerCircle.classList.remove(lastPrecent):'';
    if(valInput < 1){
        clearInterval(timerId);
        showStartBox({"show":true});
        showLoading({"show":false})
        return;    
    }
    valInput -= 1;
    numPlace.textContent = valInput;
    let percent = lastPrecent = `p${Math.abs(Math.floor(((originalNum - valInput)/originalNum)*100)-100)}`;             
    timerCircle.classList.add(percent);
}