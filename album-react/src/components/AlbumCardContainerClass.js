import { Component } from "react";
import { connect } from 'react-redux';
import AlbumCard from './AlbumCard';
import { albumActions, getAlbums } from '../store/index-store';
import SearchBar from './SearchBar';
// import { fetchData } from './store/index-store';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

class AlbumCardContainerClass extends Component {

    searchHandler = (event) => {
        this.props.search(event.target.value);
    }

    enterSearch = (event) => {
        if (event.key === 'Enter') {
            this.props.resetAlbumCount();
            this.props.fetch(this.props.searchEntry);
        }
    }

    loadMore = () => {
        this.props.load();
    }

    render() {
        return (
            <div>
                <header className="search-wrapper">
                    <div className="search-bar">
                        {/* <input type="text" placeholder="Search" className="search" required 
                        onChange={this.searchHandler.bind(this)} onKeyDown={this.enterSearch.bind(this)} /> */}
                    <SearchBar search={this.searchHandler.bind(this)} enterSearch={this.enterSearch.bind(this)}/>
                    </div>
                </header>
                <Container>
                    <div className="container-header">
                        {!this.props.loading && (<p className="result-title">{this.props.searchTitle}</p>)}
                        {this.props.loading && (<div className="loader"></div>)}
                        <hr />
                    </div>
                    {!this.props.loading && (
                    // <div className="album-container">
                        <Grid container spacing={5}>
                        {/* <ul className="album-content"> */}
                            {this.props.albums.slice(0, this.props.albumCount).map((album, index) => (
                            <AlbumCard key={index} img={album.artworkUrl100} name={album.collectionName} />
                            ))}
                        {/* </ul> */}
                        </Grid>
                    // </div>
                    )}
                    {this.props.albumCount < this.props.albums.length && (<div id="load-more" onClick={this.loadMore.bind(this)}>Load More</div>)}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      searchTitle: state.searchTitle,
      searchEntry: state.searchEntry,
      albums: state.albums,
      loading: state.loading,
      albumCount: state.albumCount
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        search: (value) => dispatch(albumActions.searchHandler({searchValue: value})),
        load: () => dispatch(albumActions.loadMore()),
        fetch: (searchEntry) => dispatch(getAlbums(searchEntry)),
        resetAlbumCount: () => dispatch(albumActions.resetAlbumCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCardContainerClass);