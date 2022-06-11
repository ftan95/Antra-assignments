import React, {Component} from 'react';
import './App.css';

let timer;
let timeInterval = 3000;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "Search Albums by ArtistName: ",
      searchEntry: "",
      albums: [],
      loading: false,
      albumCount: 30
    };
  }

  searchHandler = (event) => {
    this.setState({searchEntry: event.target.value});
    console.log(this.state.searchEntry);
    // clearTimeout(timer);
    // if (this.state.searchEntry) {
    //   timer = setTimeout(this.fetchData, timeInterval);
    // }
  }

  enterSearch = (event) => {
    if (event.key === 'Enter') {
      this.fetchData();
    }
  }

  fetchData() {
    console.log(this.state.searchEntry);
    if (this.state.searchEntry.length > 0) {
      this.setState({loading: true});
      fetch(`https://itunes.apple.com/search?term=${this.state.searchEntry}&media=music&entity=album&attribute=artistTerm&limit=200`)
      .then(response => response.json())
      .then(data => {
          console.log(data.results);
          if (data.results.length < this.state.albumCount) {
            this.setState({searchTitle: `${data.results.length} results for "${this.state.searchEntry}"`})
          }
          else {
            this.setState({searchTitle: `${this.state.albumCount} results for "${this.state.searchEntry}"`});
          }
          this.setState({albums: data.results});
          this.setState({loading: false});
      });
    }
    else {
        alert("please fill out the field");
    }
  }

  loadMore = () => {
    let temp = this.state.albumCount;
    temp += 50;
    if (temp > this.state.albums.length) {
      temp = this.state.albums.length;
    }
    this.setState({
      albumCount: temp,
      searchTitle: `${temp} results for "${this.state.searchEntry}"`
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="search-wrapper">
            <div className="search-bar">
                <input type="text" placeholder="Search" className="search" required 
                  onChange={this.searchHandler} onKeyDown={this.enterSearch} />
                {/* <i className="fa fa-search search-icon"></i> */}
            </div>
        </header>
        <div className="container-header">
            {!this.state.loading && (<p className="result-title">{this.state.searchTitle}</p>)}
            {this.state.loading && (<div className="loader"></div>)}
            <hr />
        </div>
        {!this.state.loading && (<div className="album-container">
          <ul className="album-content">
            {this.state.albums.slice(0, this.state.albumCount).map((album, index) => (
              <li className="album__content-item" key={index}>
                <div className="album_cover">
                    <img src={album.artworkUrl100} alt="cover name" />
                </div>
                <p className="album__title">
                  {album.collectionName}
                </p>
              </li>
            ))}
          </ul>
        </div>)}
        {this.state.albumCount < this.state.albums.length && (<div id="load-more" onClick={this.loadMore}>Load More</div>)}
      </div>
    );
  }
}

export default App;
