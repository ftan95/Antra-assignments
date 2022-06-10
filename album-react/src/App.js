import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "Search Albums by ArtistName: ",
      searchEntry: "",
      albums: [],
      loading: false
    };
  }

  searchHandler = (event) => {
    this.setState({searchEntry: event.target.value});
    // console.log(this.searchEntry);
  }

  fetchData = (event) => {
    if (event.key === 'Enter') {
      if (this.state.searchEntry.length > 0) {
        this.setState({loading: true});
        fetch(`https://itunes.apple.com/search?term=${this.state.searchEntry}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            this.setState({albums: data.results});
            this.setState({searchTitle: `${data.results.length} results for "${this.state.searchEntry}"`})
            this.setState({loading: false});
        });
      }
      else {
          alert("please fill out the field");
      }
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="search-wrapper">
            <div className="search-bar">
                <input type="text" placeholder="Search" className="search" required 
                  onChange={this.searchHandler} onKeyDown={this.fetchData}/>
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
            {this.state.albums.map((album, index) => (
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
        <div id="load-more">Load More</div>
        {/* TODO: Load More function */}
      </div>
    );
  }
}

export default App;
