export const filterButtons = function (Render) {
    const filterButtons = document.querySelectorAll('.filter-buttons__button')
    filterButtons.forEach((filterButton) => {
        filterButton.addEventListener('click', (event) => {
            filterButtons.forEach((button) => {
                button.classList.remove('filter-buttons__button-active')
            })
            event.target.classList.add('filter-buttons__button-active')
            Render.updateAndRender()
        })
    })
}
