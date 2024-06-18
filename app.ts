const form = document.querySelector('form')!;
const inputField = document.querySelector('#input') as HTMLInputElement;
const ul = document.querySelector('ul')!;

const localstore: string[] = ['Buckle my shoe', 'Knock at the door', 'Pick up sticks'];

let todos: string[] = [];

function renderTodos() {
    ul.innerText = '';
    if (localstore.length) {
        todos = localstore;
    }
    todos.forEach((todo: string) => {
        const li = document.createElement('li') as HTMLLIElement;
        li.innerText = todo;
        ul.append(li);
        // console.log(todo);
    })
}

renderTodos();

// const todos: string[] = [];

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const input = inputField.value;
    localstore.push(input);
    renderTodos();
    // console.log(input);
})