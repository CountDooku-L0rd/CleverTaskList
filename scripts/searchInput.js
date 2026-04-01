export const searchInput = function (Render) {
    const searchInput = document.querySelector('.task-search__input')
    searchInput.addEventListener('input', () => {
        Render.updateAndRender()
    })
}
