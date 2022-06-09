const searchInput = document.querySelector('.search');
const albumContent = document.querySelector('.album-content');
const searchIcon = document.querySelector('.search-icon');
const resultTitle = document.querySelector('.result-title');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('#load-more');
let albums = [];
let currentItem = 5;

function load() {
    loadMore.addEventListener('click', (e) => {
        // console.log(e.target.className)
        let boxes = [...document.querySelectorAll('.album-container .album-content .album__content-item')];
        // console.log('boxes length ', boxes.length);
        for (let i = currentItem; i < currentItem + 5; i++) {
            console.log("i ", i);
            if (i >= boxes.length) {
                loadMore.style.display = 'none';
                break;
            }
            boxes[i].style.display = 'flex';
        }
        currentItem += 5;
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
        console.log('click ', e.target.className);
        fetchData(searchInput.value);
    })
}

addToDoEvent();
onClickSearch();
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
                resultTitle.innerHTML = `${data.results.length} results for "${param}"`;
                resultTitle.style.display = 'block';
                loader.style.display = 'none';
                albumContent.style.display = 'block'
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
        window.clearInterval(intervalId);
        callback.call(this);
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
}
