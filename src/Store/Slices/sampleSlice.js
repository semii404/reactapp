import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, logIN} from '../../Middleware/Thunk/thunkcalls';


export const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: (state) => state + 1,
      decrement: (state) => state===0 ? state : state - 1
    }
  });


  
export const postsSlice = createSlice({
    name: 'postsList',
    initialState: {
      posts: [ ],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
         //temprary code cause antd have bug in component 
          for (let index = 0; index < action.payload.length; index++) {
            action.payload[index]['key']=action.payload[index].id
          }
          state.posts = action.payload;
          state.error = 0;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  


  export const loginSlice = createSlice({
    name: 'loginstatus',
    initialState: {
      isLoggedIn: false,
      email:null,
      id:null,
      username:null,
      DOB:null,
      dobC:null,
      status: 'idle',
      error: 0,
    },
    reducers: {
      logOut: (state)=>{ state.isLoggedIn=false; localStorage.removeItem('auth') },
      closedob:(state)=>{ 
        state.dobC=true;   
          const val = JSON.parse(localStorage.getItem('auth'))
          val.dobC=true;
          localStorage.setItem('auth', JSON.stringify(val));  
        },
      nextyear:(state)=>{
        state.dobC=false;
        const val = JSON.parse(localStorage.getItem('auth'))
          val.dobC=false;
          localStorage.setItem('auth', JSON.stringify(val));  
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(logIN.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(logIN.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.isLoggedIn = true;
          state.id=action.payload.id
          state.username = action.payload.username;
          state.DOB =action.payload.DOB;
          state.dobC=action.payload.dobC;
          state.email=action.payload.email;
          localStorage.setItem('auth', JSON.stringify(state))
          state.error = 0;
        })
        .addCase(logIN.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });