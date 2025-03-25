"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">📅 My Bookings</h1>

            {appointments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">{appointment.company.name}</h2>
                            <p className="text-gray-600 text-sm mt-1">📍 {appointment.company.address}</p>
                            <p className="text-gray-700 mt-2 font-medium">
                                📆 {dayjs(appointment.apptDate).utc().format("MMMM D, YYYY [at] h:mm A")}
                            </p>
                            
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="rounded-lg bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-white font-medium transition-all"
                                    onClick={() => handleUpdateAppointment(appointment)}
                                >
                                    ✏️ Update
                                </button>
                                <DeleteButton id={appointment._id} onDeleteSuccess={handleAppointmentDeleted} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-700 text-lg py-6">😕 No appointments found.</div>
            )}
        </div>
    );
}
