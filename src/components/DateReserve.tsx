"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve ({onDateChange} 
    : {onDateChange:Function}) {

    const [selectDate, setSelectedDate] = useState<Dayjs|null>(null);

    return (
        <div className="space-y-6 p-6 flex flex-col max-w-md mx-auto">        
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                value={selectDate}
                onChange={(value)=>{setSelectedDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}