import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from './AlbumCard';
import SearchBar from './SearchBar';
import { albumActions, getAlbums } from '../store/index-store';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const AlbumCardContainerFn = () => {
    const loading = useSelector(state => state.loading);
    const searchTitle = useSelector(state => state.searchTitle);
    const albums = useSelector(state => state.albums);
    const albumCount = useSelector(state => state.albumCount);
    const searchEntry = useSelector(state => state.searchEntry);
    const dispatch = useDispatch();

    const searchHandler = (event) => {
        dispatch(albumActions.searchHandler({searchValue: event.target.value}));
    }

    const enterSearch = (event) => {
        if (event.key === 'Enter') {
            dispatch(albumActions.resetAlbumCount());
            dispatch(getAlbums(searchEntry));
        }
    }

    const loadMore = () => {
        dispatch(albumActions.loadMore())
    }

    return (
        <div>
            <header className="search-wrapper">
                <div className="search-bar">
                <SearchBar search={searchHandler} enterSearch={enterSearch}/>
                </div>
            </header>
            <Container>
                <div className="container-header">
                    {!loading && (<p className="result-title">{searchTitle}</p>)}
                    {loading && (<div className="loader"></div>)}
                    <hr />
                </div>
                {!loading && (
                    <Grid container spacing={5}>
                        {albums.slice(0, albumCount).map((album, index) => (
                        <AlbumCard key={index} img={album.artworkUrl100} name={album.collectionName} />
                        ))}
                    </Grid>
                // </div>
                )}
                {albumCount < albums.length && (<div id="load-more" onClick={loadMore}>Load More</div>)}
            </Container>
        </div>
    )
}

export default AlbumCardContainerFn;