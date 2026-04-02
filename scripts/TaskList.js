import { ERROR_NOT_FOUND_TASK_ID, ETabs } from './constants.js'

export class TaskList {
    #id = 0
    #list = []
    #currentList = []

    constructor() {
        this.#getDataFromLocalStorage()
    }

    #getDataFromLocalStorage() {
        const saved = localStorage.getItem('list')
        if (saved) {
            const data = JSON.parse(saved)
            this.#id = data.id
            this.#list = data.list
        }
    }
    addTask(title) {
        const task = {
            id: this.#id,
            title: title.trim(),
            isImportant: false,
            isCompleted: false,
        }
        this.#id++
        this.#list.push(task)
        this.#saveToLocalStorage()
    }
    deleteTaskById(id) {
        this.#list = this.#list.filter((item) => item.id !== id)
        this.#saveToLocalStorage()
    }
    toggleIsImportantById(id) {
        const index = this.#list.findIndex((item) => item.id === id)
        if (index === -1) {
            console.error(ERROR_NOT_FOUND_TASK_ID)
            return
        }
        this.#list[index].isImportant = !this.#list[index].isImportant
        this.#saveToLocalStorage()
    }
    toggleIsCompletedById(id) {
        const index = this.#list.findIndex((item) => item.id === id)
        if (index === -1) {
            console.error(ERROR_NOT_FOUND_TASK_ID)
            return
        }
        this.#list[index].isCompleted = !this.#list[index].isCompleted
        this.#saveToLocalStorage()
    }
    calculateCurrentList(currentTab, searchString) {
        if (currentTab === ETabs.ALL_TASKS) {
            this.#currentList = this.#list
        } else if (currentTab === ETabs.ACTIVE) {
            this.#currentList = this.#list.filter((item) => !item.isCompleted)
        } else if (currentTab === ETabs.COMPLETED) {
            this.#currentList = this.#list.filter((item) => item.isCompleted)
        } else if (currentTab === ETabs.IMPORTANT) {
            this.#currentList = this.#list.filter((item) => item.isImportant)
        }
        if (searchString) {
            return this.#currentList.filter((item) => item.title.startsWith(searchString))
        }
        return this.#currentList
    }
    #saveToLocalStorage() {
        const data = {
            id: this.#id,
            list: this.#list,
        }
        localStorage.setItem('list', JSON.stringify(data))
    }
    get allTasksCount() {
        return this.#list.length
    }
    get completedTasksCount() {
        return this.#list.filter((item) => item.isCompleted).length
    }
    get activeTasksCount() {
        return this.#list.filter((item) => !item.isCompleted).length
    }
}
