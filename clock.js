const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

const getTime=()=> {
  const date = new Date();
  const hours = date.getHours(),
   minutes = date.getMinutes(),
   seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`} : ${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  } : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

const clock=() => {
 getTime();
  setInterval(getTime, 1000);
}

clock();
