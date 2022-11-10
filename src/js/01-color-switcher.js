function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  const btnStart = document.querySelector('button[data-start]') 
const btnStop = document.querySelector('button[data-stop]')
const bodyElement = document.querySelector('body')
console.log(btnStart)
console.log(btnStop)

let timerId = null;

btnStop.disabled = true;

btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        bodyElement.style.backgroundColor = getRandomHexColor();
    }, 1000);
  
    btnStart.disabled = true;
    btnStop.disabled = false;
     });

     btnStop.addEventListener('click', () => {
        clearInterval(timerId);
        btnStop.disabled = true;
        btnStart.disabled = false;
        
      });