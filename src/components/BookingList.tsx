"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";

export default function BookingList() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    const fetchAppointments = async () => {
        if (!session || !session.user.token) {
            console.error("No session or token available");
            return;
        }

        try {
            const response = await fetch("/api/appointments", {
                headers: {
                    Authorization: `Bearer ${session.user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch appointments from API");
            }

            const data = await response.json();
            console.log("API Response:", data);
            if (data && Array.isArray(data.data)) {
                setAppointments(data.data);
            } else {
                console.error("API response is not an array");
                setAppointments([]);
            }

        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [session]);

    const handleAppointmentDeleted = () => {
        fetchAppointments(); // Re-fetch appointments after deletion
    };

    const handleUpdateAppointment = (appointment: any) => {
        router.push(`/booking?id=${appointment.company.id}&company=${appointment.company.name}&appointmentId=${appointment._id}&apptDate=${appointment.apptDate}`);
    };

    return (
        <div className="text-black py-4">
            {appointments && Array.isArray(appointments) ? (
                appointments.map((appointment) => (
                    <div key={appointment._id} className=" mx-auto bg-white shadow-md rounded-lg my-3 p-4">
                        <div className="flex flex-col">
                            <div className="text-xl font-semibold text-gray-800">{appointment.user.name}</div>
                            <div className="text-lg text-gray-600 mt-1">Company: {appointment.company.name}</div>
                            <div className="text-sm text-gray-500 mt-1">Appointment date: {appointment.apptDate}</div>

                            <div className="mt-3 flex justify-between items-center">
                            <button
                                    className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-md transition duration-200 transform hover:scale-105"
                                    onClick={() => handleUpdateAppointment(appointment)}
                                >
                                    Update
                                </button>
                                <DeleteButton id={appointment._id} onDeleteSuccess={handleAppointmentDeleted} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 py-5">No appointments found.</div>
            )}
        </div>
    );
}
