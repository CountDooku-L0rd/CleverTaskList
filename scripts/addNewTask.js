export const addNewTask = function (taskList, Render) {
    const addNewTaskButton = document.getElementById('add-new-task-button')
    const addNewTaskInput = document.getElementById('add-new-task-input')
    addNewTaskButton.addEventListener('click', () => {
        if (addNewTaskInput.value) {
            taskList.addTask(addNewTaskInput.value)
            addNewTaskInput.value = ''
            Render.updateAndRender()
        } else {
            alert('Вы не ввели текст задачи')
        }
    })
}
