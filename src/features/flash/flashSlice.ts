import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FlashState {
  message:string
  className:string
}

const initialState:  FlashState = {
  message: '', 
  className: ''
}

export const addFlash = createAsyncThunk(
  'flash/flashStatus',
  (flashMessage: FlashState) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }
);

export const flashSlice = createSlice({
  name: 'flash',
  initialState,
  reducers: {
    addFlash: (state, action: PayloadAction<FlashState>) => {
      state.message = action.payload.message
      state.className = action.payload.className
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFlash.pending, (state, action) => {
        state.message = action.meta.arg.message
        state.className = action.meta.arg.className
      })
      .addCase(addFlash.fulfilled, (state) => {
        state.message = ''
        state.className = ''
      })
  },
})

export default flashSlice.reducer