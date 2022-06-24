import React, {Component} from 'react';
import { connect } from 'react-redux';
import './App.css';
import AlbumCard from './components/AlbumCard';
import { albumActions } from './store/index-store';
import { fetchData } from './store/index-store';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

let timer;
let timeInterval = 3000;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

class App extends Component {

  searchHandler = (event) => {
    this.props.search(event.target.value);
  }

  enterSearch = (event) => {
    if (event.key === 'Enter') {
      this.props.resetAlbumCount();
      this.props.fetch(this.props.searchEntry, this.props.albumCount);
    }
  }

  loadMore = () => {
    this.props.load();
  }
  
  render() {
    return (
      <div className="App">
        <header className="search-wrapper">
            <div className="search-bar">
                {/* <input type="text" placeholder="Search" className="search" required 
                  onChange={this.searchHandler.bind(this)} onKeyDown={this.enterSearch.bind(this)} /> */}
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={this.searchHandler.bind(this)} onKeyDown={this.enterSearch.bind(this)}
                    />
                  </Search>
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
    );
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
    fetch: (searchEntry, albumCount) => dispatch(fetchData(searchEntry, albumCount)),
    resetAlbumCount: () => dispatch(albumActions.resetAlbumCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
