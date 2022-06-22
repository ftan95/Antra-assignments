const searchInput = document.querySelector('.search');
const albumContent = document.querySelector('.album-content');
const searchIcon = document.querySelector('.search-icon');
const resultTitle = document.querySelector('.result-title');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('#load-more');
let albums = [];
let initialResults = 30;
let results = initialResults;
let timer;
let timeInterval = 3000;

function autoSearch() {
    searchInput.addEventListener('keyup', () => {
        clearTimeout(timer); // each time a key is released, reset the timer, indicate user is still typing
        if (searchInput.value) {
            timer = setTimeout(fetchData, timeInterval, searchInput.value); // only fetch after 3 seconds of nothing
        }
    })
}

function addToDoEvent() {
    searchInput.addEventListener('keypress', (e) => {
        // console.log(e.target.value);
        if (e.code === "Enter") {
            fetchData(searchInput.value);
        }
    });
}

function onClickSearch() {
    searchIcon.addEventListener('click', (e) => {
        // console.log('click ', e.target.className);
        fetchData(searchInput.value);
    })
}

function load() {
    loadMore.addEventListener('click', (e) => {
        // return a list of all elements that match the following selectors in order to turn on the display for the next elements
        let boxes = [...document.querySelectorAll('.album-container .album-content .album__content-item')];
        // console.log(boxes);
        for (let i = results; i < results + 50; i++ ) {
            if (i >= boxes.length) {
                loadMore.style.display = 'none';
                break;
            }
            boxes[i].style.display = 'flex';
        }
        results += 50;

        if (results > boxes.length) {
            resultTitle.innerHTML = `${boxes.length} results for "${searchInput.value}"`;
            results = initialResults;
        }
        else {
            resultTitle.innerHTML = `${results} results for "${searchInput.value}"`;
        }
        
    })
}

autoSearch();
// addToDoEvent();
// onClickSearch();
load();

function fetchData(param) {
    if (param.length > 0) {
        resultTitle.style.display = 'none';
        loader.style.display = 'block';
        fetch(`https://itunes.apple.com/search?term=${param}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.results);
            albums = data.results;
            onReady(function() {
                renderAlbums(albums);
                if (data.results.length < results) {
                    resultTitle.innerHTML = `${data.results.length} results for "${param}"`;
                }
                else {
                    resultTitle.innerHTML = `${results} results for "${param}"`;
                    loadMore.style.display = 'block';
                }
                resultTitle.style.display = 'block';
                loader.style.display = 'none';
                albumContent.style.display = 'block';
            })
        });
    }
    else {
        alert("please fill out the field");
    }
    
}

function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (albumContent !== undefined) {
        window.clearInterval(intervalId);   // once the album list is defined, stop the interval
        callback.call(this); // call the function passed to onReady on the window
      }
    }, 1000);
  }

function renderAlbums(albums) {
    console.log(albums);
    const albumTmp = generateAlbums(albums);
    render(albumTmp, albumContent);
}

function generateAlbums(albums) {
    let res = albums.map((album) => {
        return generateAlbumTmp(album);
      })
      .join('');
    return res;
}

function generateAlbumTmp(album) {
    return `<li class="album__content-item">
                <div class="album_cover">
                    <img src=${album.artworkUrl100} alt="cover name" />
                </div>
                <p class="album__title">
                  ${album.collectionName}
                </p>
              </li>`;
}

function render(template, element) {
    element.innerHTML = template;
    let boxes = [...document.querySelectorAll('.album-container .album-content .album__content-item')];
    // display the first n results
    for (let i = 0; i < results; i++ ) {
        if (i >= boxes.length) {
            break;
        }
        boxes[i].style.display = 'flex';
    }
}
