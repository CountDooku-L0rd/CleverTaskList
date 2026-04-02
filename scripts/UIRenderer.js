import { ALERT_EMPTY_STRING, ETabs } from './constants.js'
import { TaskList } from './TaskList.js'

export class UIRenderer {
    #allTaskCount = document.querySelector('.task-information__total')
    #activeTaskCount = document.querySelector('.task-information__active')
    #completedTaskCount = document.querySelector('.task-information__completed')
    #taskListItems = document.getElementById('task-list-items')
    #searchInput = document.querySelector('.task-search__input')
    #taskItemTemplate = document.getElementById('task-item-template')
    #filterButtons = document.querySelectorAll('.filter-buttons__button')
    #addNewTaskButton = document.getElementById('add-new-task-button')
    #addNewTaskInput = document.getElementById('add-new-task-input')
    #currentTab = ETabs.ALL_TASKS
    #taskList
    /**
     * Класс для рендера списка задач
     * @param {TaskList} taskList
     */
    constructor(taskList) {
        this.#taskList = taskList
        this.#setupEventListeners()
    }

    #setupEventListeners() {
        this.#searchInput.addEventListener('input', () => {
            this.render()
        })

        this.#filterButtons.forEach((filterButton) => {
            filterButton.addEventListener('click', (event) => {
                this.#filterButtons.forEach((button) => {
                    button.classList.remove('filter-buttons__button-active')
                })
                event.target.classList.add('filter-buttons__button-active')
                this.#currentTab = {
                    ['Все задачи']: ETabs.ALL_TASKS,
                    ['Выполненные']: ETabs.COMPLETED,
                    ['Активные']: ETabs.ACTIVE,
                    ['Важные']: ETabs.IMPORTANT,
                }[event.target.textContent.trim()]
                this.render()
            })
        })

        this.#addNewTaskButton.addEventListener('click', () => {
            if (this.#addNewTaskInput.value) {
                this.#taskList.addTask(this.#addNewTaskInput.value)
                this.#addNewTaskInput.value = ''
                this.render()
            } else {
                alert(ALERT_EMPTY_STRING)
            }
        })
    }

    render() {
        const currentSearchString = this.#searchInput.value.trim()
        const currentList = this.#taskList.calculateCurrentList(
            this.#currentTab,
            currentSearchString
        )
        this.#taskListItems.innerHTML = ''
        currentList.forEach((task) => {
            this.#taskListItems.appendChild(this.#createTaskElement(task))
        })
        this.#activeTaskCount.textContent = this.#taskList.activeTasksCount
        this.#allTaskCount.textContent = this.#taskList.allTasksCount
        this.#completedTaskCount.textContent = this.#taskList.completedTasksCount
    }

    #createTaskElement(task) {
        const clone = this.#taskItemTemplate.content.cloneNode(true)
        const taskItem = clone.querySelector('.task-list__item')
        const checkbox = clone.querySelector('.task-list__checkbox')
        const title = clone.querySelector('.task-list__title')
        const importantButton = clone.querySelector('.task-list__important-button')
        const deleteButton = clone.querySelector('.task-list__delete-button')

        title.textContent = task.title
        checkbox.checked = task.isCompleted
        taskItem.classList.add('task-list__active')
        if (task.isCompleted) {
            taskItem.classList.remove('task-list__active')
            title.classList.add('task-list__title-completed')
        }
        if (task.isImportant) {
            importantButton.classList.add('task-list__important-button-active')
        }

        checkbox.addEventListener('change', () => {
            this.#taskList.toggleCompleted(task.id)
            this.render()
        })

        importantButton.addEventListener('click', () => {
            this.#taskList.toggleImportant(task.id)
            this.render()
        })

        deleteButton.addEventListener('click', () => {
            this.#taskList.deleteTask(task.id)
            this.render()
        })

        return taskItem
    }
}
