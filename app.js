const searchInput = document.querySelector('.search__pokemon input');

//Animation input

searchInput.addEventListener('input', function(e) {
    if(e.target.value !== "") {
        e.target.parentNode.classList.add('input__active');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('input__active');
    }
})