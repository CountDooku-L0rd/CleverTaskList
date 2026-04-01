import { getCurrentTab } from './utils.js'

export class UIRender {
    #allTaskCount = document.querySelector('.task-information__total')
    #activeTaskCount = document.querySelector('.task-information__active')
    #completedTaskCount = document.querySelector('.task-information__completed')
    #taskListItems = document.getElementById('task-list-items')
    #searchInput = document.querySelector('.task-search__input')
    #taskItemTemplate = document.getElementById('task-item-template')
    #taskList

    constructor(taskList) {
        this.#taskList = taskList
    }

    updateAndRender() {
        const currentTabButton = document.querySelector('.filter-buttons__button-active')
        const currentTab = getCurrentTab(currentTabButton.textContent.trim())
        const currentSearchInput = this.#searchInput.value.trim()
        this.#renderTaskList(
            this.#taskList.calculateCurrentList(currentTab, currentSearchInput)
        )
    }

    #renderTaskList(currentList) {
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
            this.updateAndRender()
        })

        importantButton.addEventListener('click', () => {
            this.#taskList.toggleImportant(task.id)
            this.updateAndRender()
        })

        deleteButton.addEventListener('click', () => {
            this.#taskList.deleteTask(task.id)
            this.updateAndRender()
        })

        return taskItem
    }
}
