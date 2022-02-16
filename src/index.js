// Global Variables
const url = 'http://localhost:3000/movies'
let selectedMovie

// DOM Selectors
const movieList = document.querySelector('#movie-list')
const movieInfo = document.querySelector('#movie-info')

const detailImg = document.querySelector('#detail-image')
const title = document.querySelector('#title')
const yearReleased = document.querySelector('#year-released')
const description = document.querySelector('#description')
const watchedBtn = document.querySelector('#watched')
const bloodAmount = document.querySelector('#amount')

const bloodForm = document.querySelector('#blood-form')
const bloodFormAmount = document.querySelector('#blood-Amount')


// Listeners
watched.addEventListener('click', toggleWatchedUnwatched)
bloodForm.addEventListener('submit', addBlood)


// Fetchers
function fetchAllMovies() {
    return fetch(url)
    .then (res=> res.json())
    // .then (console.log)
}

// Render Functions
function renderAllMovies(movieArr) {
    movieArr.forEach(renderOneMovie)
    // console.log(movieArr)
    renderDetail(movieArr[0])
}

function renderOneMovie(movieObj) {
    let img = document.createElement('img')
    img.src = movieObj.image
    movieList.appendChild(img)

    img.addEventListener('click', () => renderDetail(movieObj))
}

function renderDetail(movieObj) {
    selectedMovie = movieObj

    detailImg.src = movieObj.image
    title.innerText = movieObj.title
    yearReleased.innerText = movieObj['release_year']
    description.innerText = movieObj.description
    bloodAmount.innerText = movieObj['blood_amount']
    // watchedBtn.innerText = movieObj.watched

    if (movieObj.watched === true) {
        watchedBtn.innerText = 'Watched'
    } else {
        watchedBtn.innerText = 'Unwatched'
    }
}

// Event Handlers
function toggleWatchedUnwatched() {
    selectedMovie.watched = !selectedMovie.watched

    if (watched.innerText === 'Watched') {
        watched.innerText = 'Unwatched'
    } else {
        watched.innerText = 'Watched'
    }
}

function addBlood(e) {
    e.preventDefault()

    let blood = parseInt(bloodAmount.textContent)
    let newBlood = parseInt(bloodFormAmount.value) || 0

    bloodAmount.innerText = blood + newBlood

    selectedMovie['blood_Amount'] = selectedMovie['blood_amount'] += newBlood

    e.target.reset()
}

// Initializer
fetchAllMovies().then(renderAllMovies)