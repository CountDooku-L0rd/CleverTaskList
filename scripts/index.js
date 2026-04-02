import { TaskList } from './TaskList.js'
import { UIRenderer } from './UIRenderer.js'

const taskList = new TaskList()
const renderer = new UIRenderer(taskList)
renderer.render()
