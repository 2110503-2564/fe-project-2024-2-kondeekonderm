"use client"
import DateReserve from "@/components/DateReserve";
import { TextField, Button, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import { SelectChangeEvent } from "@mui/material/Select";
import Company from "@/db/models/Company"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default function Booking () {

    



    const dispatch = useDispatch<AppDispatch>()

    const [nameLastname, setNameLastname] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [venue, setVenue] = useState("");
    const [bookedDate, setSelectedDate] = useState<Dayjs|null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameLastname(event.target.value);
    }

    const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value);
    }

    const handleVenueChange = (event: SelectChangeEvent<string>) => {
        setVenue(event.target.value);
    }

    const handleDateChange = (date: Dayjs|null) => {
        setSelectedDate(date);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!(nameLastname && contactNumber && venue && bookedDate)) {
          alert("Please fill in complete information.");
          return;
        }
    
        const newBooking: BookingItem = {
          nameLastname: nameLastname,
          tel: contactNumber,
          venue: venue,
          bookDate: dayjs(bookedDate).format("YYYY/MM/DD"),
        };
    
        dispatch(addBooking(newBooking));
    
        setNameLastname("");
        setContactNumber("");
        setVenue("");
        setSelectedDate(null);
    }

    return (
        <main className="w-full flex flex-col items-center space-y-6 py-10">
            <div className="text-2xl font-bold text-stone-950">Companies Booking</div>
            
            <div className="space-y-6 p-6 flex flex-col max-w-md mx-auto shadow-lg rounded-lg">
                <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" 
                value={nameLastname} onChange={handleNameChange}/>
                <TextField variant="standard" name="Contact-Number" label="Contact-Number"
                value={contactNumber} onChange={handleContactChange}/>
                <Select variant="standard" id="venue" value={venue} onChange={handleVenueChange}>
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>

                <DateReserve onDateChange={handleDateChange}/>
                
                <Button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 
                px-3 py-2 shadow-sm text-white"
                onClick={handleSubmit}>
                    Book Venue
                </Button>

            </div>
            
        </main>
    );
}