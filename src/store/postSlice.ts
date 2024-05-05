import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//  defining types
interface Post {
    [key: string]: any; // This is a placeholder. Define a more specific type if possible.
  }

interface PostsState {
    reduxposts: Post[];
  }

  const initialState: PostsState = {
    reduxposts: [],
  };

   const postSlice = createSlice({
    name: 'reduxposts',
    initialState,
    reducers: {
      setreduxPosts: (state, action: PayloadAction<Post[]>) => {
        state.reduxposts = action.payload;
      },
    },
  });

  export const {setreduxPosts}=postSlice.actions;
  export default postSlice.reducer