import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Album, AlbumsState } from '../../common/interfaces';

export const fetchAlbums = createAsyncThunk(
  'albums',
  async (): Promise<Album[]> => {
    const response = await fetch('/gphotos-gallery/data/album.json');
    const data = await response.json() as any as Album[];
    data.sort((a, b) => a.title.localeCompare(b.title));
    return data;
  },
);

const initialState = {
  albums: [],
  error: null,
  status: 'idle',
} as AlbumsState;


export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAlbums.pending, (state: AlbumsState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state: AlbumsState, action: any) => {
        state.status = 'succeeded';
        state.error = null;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state: AlbumsState, action: any) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
