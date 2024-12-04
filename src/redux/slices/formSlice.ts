import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
    name: string;
    family: string;
    birthday: string;
    options: string[];
}

const initialState: { data: FormData[] } = {
    data: [],
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addFormData: (state, action: PayloadAction<FormData>) => {
            state.data.push(action.payload);
        },
        deleteFormData: (state, action: PayloadAction<number>) => {
            state.data.splice(action.payload, 1);
        },
        updateFormData: (
            state,
            action: PayloadAction<{ index: number; formData: FormData }>
        ) => {
            state.data[action.payload.index] = action.payload.formData;
        },
    },
});

export const { addFormData, deleteFormData, updateFormData } = formSlice.actions;
export default formSlice.reducer;
