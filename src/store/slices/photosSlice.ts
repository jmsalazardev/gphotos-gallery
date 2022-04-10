import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Photo, PhotosState } from '../../common/interfaces';

export const fetchPhotosByAlbumId = createAsyncThunk(
  'photos/fetchByAlbumId',
  async (albumId: string): Promise<Photo[]> => {
    const response = await fetch('/data/photo.json');
    const data = await response.json() as any as Photo[];
    return data.filter((item) => item.albumId === albumId).sort((a, b) => a.name.localeCompare(b.name));
  },
);

const initialState = {
  photos: [],
  error: null,
  status: 'idle',
} as PhotosState;

export const photosSlice = createSlice({
  name: 'fetchPhotosByAlbumId',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchPhotosByAlbumId.pending, (state: PhotosState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPhotosByAlbumId.fulfilled, (state: any, action: any) => {
        state.status = 'succeeded';
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(fetchPhotosByAlbumId.rejected, (state: any, action: any) => {
        state.state = 'failed';
        state.error = action.error.message;
      });
  },
});
