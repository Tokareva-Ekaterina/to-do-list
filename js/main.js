const todoList = document.querySelector('.todo-list');
const todoItems = document.querySelectorAll('.todo-item');
const todoForm = document.querySelector('.todo-form');
const addInput = document.querySelector('.add-input');

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!addInput.value) {
        alert('Вы ничего не ввели!');
    }
    else {
        const newItem = document.createElement('li');
        newItem.className = 'todo-item';
        newItem.innerHTML = `
        <input class="checkbox" type="checkbox"><label class="title">${addInput.value}</label><input class="text-field" type="text">
        <button class="edit">ИЗМЕНИТЬ</button>
        <button class="delete">УДАЛИТЬ</button>
        `;
        todoList.append(newItem);
        addInput.value = '';
        bindEvents(newItem);
    }
});

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('.edit');
    const deleteButton = todoItem.querySelector('.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteleTodoItem);
}

function toggleTodoItem() {
    const todoItem = this.parentElement;
    todoItem.classList.toggle('todo-item_check');
    if (todoItem.classList.contains('todo-item_edit')) {
        const title = todoItem.querySelector('.title');
        const editInput = todoItem.querySelector('.text-field');
        todoItem.querySelector('.edit').textContent = 'ИЗМЕНИТЬ';
        title.textContent = editInput.value;
        todoItem.classList.toggle('todo-item_edit');
    }
}

function editTodoItem() {
    const todoItem = this.parentElement;
    const title = todoItem.querySelector('.title');
    const editInput = todoItem.querySelector('.text-field');
    if (!todoItem.classList.contains('todo-item_edit')) {
        editInput.value = title.textContent;
        this.textContent = 'СОХРАНИТЬ';
    }
    else {
        this.textContent = 'ИЗМЕНИТЬ';
        title.textContent = editInput.value;
    }
    todoItem.classList.toggle('todo-item_edit');
}

function deleteleTodoItem() {
    const todoItem = this.parentElement;
    todoItem.remove();
}

function main() {
    todoItems.forEach(item => bindEvents(item));
}

main();