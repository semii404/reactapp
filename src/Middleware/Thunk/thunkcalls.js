import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/SDK';



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const posts =await getDocs(collection(db,'posts'))
    const values =posts.docs.map((key)=> {
      const data = Object.assign(key.data(), {id:key.id});
      return data;
    });
    return values
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






