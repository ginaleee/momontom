

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPending = document.querySelector(".js-toDoPending"),
  toDoFinished = document.querySelector(".js-toDoFinished");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPending.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function moveToFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPending.removeChild(li);

  btn.innerText = "\u23EE";
  btn.removeEventListener("click", moveToFinished);
  btn.addEventListener("click", moveToPending);
  toDoFinished.appendChild(li);
}

function moveToPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinished.removeChild(li);

  btn.innerText = "\u2705";
  btn.removeEventListener("click", moveToPending);
  btn.addEventListener("click", moveToFinished);
  toDoPending.appendChild(li);
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "\u274C";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "\u2705";
  checkBtn.addEventListener("click", moveToFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  toDoPending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handlerSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintTodo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handlerSubmit);
}

init();
