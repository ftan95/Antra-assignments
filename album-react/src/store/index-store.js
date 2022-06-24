import { configureStore, createSlice } from "@reduxjs/toolkit";

let initialAlbums = 30;

const initialState = {
    searchTitle: "Search Albums by ArtistName: ",
    searchEntry: "",
    albums: [],
    loading: false,
    albumCount: initialAlbums
};

const albumSlice = createSlice({
    name: 'albums',
    initialState: initialState,
    reducers: {
        searchHandler(state, action) {
            // console.log(action.payload);
            state.searchEntry = action.payload.searchValue
        },
        loadMore(state) {
            let temp = state.albumCount;
            temp += 50;
            if (temp > state.albums.length) {
                temp = state.albums.length;
            }
            state.albumCount = temp;
            state.searchTitle = `${state.albumCount} results for "${state.searchEntry}"`;
        },
        startLoad(state) {
            state.loading = true;
        },
        endLoad(state) {
            state.loading = false;
        },
        updateTitle(state, action) {
            state.searchTitle = action.payload.title;
        },
        updateAlbums(state, action) {
            state.albums = action.payload.albums;
        },
        resetAlbumCount(state) {
            state.albumCount = initialAlbums;
        }
    }
});

const store = configureStore({
    reducer: albumSlice.reducer
});

export const albumActions = albumSlice.actions;

// Action Thunk
export const fetchData = (searchEntry, albumCount) => {
    return async (dispatch) => {
        if (searchEntry.length > 0) {
            dispatch(albumActions.startLoad());

            const sendRequest = async () => {
                await fetch(`https://itunes.apple.com/search?term=${searchEntry}&media=music&entity=album&attribute=artistTerm&limit=200`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.results);
                    if (data.results.length < albumCount) {
                        dispatch(albumActions.updateTitle({title: `${data.results.length} results for "${searchEntry}"`}));
                    }
                    else {
                        dispatch(albumActions.updateTitle({title: `${initialAlbums} results for "${searchEntry}"`}));
                    }
                    dispatch(albumActions.updateAlbums({ albums: data.results }));
                });
            }

            try {
                await sendRequest();
                dispatch(albumActions.endLoad());
            }
            catch (error) {
                alert(error);
            }
        }
        else {
            alert("please fill out the field");
        }
    };
}

export default store;

