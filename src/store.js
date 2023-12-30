import {configureStore} from '@reduxjs/toolkit'
import blog from './blog.js';

export const store =  configureStore({
    reducer : blog
})
