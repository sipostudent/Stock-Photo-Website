const auth = "563492ad6f91700001000001f5dbd18e3c13456c8dcc3901e7aff665";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

// Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
});


function updateInput(e) {
    searchValue = e.target.value;
}

async function curatedPhotos() {
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        console.log(photo)
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        <p>${photo.photographer_url}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function searchPhotos(query) {
    const dataFetch = await fetch(
        `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page1`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        console.log(photo)
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        <p>${photo.photographer_url}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();