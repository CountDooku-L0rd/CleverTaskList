import { TaskList } from './TaskList.js'
import { UIRender } from './UIRender.js'
import { addNewTask } from './addNewTask.js'
import { searchInput } from './searchInput.js'
import { filterButtons } from './filterButtons.js'

const taskList = new TaskList()
const Render = new UIRender(taskList)
Render.updateAndRender()
addNewTask(taskList, Render)
searchInput(Render)
filterButtons(Render)
