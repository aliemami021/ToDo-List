let A5UnOrderList = document.querySelector(".A5 ul");
let A5Lists = document.querySelectorAll(".A5 li");
let A4 = document.querySelector(".A4");
let wellcome = document.querySelector(".wellcome");
let A4UnOrderlist = document.querySelector(".A4 ul");
let A4Lists = document.querySelectorAll(".A4 li");
let A4UltoDoList = document.querySelector(".A4 section ul");
let currentDay = null;
const input = document.querySelector("input");
const form = document.querySelector("form");

//-------------buttons-------//
let wideBtn = document.getElementById("wide-btn");
let backBtn = document.getElementById("back-btn");

wideBtn.addEventListener("click", function () {
    A4.style.width = "100%";
    A4.style.height = "100%";
});

backBtn.addEventListener("click", function () {
    A4.style.width = "80%";
    A4.style.height = "80%";
});
//----------buttons----------//

let tasks = {
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wensday: [],
    tursday: [],
    friday: [],
};


//event
for (let A5List of A5Lists) {
    A5List.addEventListener("click", addToA4List);
}

function addToA4List(event) {
    const dayName = event.target.textContent;

    let dayNameElement = document.createElement("li");
    dayNameElement.innerHTML = dayName;
    A4UnOrderlist.innerHTML = "";
    A4UnOrderlist.appendChild(dayNameElement);
    setCurrentDay(dayName);
    updateTasksUi(currentDay);
}

form.addEventListener("submit", addTo);

function addTo(event) {
    // remove submit event
    event.preventDefault();
    console.log(currentDay);
    if (input.value !== "") {
        const toDo = { title: input.value, isComplete: false };
        addDayToDo(currentDay, toDo);
        input.value = "";
        updateTasksUi(currentDay);
    }
}

//set days events
function addDayToDo(day, toDo) {
    tasks[day].push(toDo);
}

function setCurrentDay(day) {
    currentDay = day;
    wellcome.classList.add("d-none");
    A4.classList.remove("d-none");
}

function updateTasksUi(currentDay) {
    const dayTasks = tasks[currentDay];
    A4UltoDoList.innerHTML = "";
    for (let i = 0; i < dayTasks.length; i++) {
        const li = document.createElement("li");
        li.dataset.index = i;
        li.innerHTML = dayTasks[i].title;
        A4UltoDoList.appendChild(li);
        li.addEventListener("click", removeTask);
    }
}

function removeTask(event) {
    const taskIndex = Number(event.target.dataset.index);
    tasks[currentDay].splice(taskIndex, 1);
    updateTasksUi(currentDay);
}
