import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Appointment from "@/db/models/Appointment";

export async function GET(request: Request) {
    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
        return NextResponse.json({ error: "Unauthorized: No authorization header" }, { status: 401 });
    }

    const token = authorizationHeader.split("Bearer ")[1];
    if (!token) {
        return NextResponse.json({ error: "Unauthorized: Invalid authorization header" }, { status: 401 });
    }

    try {
        const response = await fetch("http://localhost:5000/api/v1/appointments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: `Failed to fetch appointments: ${response.status} - ${JSON.stringify(errorData)}` }, { status: 500 });
        }

        const appointmentsData = await response.json();
        return NextResponse.json(appointmentsData);
    } catch (error: any) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}