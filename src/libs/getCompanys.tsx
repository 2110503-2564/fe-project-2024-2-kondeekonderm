export default async function getCompanys() {

    await new Promise((resolve)=>setTimeout(resolve, 5000))
    
    const response = await fetch(`http://localhost:5000/api/v1/companys`)
    if(!response.ok) {
        throw new Error("Failed to fetch companys")
    }

    return await response.json()
}