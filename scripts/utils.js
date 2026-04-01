export function getCurrentTab(currentTab) {
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
