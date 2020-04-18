'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

    let todoData = [];

    

const addTodo = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text=todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' + 
        '</div>';

        if (item.completed === true) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoComplete = li.querySelector('.todo-complete');
        
        todoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            addTodo();
        });

        const todoRemove = li.querySelector('.todo-remove');

        todoRemove.addEventListener('click', function () {
            localStorage.removeItem(item.value);
            delete todoData[i];
            addTodo();
        });
        localStorage.setItem(item.value, JSON.stringify(item));
        
    });
};

todoControl.addEventListener('submit', function (event) {
  
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false,
    };

    if (newTodo.value !== '') {
        todoData.push(newTodo);
    }

    addTodo();
    headerInput.value = '';
    
});

for (let key in localStorage) {
    if (typeof localStorage[key] === 'string') {
        let add = JSON.parse(localStorage.getItem(key));
        console.log('add: ', add);
        todoData.push(add);
    }
}


addTodo();
