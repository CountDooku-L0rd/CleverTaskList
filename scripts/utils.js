export const ETabs = Object.freeze({
    ALL_TASKS: 'ALL_TASKS',
    COMPLETED: 'COMPLETED',
    ACTIVE: 'ACTIVE',
    IMPORTANT: 'IMPORTANT',
})

export function getCurrentTab(currentTab) {
    return {
        ['Все задачи']: ETabs.ALL_TASKS,
        ['Выполненные']: ETabs.COMPLETED,
        ['Активные']: ETabs.ACTIVE,
        ['Важные']: ETabs.IMPORTANT,
    }[currentTab]
}
