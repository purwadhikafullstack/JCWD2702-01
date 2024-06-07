import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display_name: '',
    image_url: ""
}

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        setTenant: (prevState = initialState, action) => {
            prevState.display_name = action.payload.display_name;
            prevState.image_url = action.payload.image_url
        },
    },
});

export const { setTenant } = tenantSlice.actions;

export default tenantSlice.reducer;