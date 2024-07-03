// selects elements from dom
const form = document.querySelector('form')!;
const inputField = document.querySelector('#input') as HTMLInputElement;
const ul = document.querySelector('ul')!;

// declares object interface that holds todos
interface Todo {
    id: string,
    todo: string,
    completed: boolean
}

// generateId() function is used here to create a unique
// identifier for the key of the address that stores the todos
const storageKey = '1719991974021-43q4d1h';
const todos: Todo[] = retrieveLocalTodos(storageKey);

// A clever function to generate unique ids for the todos.
// Thanks to chatgpt for sponsoring this function : )
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2,9)}`;
}

// function to retrieve the todos array from local storage
function retrieveLocalTodos(storageKey: string): Todo[] {
    if (localStorage.getItem(storageKey)) {
        const localTodos = localStorage.getItem(storageKey) as string;
        return JSON.parse(localTodos) as Todo[];
    }
    return [];
}

// function to store the todos array in local storage
function storeLocalTodos(storageKey: string, array: Todo[]): void {
    const todos = JSON.stringify(array);
    localStorage.setItem(storageKey, todos);
}

// renders a single todo to the page
function addTodo(todo: Todo): void {
    const li = document.createElement('li') as HTMLLIElement;
    // sets id attribute to todo id so that it can be accessed
    // from the dom when the need arises
    li.id = todo.id;
    li.innerText = todo.todo;
    if (todo.completed) { 
        li.style.textDecoration = 'line-through';
    } else {
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
function checkCompleted(this: HTMLLIElement): void {
    // finds the particular todo in the todos array and casts it
    // as a todo since this could return undefined but i am very
    // certain it would not return undefined : )
    const todo = todos.find(todo => todo.id === this.id) as Todo;
    if (this.style.textDecoration === 'none') {
        this.style.textDecoration = 'line-through';
        // modifies the completed property and stores the todo
        // back into the array. Thanks to mutability of js objects
        todo.completed = true;
    } else {
        this.style.textDecoration = 'none';
        todo.completed = false;
    }
    storeLocalTodos(storageKey, todos);
}

// renders all todos from array
function renderTodos(): void {
    ul.innerText = '';
    if (todos.length) {
        todos.forEach((todo: Todo) => {
            addTodo(todo);
        })
    }
}

// retrieves todos from local storage and calls the
// add function on each item to add todo to dom
renderTodos();

form.addEventListener('submit', (e: Event) => {
    // prevents default behavior of submitting form
    e.preventDefault();
    const input: string = inputField.value;
    const id: string = generateId();
    const todo: Todo = {id:id, todo:input, completed:false};
    // pushes a new todo to be added into the todos array
    todos.push(todo);
    // then stores it back into local storage
    storeLocalTodos(storageKey, todos);
    // clears the inputfield after todo is obtained from
    // input field
    inputField.value = '';
    addTodo(todo);
})
