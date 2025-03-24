export default async function getCompanys() {
    
    const response = await fetch(`http://localhost:5000/api/v1/companys` , {cache: 'no-store',})
    if(!response.ok) {
        throw new Error("Failed to fetch venues")
    }

    return await response.json()
}