import { TaskList } from './TaskList.js'

const addNewTaskButton = document.getElementById('add-new-task-button')
const addNewTaskInput = document.getElementById('add-new-task-input')
let currentTabButton = document.querySelector('.filter-buttons__button-active')
const taskListItems = document.getElementById('task-list-items')
const taskItemTemplate = document.getElementById('task-item-template')
const taskTotalCount = document.querySelector('.task-information__total')
const activeTaskCount = document.querySelector('.task-information__active')
const completedTaskCount = document.querySelector('.task-information__completed')
const searchInput = document.querySelector('.task-search__input')
const filterButtons = document.querySelectorAll('.filter-buttons__button')
const taskList = new TaskList()

filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (event) => {
        filterButtons.forEach((button) => {
            button.classList.remove('filter-buttons__button-active')
        })
        event.target.classList.add('filter-buttons__button-active')
        currentTabButton = document.querySelector('.filter-buttons__button-active')
        updateAndRender()
    })
})

addNewTaskButton.addEventListener('click', () => {
    if (addNewTaskInput.value) {
        taskList.addTask(addNewTaskInput.value)
        addNewTaskInput.value = ''
        updateAndRender()
    } else {
        alert('Вы не ввели текст задачи')
    }
})

searchInput.addEventListener('input', () => {
    updateAndRender()
})

function renderTaskList(currentList) {
    taskListItems.innerHTML = ''
    currentList.forEach((task) => {
        taskListItems.appendChild(createTaskElement(task))
    })
    activeTaskCount.textContent = taskList.activeTasksCount
    taskTotalCount.textContent = taskList.allTasksCount
    completedTaskCount.textContent = taskList.completedTasksCount
}

function createTaskElement(task) {
    const clone = taskItemTemplate.content.cloneNode(true)
    const taskItem = clone.querySelector('.task-list__item')
    const checkbox = clone.querySelector('.task-list__checkbox')
    const title = clone.querySelector('.task-list__title')
    const importantButton = clone.querySelector('.task-list__important-button')
    const deleteButton = clone.querySelector('.task-list__delete-button')

    title.textContent = task.title
    checkbox.checked = task.isCompleted
    if (task.isCompleted) {
        title.classList.add('task-list__title-completed')
    }
    if (task.isImportant) {
        taskItem.classList.add('task-list__important')
        importantButton.classList.add('task-list__important-button-active')
    }

    checkbox.addEventListener('change', () => {
        taskList.toggleCompleted(task.id)
        updateAndRender()
    })

    importantButton.addEventListener('click', () => {
        taskList.toggleImportant(task.id)
        updateAndRender()
    })

    deleteButton.addEventListener('click', () => {
        taskList.deleteTask(task.id)
        updateAndRender()
    })

    return taskItem
}

function getCurrentTab(currentTab) {
    if (currentTab === 'Все задачи') {
        return 'ALL_TASKS'
    }
    if (currentTab === 'Активные') {
        return 'ACTIVE'
    }
    if (currentTab === 'Выполненные') {
        return 'COMPLETED'
    }
    if (currentTab === 'Важные') {
        return 'IMPORTANT'
    }
}

export function updateAndRender() {
    const currentTab = getCurrentTab(currentTabButton.textContent.trim())
    const currentSearchInput = searchInput.value.trim()
    renderTaskList(taskList.calculateCurrentList(currentTab, currentSearchInput))
}
