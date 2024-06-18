var form = document.querySelector('form');
var inputField = document.querySelector('#input');
var ul = document.querySelector('ul');
var localstore = ['Buckle my shoe', 'Knock at the door', 'Pick up sticks'];
var todos = [];
function renderTodos() {
    ul.innerText = '';
    if (localstore.length) {
        todos = localstore;
    }
    todos.forEach(function (todo) {
        var li = document.createElement('li');
        li.innerText = todo;
        ul.append(li);
        // console.log(todo);
    });
}
renderTodos();
// const todos: string[] = [];
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = inputField.value;
    localstore.push(input);
    renderTodos();
    // console.log(input);
});
