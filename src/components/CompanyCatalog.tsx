import Link from "next/link"
import Card from "./Card"
import { CompanyItem, CompanyJson } from "../../interface"

export default async function CompanyCatalog({companysJson}: {companysJson:Object}) {
    const companyJsonReady = await companysJson

    if (!companyJsonReady.data || companyJsonReady.data.length === 0) {
        return <p className="text-red-500">No venues found.</p>; // 🔹 Show fallback message
    }
    
    return (
        <div className="text-black">
            
            <div style={{margin:"20px", display:"flex", flexDirection:"row", 
                alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                    {
                        companyJsonReady.data.map((companyItem:Object)=>(
                            <Link href={`/venue/${companyItem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                            p-2 sm:p-4 md:p-4 lg:p-8">
                            <Card companyName={companyItem.name} imgSrc={companyItem.picture}
                            />
                            </Link>
                            )
                        )
                    }
            </div>
        </div>
    )
}
