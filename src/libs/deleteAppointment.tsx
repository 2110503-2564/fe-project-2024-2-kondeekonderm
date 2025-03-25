export default async function deleteAppointment(id: string, token: string) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Failed to delete appointment:", response.status);
            throw new Error("Failed to delete appointment");
        }

    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
}