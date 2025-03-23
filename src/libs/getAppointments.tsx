export default async function getAppointments(id:string) {
    
    const response = await fetch(`http://localhost:5000/api/v1/appointments/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch venues")
    }

    return await response.json()
}