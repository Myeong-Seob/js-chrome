const toDoForm = document.querySelector(".js-ToDo");
const toDoInput = toDoForm.querySelector("input");
const pending_ul = document.querySelector(".pending_ul");
const finished_ul = document.querySelector(".finished_ul");

const PENDING = "Pending";
const FINISHED = "Finished";

let pendingList = [];
let finishedList = [];

const generateRandom = function (min, max) {
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

const saveLocal = (part, taskList) => {
  localStorage.setItem(part, JSON.stringify(taskList));
};

const deleteTasks = (e) => {
  const btn = e.target;
  const li = btn.parentNode;
  const liPar = li.parentNode;
  if (liPar.matches(".pending_ul")) {
    pending_ul.removeChild(li);
    const cleanToDos = pendingList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    pendingList = cleanToDos;
    saveLocal(PENDING, pendingList);
  } else {
    finished_ul.removeChild(li);
    const cleanToDos = finishedList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    finishedList = cleanToDos;
    saveLocal(FINISHED, finishedList);
  }
};

const moveTasks = (e) => {
  const btn = e.target;
  const li = btn.parentNode;
  const liPar = li.parentNode;
  const task = li.querySelector("span").innerText;
  if (liPar.matches(".pending_ul")) {
    pending_ul.removeChild(li);
    const cleanToDos = pendingList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    pendingList = cleanToDos;
    finishedPaint(task);
    saveLocal(PENDING, pendingList);
  } else {
    finished_ul.removeChild(li);
    const cleanToDos = finishedList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    finishedList = cleanToDos;
    pendingPaint(task);
    saveLocal(FINISHED, finishedList);
  }
};

const finishedPaint = (task) => {
    const btn = "🔙";
  const id = generateRandom(0, 1000);
  const li = paintingTask(task, btn);
  li.id = id;
  const finishedTask = {
    task,
    id,
  };
  finishedList.push(finishedTask);
  finished_ul.appendChild(li);
  saveLocal(FINISHED, finishedList);
};

const pendingPaint = (task) => {
    const btn = "✔"
  const id = generateRandom(0, 1000);
  const li = paintingTask(task, btn);
  li.id = id;
  const pendingTask = {
    task,
    id,
  };
  pendingList.push(pendingTask);
  pending_ul.appendChild(li);
  saveLocal(PENDING, pendingList);
};

const paintingTask = (task, word) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  delBtn.addEventListener("click", deleteTasks);
  moveBtn.addEventListener("click", moveTasks);
  span.innerText = task;
  delBtn.innerText = "❌";
  moveBtn.innerText = word;
  li.appendChild(span);
  li.append(delBtn);
  li.append(moveBtn);
  return li;
};

const loadTask = () => {
  const pendingTask = localStorage.getItem(PENDING);
  if (pendingTask !== null) {
    const pendingItem = JSON.parse(pendingTask);
    pendingItem.forEach(function (item) {
      pendingPaint(item.task);
    });
  }
  const finishedTask = localStorage.getItem(FINISHED);
  if (finishedTask !== null) {
    const finishItem = JSON.parse(finishedTask);
    finishItem.forEach(function (item) {
      finishedPaint(item.task);
    });
  }
};

const makeSubmit = (e) => {
  e.preventDefault();
  const result = toDoInput.value;
  pendingPaint(result);
  toDoInput.value = "";
};

const todo = () => {
  loadTask();
  toDoForm.addEventListener("submit", makeSubmit);
};

todo();
