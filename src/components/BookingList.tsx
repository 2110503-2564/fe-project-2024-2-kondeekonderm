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
    }

    const handleUpdateAppointment = (appointment: any) => {
        router.push(`/booking?id=${appointment.company.id}&company=${appointment.company.name}&appointmentId=${appointment._id}&apptDate=${appointment.apptDate}`);
    };

    return (
        <div className="text-black py-2">
            {appointments && Array.isArray(appointments) ? (
                appointments.map((appointment) => (
                    <div key={appointment._id} className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                        <div className="text-xl">{appointment.user.name}</div>
                        <div>Company: {appointment.company.name}</div>
                        <div>Appointment date: {appointment.apptDate}</div>
                        <DeleteButton id={appointment._id} onDeleteSuccess={handleAppointmentDeleted} />
                        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                        text-white shadow-sm" onClick={() => handleUpdateAppointment(appointment)}>Update</button>
                    </div>
                ))
            ) : (
                <div className="text-black py-2">"No Appointment"</div>
            )}
        </div>
    );
}
