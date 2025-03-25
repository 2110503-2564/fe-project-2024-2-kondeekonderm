"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "./getUserProfile";

export interface AppointmentResult {
    success?: boolean;
    message?: string;
    data?: any;
    error?: string;
}

export default async function updateApointment(apptDate: Date, appointment: string): Promise<AppointmentResult> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        return { message: "You need to be logged in to book an appointment" };
    }

    try {
        // Fetch appointments from API route
        const appointmentsResponse = await fetch("http://localhost:5000/api/v1/appointments", {
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!appointmentsResponse.ok) {
            throw new Error("Failed to fetch appointments from API");
        }

        const appointmentsData = await appointmentsResponse.json();

        if (!appointmentsData || !appointmentsData.data || !Array.isArray(appointmentsData.data)) {
            return { message: "Failed to retrieve appointments." };
        }

        const response = await fetch(`http://localhost:5000/api/v1/appointments/${appointment}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                apptDate: apptDate
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to add appointment:", response.status, errorData);
            throw new Error(`Failed to fetch appointments: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        return { data: await response.json() };
    } catch (error) {
        console.error("Error in addApointment:", error);
        return { message: "An error occurred while adding the appointment." };
    }
}