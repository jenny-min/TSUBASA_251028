function renderPagination(event) {
    let paginationHTML = `
        <button><i class="fa-solid fa-arrow-left"></i></button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>...</button>
        <button>20</button>
        <button><i class="fa-solid fa-arrow-right"></i></button>
`;
    return paginationHTML;
}