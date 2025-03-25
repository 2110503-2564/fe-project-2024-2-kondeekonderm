import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getAppointments() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
        throw new Error("You need to be logged in to book an appointment");
    }

    const response = await fetch("http://localhost:5000/api/v1/appointments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.user.token}`,
        },
    })
    if(!response.ok) {
        throw new Error("Failed to fetch user profile")
    }
    return await response.json()
}