import Link from "next/link"
import Card from "./Card"
import { VenueItem, VenueJson } from "../../interface"

export default async function CompanyCatalog({venuesJson}: {venuesJson:VenueJson}) {
    const venueJsonReady = await venuesJson
    
    return (
        <div className="text-black">
            <div className="bg-blue-900 text-white w-full p-4 text-center">
            <h1 className="text-2xl front-medium text-white py-2">Booking Your Companies</h1>
                Explore {venueJsonReady.count} companies in our company catalog
            </div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", 
                alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                    {
                        venueJsonReady.data.map((venueItem:VenueItem)=>( 
                            <Link href={`/venue/${venueItem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                                <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
                            </Link>
                        ))
                    }
            </div>
        </div>
    )
}
