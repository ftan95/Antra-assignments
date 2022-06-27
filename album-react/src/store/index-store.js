import { configureStore, createAsyncThunk, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger';

let initialAlbums = 30;

const initialState = {
    searchTitle: "Search Albums by ArtistName: ",
    searchEntry: "",
    albums: [],
    loading: false,
    albumCount: initialAlbums
};

export const getAlbums = createAsyncThunk('albums/getAlbums', async (searchEntry) => {
    if (searchEntry.length > 0) {
        const res = await fetch(`https://itunes.apple.com/search?term=${searchEntry}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(response => response.json())
        
        return res;
    }
    else {
        alert("please fill out the field");
    }
})

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
        resetAlbumCount(state) {
            state.albumCount = initialAlbums;
        }
    },
    extraReducers: {
        [getAlbums.pending]: (state) => {
            state.loading = true
        },
        [getAlbums.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log(payload);
            if (payload.resultCount < state.albumCount) {
                state.searchTitle = `${payload.resultCount} results for "${state.searchEntry}"`;
            }
            else {
                state.searchTitle = `${initialAlbums} results for "${state.searchEntry}"`;
            }
            state.albums = payload.results;
        },
        [getAlbums.rejected]: (state) => {
            state.loading = false
        },
    }
});

export const albumActions = albumSlice.actions;

const store = configureStore({
    reducer: albumSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;


// Action Thunk
// export const fetchData = (searchEntry, albumCount) => {
//     return async (dispatch) => {
//         if (searchEntry.length > 0) {
//             dispatch(albumActions.startLoad());

//             const sendRequest = async () => {
//                 await fetch(`https://itunes.apple.com/search?term=${searchEntry}&media=music&entity=album&attribute=artistTerm&limit=200`)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data.results);
//                     if (data.results.length < albumCount) {
//                         dispatch(albumActions.updateTitle({title: `${data.results.length} results for "${searchEntry}"`}));
//                     }
//                     else {
//                         dispatch(albumActions.updateTitle({title: `${initialAlbums} results for "${searchEntry}"`}));
//                     }
//                     dispatch(albumActions.updateAlbums({ albums: data.results }));
//                 });
//             }

//             try {
//                 await sendRequest();
//                 dispatch(albumActions.endLoad());
//             }
//             catch (error) {
//                 alert(error);
//             }
//         }
//         else {
//             alert("please fill out the field");
//         }
//     };
// }

