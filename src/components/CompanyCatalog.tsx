import Link from "next/link"
import Card from "./Card"
import { VenueItem, VenueJson } from "../../interface"

export default async function CompanyCatalog({venuesJson}: {venuesJson:VenueJson}) {
    const venueJsonReady = await venuesJson
    
    return (
        <div className="text-black">
        Explore {venueJsonReady.count} companies in our company catalog
            <div style={{margin:"20px", display:"flex", flexDirection:"row", 
                alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                    {
                        venueJsonReady.data.map((venueItem:VenueItem)=>(
                            <Link href={`/venue/${venueItem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                            p-2 sm:p-4 md:p-4 lg:p-8">
                            <Card venueName={venueItem.name} imgSrc="/img/bloom.jpg"
                            />
                            </Link>
                            )
                        )
                    }
            </div>
        </div>
    )
}