export default async function getCompany(id:string) {
        
    const response = await fetch(` http://localhost:5000/api/v1/companys/${id}` , {cache: 'no-store',})
   
    if(!response.ok) {
        throw new Error("Failed to fetch venues")
    }

    return await response.json()
}