"use strict";
// selects elements from dom
const form = document.querySelector('form');
const inputField = document.querySelector('#input');
const ul = document.querySelector('ul');
// generateId() function is used here to create a unique
// identifier for the key of the address that stores the todos
const storageKey = '1719991974021-43q4d1h';
const todos = retrieveLocalTodos(storageKey);
// A clever function to generate unique ids for the todos.
// Thanks to chatgpt for sponsoring this function : )
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
// function to retrieve the todos array from local storage
function retrieveLocalTodos(storageKey) {
    if (localStorage.getItem(storageKey)) {
        const localTodos = localStorage.getItem(storageKey);
        return JSON.parse(localTodos);
    }
    return [];
}
// function to store the todos array in local storage
function storeLocalTodos(storageKey, array) {
    const todos = JSON.stringify(array);
    localStorage.setItem(storageKey, todos);
}
// renders a single todo to the page
function addTodo(todo) {
    const li = document.createElement('li');
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
    // sets title attribute to display tooltip
    li.title = 'Left-click to mark done/undone, right-click to delete';
    // finction to be executed for event does not need brackets
    // because this would lead to execution without the event
    // calling it
    li.addEventListener('click', checkCompleted);
    li.addEventListener('contextmenu', deleteTodo);
    ul.append(li);
}
// 'this' keyword here belongs to the recipient of
// the function which is the li element
function checkCompleted() {
    // finds the particular todo in the todos array and casts it
    // as a todo since this could return undefined but i am very
    // certain it would not return undefined : )
    const todo = todos.find(todo => todo.id === this.id);
    if (this.style.textDecoration === 'none') {
        this.style.textDecoration = 'line-through';
        // modifies the completed property and stores the todo
        // back into the array. Thanks to mutability of js objects
        todo.completed = true;
    }
    else {
        this.style.textDecoration = 'none';
        todo.completed = false;
    }
    storeLocalTodos(storageKey, todos);
}
function deleteTodo(event) {
    // prevents default behaviour of right-click context menu
    event.preventDefault();
    // selects todo(object) in array
    const todoIndex = todos.findIndex(todo => todo.id === this.id);
    // splice method removes the todo from array
    todos.splice(todoIndex, 1);
    // updates locally stored todos array
    storeLocalTodos(storageKey, todos);
    // removes element from dom
    toBeDeleted.remove();
}
// renders all todos from array
function renderTodos() {
    ul.innerText = '';
    if (todos.length) {
        todos.forEach((todo) => {
            addTodo(todo);
        });
    }
}
// retrieves todos from local storage and calls the
// add function on each item to add todo to dom
renderTodos();
form.addEventListener('submit', (e) => {
    // prevents default behavior of submitting form
    e.preventDefault();
    const input = inputField.value;
    const id = generateId();
    const todo = { id: id, todo: input, completed: false };
    // pushes a new todo to be added into the todos array
    todos.push(todo);
    // then stores it back into local storage
    storeLocalTodos(storageKey, todos);
    // clears the inputfield after todo is obtained from
    // input field
    inputField.value = '';
    addTodo(todo);
});
