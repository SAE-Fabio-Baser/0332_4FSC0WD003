import createElement from "./createElement";

const todoList = document.querySelector("#todosList");
const addTodoBtn = document.querySelector("#addBtn");
const newTodoInput = document.querySelector("#newTodoInput");

function getSavedTodos() {
    const todoString = sessionStorage.getItem("todos");
    return JSON.parse(todoString);
}

const todos = getSavedTodos() || [
    { text: "Wäsche waschen", done: false },
    { text: "Einkaufen", done: true },
    { text: "Steurn machen", done: false },
];

renderTodos();

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(createTodoElement);
    sessionStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(todo) {
    const li = createElement("li");
    const checkAttributes = { type: "checkbox" };
    const check = createElement("input", checkAttributes);
    check.checked = todo.done;

    check.addEventListener("change", (event) => {
        todo.done = event.target.checked;
        renderTodos();
    });

    li.prepend(check);
    li.append(todo.text);

    todoList.append(li);
}

addTodoBtn.addEventListener("click", () => {
    todos.push({ text: newTodoInput.value, done: false });
    renderTodos();
});

newTodoInput.addEventListener("keypress", ({ key }) => {
    if (key === "Enter") {
        todos.push({ text: newTodoInput.value, done: false });
        renderTodos();
    }
});
