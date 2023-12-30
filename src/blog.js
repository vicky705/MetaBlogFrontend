import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    blogs : null
}

const blogs =  createSlice({
    name : 'blog list',
    initialState,
    reducers : {
        addToBlog : (state, action) => {
            state.blogs = action.payload;
        }
    }
})

export const {addToBlog} = blogs.actions;
export default blogs.reducer; 
