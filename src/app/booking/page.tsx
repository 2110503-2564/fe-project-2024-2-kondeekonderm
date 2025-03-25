"use client"

import DateReserve from "@/components/DateReserve";
import { TextField, Button, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import addApointment from "@/libs/addAppointment";
import updateApointment from "@/libs/updateAppointment";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function Booking () {
    const router = useRouter();
    const urlParams = useSearchParams();
    const appointmentId = urlParams.get('appointmentId');

    const companyId = urlParams.get('id');
    const companyName = urlParams.get('company');

    const [apptDate, setApptDate] = useState<Dayjs|null>(null);

    const handleDateChange = (date: Dayjs|null) => {
        setApptDate(date);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (appointmentId) {
            handleUpdateAppointment();
        } else {
            handleAddAppointment();
        }
    };

    const handleAddAppointment = async () => {
        if (!apptDate) {
            alert("Please fill in complete information.");
            return;
        }

        const userApptDate = dayjs(apptDate).add(7, 'hour').toDate();
        const startDate = new Date("2022-05-10T00:00:00.000Z");
        const endDate = new Date("2022-05-13T23:59:59.999Z");

        if (userApptDate.getTime() < startDate.getTime() || userApptDate.getTime() > endDate.getTime()) {
            alert(`appointment date must be between May 10th and May 13th 2022`);
            return;
        }

        if (!companyId) {
            alert("Please choose company first");
            return;
        }

        try {
            const result = await addApointment(userApptDate, companyId);
            if (result && result.message) {
                alert(result.message);
            } else if ("error" in result && result.error) {
                alert(result.error);
            } else {
                alert("Appointment added successfully");
            }
        } catch (error: any) {
            console.error("Error adding appointment:", error);
            alert(error.message || "An unexpected error occurred.");
        }
    };

    const handleUpdateAppointment = async () => {
        if (!apptDate) {
            alert("Please fill in complete information.");
            return;
        }

        if (!appointmentId) {
            alert("Error on appointmentId");
            return;
        }
        console.log(apptDate)
        const userApptDate = dayjs(apptDate).add(7, 'hour').toDate();
        const startDate = new Date("2022-05-10T00:00:00.000Z");
        const endDate = new Date("2022-05-13T23:59:59.999Z");
        console.log(userApptDate)
        if (userApptDate.getTime() < startDate.getTime() || userApptDate.getTime() > endDate.getTime()) {
            alert(`appointment date must be between May 10th and May 13th 2022`);
            return;
        }
        try {
            const result = await updateApointment(userApptDate, appointmentId);
            if (result && result.message) {
                alert(result.message);
            } else if ("error" in result && result.error) {
                alert(result.error);
            } else {
                alert("Appointment updated successfully");
                router.push('/mybooking');
            }
        } catch (error: any) {
            console.error("Error updating appointment:", error);
            alert(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <main className="w-full flex flex-col items-center space-y-6 py-10">
            <div className="text-2xl font-bold text-stone-950">Appointment {companyName}</div>
            
            <div className="space-y-6 p-6 flex flex-col max-w-md mx-auto shadow-lg rounded-lg text-black">
                Appoint Date
                <DateReserve onDateChange={handleDateChange}/>
                
                <Button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 
                px-3 py-2 shadow-sm text-white"
                onClick={handleSubmit}>
                    {appointmentId ? "Update Appointment" : "Submit"}
                </Button>

            </div>
            
        </main>
    );
}
