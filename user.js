const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  gretting = document.querySelector(".js-grettings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

const saveName=(text)=> {
  localStorage.setItem(USER_LS, text);
}

const handleSubmit=(event)=> {
  event.preventDefault();
  const currentValue = input.value;
  paintGretting(currentValue);
  saveName(currentValue);
  input.value = '';
}

const askForName=() =>{
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

const paintGretting=(text)=> {
  form.classList.remove(SHOWING_CN);
  gretting.classList.add(SHOWING_CN);
  gretting.innerText = `Hello ${text}`;
}

const loadName=() =>{
  const currentUser = localStorage.getItem(USER_LS);

  currentUser === null ? askForName():paintGretting(currentUser);
}

const user=()=> loadName();

  

user();
