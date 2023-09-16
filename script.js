
let todoHistory = [];
let id = 0;
let element = {
    id: -1,
    value: ""
};
function populateFormLocalStorage() {
    const items = localStorage.getItem('todoHistory');
    todoHistory = JSON.parse(items);
    renderList(todoHistory);
}

function storeInLocalStorage() {
    localStorage.setItem("todoHistory", JSON.stringify(todoHistory));
}

function renderList(items) {
    const todoList = document.getElementById("todo-list");

    let listHTML = "";
    for (let item of items) {
        listHTML += `
            <div id="item-${item.id}" class="todo-item">
                <p id="item-title" class="item-title">${item.value}</p>
                <div class="btn-contant" id="btn-contant">
                    <button id="dlt-btn" class="btn">Delete</button>
                    <button id="edit-btn" class="btn">Edit</button>
                </div>
            </div>
        `
    }

    todoList.innerHTML = listHTML;
    storeInLocalStorage();
}
function deleteItem(item)
{
    const parent = item.parentElement.parentElement;
    const parentId = item.parentElement.parentElement.id;
    const idx = parentId.split("-")[1];
    parent.remove();
    todoHistory = todoHistory.filter(item => item.id != idx)
    console.log(todoHistory);
    storeInLocalStorage();
    
}

function editAction(items)
{
    const input = document.getElementById("add-input");
    const idx = parseInt(element.id);
    const target = todoHistory.find(item => item.id === idx);
    if (target) {
        target.value = input.value;
    }
    renderList(todoHistory);
    const addBtn = document.getElementById("add-btn");
    const editBtn = document.getElementById("edit_btn");
    const cancelBtn = document.getElementById("cancel-btn");
  
    input.value = "";
    addBtn.style.display = "block";
    editBtn.style.display = "none";
    cancelBtn.style.display = "none";  
}
function editItem(items)
{
    
    const addBtn = document.getElementById("add-btn");
    const editBtn = document.getElementById("edit_btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const input = document.getElementById("add-input");

    addBtn.style.display = "none";
    editBtn.style.display = "block";
    cancelBtn.style.display = "block";

    const parent = items.parentElement.parentElement;
    const parentId = items.parentElement.parentElement.id;
    const idx = parseInt(parentId.split("-")[1]);

    const findItem = todoHistory.find(items => items.id === idx);
    
    element.id = idx;
    element.value = findItem.value;

    input.value = findItem.value;
    editBtn.addEventListener("click", editAction);
    cancelBtn.addEventListener("click", cancelAction);
  
}

function cancelAction(e)
{
    const addBtn = document.getElementById("add-btn");
    const editBtn = document.getElementById("edit_btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const input = document.getElementById("add-input");
    input.value = "";

    addBtn.style.display = "block";
    editBtn.style.display = "none";
    cancelBtn.style.display = "none";
}

function updateUI()
{
    renderList(todoHistory);
}
function updateAction(e) {
    if (e.target.id === "dlt-btn")
    {
        deleteItem(e.target);
    }
    if (e.target.id === "edit-btn")
    {
        editItem(e.target);
    }
}
function registerEvent()
{
    const addBtn = document.getElementById("add-btn");
    const todoList = document?.getElementById("todo-list");
    const editBtn = document.getElementById("edit_btn");

    addBtn.addEventListener("click", addItem);
    todoList?.addEventListener("click", updateAction);
   
}

function addItem(e) {
    const input = document.getElementById("add-input");
    const value = input.value;
    if (value.length > 0) {
        todoHistory.push({ id, value });
        id++;
        updateUI();
        input.value = "";
        
    }
    else {
        alert("Please enter atleast one latter.");
    }
   
}

populateFormLocalStorage();
registerEvent();

