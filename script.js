let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document.querySelector(".cal-buttons").addEventListener("click", function(event){

    buttonClick(event.target.innerText);

});

function buttonClick(value){
    console.log(value);
    if(isNaN(parseInt(value))){
        symbolHandle(value);
    }
    else{
        numberHandle(value);
    }
}

function numberHandle(value){
    if(buffer === "0"){
        buffer = value;
    }
    else{
        buffer+=value;
    }

    showbuffer();
}

function symbolHandle(value){

    switch(value){
        case 'C':
            buffer = "0";
            runningTotal = 0;
            showbuffer();
            break;
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperator(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            showbuffer();
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            showbuffer();
            break;
        default:
            handleMath(value);
            break;
    }
}

function showbuffer()
{
   screen.innerText = buffer;
}

function handleMath(value)
{
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0)
    {
        runningTotal = intBuffer;
    }
    else{
        flushOperator(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperator(intBuffer){
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    }
    else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === "÷"){
        runningTotal /= intBuffer;
    }
    else if(previousOperator === "*"){
        runningTotal *= intBuffer;
    }
}