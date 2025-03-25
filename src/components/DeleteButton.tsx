"use client";

import { useSession } from "next-auth/react";
import deleteAppointment from "@/libs/deleteAppointment";

interface DeleteButtonProps {
    id: string;
    onDeleteSuccess: () => void;
}

export default function DeleteButton({ id, onDeleteSuccess }: DeleteButtonProps) {
    const { data: session } = useSession();

    const handleDelete = async () => {
        if (!session || !session.user.token) {
            console.error("No session or token available");
            return;
        }

        try {
            await deleteAppointment(id, session.user.token);
            console.log("Appointment deleted successfully");
            onDeleteSuccess();
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 mr-2
        text-white shadow-sm" onClick={handleDelete}>Delete</button>
    );
}