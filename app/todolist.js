// selects elements from dom
var form = document.querySelector('form');
var inputField = document.querySelector('#input');
var ul = document.querySelector('ul');
// declares array to store todos
var todos;
// A clever function to generate unique ids for the todos.
// Thanks to chatgpt for sponsoring this function : )
function generateId() {
    return "".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9));
}
// function to retrieve the todos array from local storage
function retrieveLocalTodos(storageKey) {
    if (localStorage.getItem(storageKey)) {
        var localTodos = localStorage.getItem(storageKey);
        return JSON.parse(localTodos);
    }
    return [];
}
// function to store the todos array in local storage
function storeLocalTodos(storageKey, array) {
    var todos = JSON.stringify(array);
    localStorage.setItem(storageKey, todos);
}
// A wierd combination of string is used so as to create a
// unique identifier for the address that stores the todos
todos = retrieveLocalTodos('xswbvjc');
// renders a single todo to the page
function addTodo(todo) {
    var li = document.createElement('li');
    // sets id attribute to todo id so that it can be accessed
    // from the dom when the need arises
    li.id = todo.id;
    li.innerText = todo.todo;
    if (todo.completed) {
        li.style.textDecoration = 'line-through';
    }
    else {
        li.style.textDecoration = 'none';
    }
    // finction to be executed for event does not need brackets
    // because this would lead to execution without the event
    // calling it
    li.addEventListener('click', checkCompleted);
    ul.append(li);
}
// this keyword here belongs to the recipient of
// the function which is the li element
function checkCompleted() {
    var _this = this;
    // finds the particular todo in the todos array and casts it
    // as a todo since this could return undefined but i am very
    // certain it would not return undefined : )
    var todo = todos.find(function (todo) { return todo.id === _this.id; });
    if (this.style.textDecoration === 'none') {
        // modifies the completed property and stores the todo
        // back into the array. Thanks to mutability of js objects
        this.style.textDecoration = 'line-through';
        todo.completed = true;
    }
    else {
        this.style.textDecoration = 'none';
        todo.completed = false;
    }
    storeLocalTodos('xswbvjc', todos);
}
// renders all todos from array
function renderTodos() {
    ul.innerText = '';
    if (todos.length) {
        todos.forEach(function (todo) {
            addTodo(todo);
        });
    }
}
// retrieves todos from local storage and calls the
// add function on each item to add todo to dom
renderTodos();
form.addEventListener('submit', function (e) {
    // prevents default behavior of submitting form
    e.preventDefault();
    var input = inputField.value;
    var id = generateId();
    var todo = { id: id, todo: input, completed: false };
    // pushes a new todo to be added into the todos array
    todos.push(todo);
    // then stores it back into local storage
    storeLocalTodos('xswbvjc', todos);
    // clears the inputfield after todo is obtained from
    // input field
    inputField.value = '';
    addTodo(todo);
});
