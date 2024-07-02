import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";
import tenantSlice from "./slice/tenantSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        tenant: tenantSlice
    }
})