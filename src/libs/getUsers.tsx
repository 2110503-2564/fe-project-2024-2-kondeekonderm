export default async function getUsers(token: string) {

    const response = await fetch("http://localhost:5000/api/v1/auth/getUsers", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok) {
        throw new Error("Failed to fetch users")
    }
    return await response.json()
}