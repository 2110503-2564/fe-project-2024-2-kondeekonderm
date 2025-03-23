"use client"
import { useReducer, useState, useEffect } from "react"
import Card from "./Card"
import Link from "next/link"
import { VenueItem, VenueJson } from "../../interface"
import getVenues from "@/libs/getVenues"

export default function CardPanel() {
    const [venueResponse, setVenueResponse] = useState<VenueJson|null>(null)

    useEffect(()=>{
        const fetchData = async () => {
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    },[])

    const cardReducer = (
        venueList: Map<string, number>, 
        action: { type: string; venueName: string; rating?: number }
    ) => {
        const newVenueList = new Map(venueList);
        switch (action.type) {
            case "set":
                newVenueList.set(action.venueName, action.rating??0);
                return newVenueList;
            case "remove":
                newVenueList.delete(action.venueName);
                return newVenueList;
            default:
                return venueList;
        }
    };

    const defaultVenueList = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const [venueList, dispatchVenue] = useReducer(cardReducer, defaultVenueList);

    /*
    const mockVenueRepo = [{vid:"001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid:"002", name:"Spark Space", image: "/img/sparkspace.jpg"},
        {vid:"003", name: "The Grand Table", image:"/img/grandtable.jpg"}]
    */

    if(!venueResponse) return (<p className="text-black">Venue Panel is Loading ...</p>)

    return (
        <div>
            <div style={{margin:"20px", display:"flex",flexDirection:"row", 
                alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                {
                    venueResponse.data.map((venueItem: VenueItem)=>(
                        <Link href={`/venue/${venueItem._id}`} className="w-1/5">
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture}
                        onRate={(vanue:string, rate:number)=>dispatchVenue({type:'set', venueName:vanue, rating: rate})}
                        />
                        </Link>
                        )
                    )
                }
            </div>
            
            <div className="text-xl font-bold text-black p-4">Venue List with Ratings : {venueList.size}</div> 
                {Array.from(venueList).map(([name, rate]) => (
                    <div key={name} data-testid={name} className="text-black pl-4" 
                    onClick={()=>dispatchVenue({type:'remove', venueName:name, rating:rate})}>
                        {name} Rating: {rate}
                    </div>
                ))}
            
        </div>
        
    )
}