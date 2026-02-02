  const titleInput = document.getElementById('title');
  const timeInput = document.getElementById('time');
  const priorityInput = document.getElementById('priority');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('list');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      if (todo.done) li.classList.add('done');

      li.innerHTML = `
        <div class="todo-top">
          <div class="title">${todo.title}</div>
          <div class="priority ${todo.priority}">${todo.priority.toUpperCase()}</div>
        </div>
        <div class="info">Start at: ${todo.time || '--:--'}</div>
        <div class="actions">
          <button onclick="toggle(${index})">Done</button>
          <button onclick="edit(${index})">Edit</button>
          <button onclick="removeTodo(${index})">Delete</button>
        </div>
      `;

      list.appendChild(li);
    });
  }

  addBtn.onclick = () => {
    if (!titleInput.value.trim()) return;

    todos.push({
        title: titleInput.value,
        time: timeInput.value,
        priority: priorityInput.value,
        done: false
    });

    save();
    render();

    titleInput.value = '';
    timeInput.value = '';
    priorityInput.selectedIndex = 0;
  };

  function toggle(i) {
    todos[i].done = !todos[i].done;
    save();
    render();
  }

  function removeTodo(i) {
    todos.splice(i, 1);
    save();
    render();
  }

  function edit(i) {
    const t = prompt('Edit task', todos[i].title);
    if (t) {
      todos[i].title = t;
      save();
      render();
    }
  }

  render();