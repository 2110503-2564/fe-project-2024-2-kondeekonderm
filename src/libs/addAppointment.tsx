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

export default async function addApointment(apptDate: Date, company: string): Promise<AppointmentResult> {
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

        // Check if appointmentsData is valid
        if (!appointmentsData || !appointmentsData.data || !Array.isArray(appointmentsData.data)) {
            return { message: "Failed to retrieve appointments." };
        }

        const userProfile = await getUserProfile(session.user.token);
        const userRole = userProfile.data.role;

        const existedAppointments = appointmentsData.data; 
        
        if (userRole === "user" && existedAppointments.length >= 3) {
            return { message: "You have already made 3 appointments. You cannot create more." };
        }

        const response = await fetch(`http://localhost:5000/api/v1/companys/${company}/appointments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                apptDate: apptDate,
                user: session.user.name,
                company: company
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