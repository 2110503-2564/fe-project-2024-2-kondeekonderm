"use client"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { removeBooking } from "@/redux/features/bookSlice"
import { useDispatch } from "react-redux"

export default function BookingList () {
    const venueItems = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="text-black py-2">
        {
            venueItems.length == 0? 'No Venue Booking': venueItems.map((bookingItem)=> (
            <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
            <div className="text-xl">{bookingItem.nameLastname}</div>
            <div className="text-sm">tel: {bookingItem.tel}</div>
            <div className="text-sm">vanue: {bookingItem.venue}</div>
            <div className="text-sm">date: {bookingItem.bookDate}</div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
            text-white shadow-sm" onClick={()=>dispatch(removeBooking(bookingItem) ) }>
                Remove from booking
            </button>
            </div>
            ))
            
        }
        </div>
    )
}