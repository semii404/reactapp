import { createAsyncThunk } from '@reduxjs/toolkit';
import { api1 } from '../../API/axios';



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await api1.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logIN = createAsyncThunk('loginstatus/logIN', async (data) => {
  try {
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const datastatus = createAsyncThunk('datastatus/datastatus', async (data) => {
  try {
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});






