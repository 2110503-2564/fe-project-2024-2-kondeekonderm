import Link from "next/link"
import Card from "./Card"
import { VenueItem, VenueJson } from "../../interface"

export default async function VenueCatalog({venuesJson}: {venuesJson:VenueJson}) {
    const venueJsonReady = await venuesJson
    
    return (
        <div className="text-black">
        Explore {venueJsonReady.count} models in our venue catalog
            <div style={{margin:"20px", display:"flex", flexDirection:"row", 
                alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                    {
                        venueJsonReady.data.map((venueItem:VenueItem)=>(
                            <Link href={`/venue/${venueItem._id}`} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture}
                            />
                            </Link>
                            )
                        )
                    }
            </div>
        </div>
    )
}