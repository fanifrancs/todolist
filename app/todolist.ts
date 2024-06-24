const form = document.querySelector('form')!;
const inputField = document.querySelector('#input') as HTMLInputElement;
const ul = document.querySelector('ul')!;

// declaring todos array type and initializing
type todosArrayType = string[];
let todos: todosArrayType;

// function to retrieve the array from local storage
function retrieveLocalTodos(storageKey: string): todosArrayType {
    if (localStorage.getItem(storageKey)) {
        const localTodos = localStorage.getItem(storageKey) as string;
        return JSON.parse(localTodos) as todosArrayType;
    }
    return [];
}

// Function to store the array in local storage
// function storeArray(key: string, array: MyArrayType): void {
//     const jsonString = JSON.stringify(array);
//     localStorage.setItem(key, jsonString);
// }

// A wierd combination of string is used so as to create a
// unique identifier for the address that stores the todos
todos = retrieveLocalTodos('xswbvjc');

// renders a single todo to the page
function addTodo(todo: string) {
    const li = document.createElement('li') as HTMLLIElement;
    li.innerText = todo;
    ul.append(li);
}

// renders all todos from array
function renderTodos() {
    // ul.innerText = '';
    // above statement followed by a loop was used when i cleared the
    // dom and rendered every single todo in the array every time a
    // new todo is being added. Very poor : )
    if (todos.length) {
        todos.forEach((todo: string) => {
            addTodo(todo);
        })
    }
}

renderTodos();

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const input: string = inputField.value;
    const localTodos = retrieveLocalTodos('xswbvjc');
    localTodos.push(input);
    localStorage.setItem('xswbvjc', JSON.stringify(localTodos));
    addTodo(input);
    // clears the inputfield after todo is added
    inputField.value = '';
})
