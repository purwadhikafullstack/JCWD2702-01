import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: '',
    rolesId: '',
    display_name: '',
    image_url: ""
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (prevState, action) => {
            prevState.uid = action.payload.uid;
            prevState.rolesId = action.payload.rolesId;
            prevState.display_name = action.payload.display_name;
            prevState.image_url = action.payload.image_url
        },

    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;