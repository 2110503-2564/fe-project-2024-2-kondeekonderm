import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CompanyItem } from "../../../interface"

type BookState = {
    bookItems: CompanyItem[]
}

const initialState:BookState = { bookItems: []}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<CompanyItem>)=>{
            const existingBookingIndex = state.bookItems.findIndex(
                (obj) =>
                    obj.name === action.payload.name
            );

            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action:PayloadAction<CompanyItem>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.province !== action.payload.province)
                || (obj.tel !== action.payload.tel)
                || (obj.name !== action.payload.name)
                || (obj.address !== action.payload.address));
            })
            state.bookItems = remainItems
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer