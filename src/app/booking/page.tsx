"use client";

import DateReserve from "@/components/DateReserve";
import { Button } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import addApointment from "@/libs/addAppointment";
import updateApointment from "@/libs/updateAppointment";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function Booking() {
    const router = useRouter();
    const urlParams = useSearchParams();
    const appointmentId = urlParams.get("appointmentId");
    const companyId = urlParams.get("id");
    const companyName = urlParams.get("company");

    const [apptDate, setApptDate] = useState<Dayjs | null>(null);

    const handleDateChange = (date: Dayjs | null) => {
        setApptDate(date);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        appointmentId ? handleUpdateAppointment() : handleAddAppointment();
    };

    const handleAddAppointment = async () => {
        if (!apptDate) return alert("Please select an appointment date.");
        if (!companyId) return alert("Please choose a company first.");

        const userApptDate = dayjs(apptDate).add(7, "hour").toDate();
        const startDate = new Date("2022-05-10T00:00:00.000Z");
        const endDate = new Date("2022-05-13T23:59:59.999Z");

        if (userApptDate < startDate || userApptDate > endDate) {
            alert(`Appointment must be between May 10th and May 13th, 2022`);
            return;
        }

        try {
            const result = await addApointment(userApptDate, companyId);
            alert(result?.message || "Appointment added successfully");
        } catch (error: any) {
            alert(error.message || "An unexpected error occurred.");
        }
    };

    const handleUpdateAppointment = async () => {
        if (!apptDate) return alert("Please select an appointment date.");
        if (!appointmentId) return alert("Error: appointment ID is missing.");

        const userApptDate = dayjs(apptDate).add(7, "hour").toDate();
        const startDate = new Date("2022-05-10T00:00:00.000Z");
        const endDate = new Date("2022-05-13T23:59:59.999Z");

        if (userApptDate < startDate || userApptDate > endDate) {
            alert(`Appointment must be between May 10th and May 13th, 2022`);
            return;
        }

        try {
            const result = await updateApointment(userApptDate, appointmentId);
            alert(result?.message || "Appointment updated successfully");
            router.push("/mybooking");
        } catch (error: any) {
            alert(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-6">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent mt-12">
                {appointmentId ? "Update Your Appointment" : "Book an Appointment"}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">{companyName ? `With ${companyName}` : "Select a Company"}</p>

            {/* Appointment Card */}
            <div className="bg-white shadow-2xl rounded-2xl mt-6 p-8 max-w-lg w-full text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Appointment Date</h2>
                <DateReserve onDateChange={handleDateChange} />

                {/* Submit Button */}
                <Button
                    className="mt-6 w-full rounded-lg bg-blue-600 text-white py-3 px-8 shadow-lg text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    onClick={handleSubmit}
                >
                    {appointmentId ? "Update Appointment" : "Confirm Booking"}
                </Button>
            </div>
        </main>
    );
}
