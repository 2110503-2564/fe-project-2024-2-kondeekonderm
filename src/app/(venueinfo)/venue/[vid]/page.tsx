import Image from "next/image"
import getCompany from "@/libs/getCompany"
import Link from "next/link"
export default async function VenueDetailPage({params} : {params : {vid : string}}) {
    const venueDetail = await getCompany(params.vid)
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001" , {name:"The Bloom Pavilion" , image:"/img/bloom.jpg"})
    // mockVenueRepo.set("002" , {name:"Spark Space" , image:"/img/sparkspace.jpg"})
    // mockVenueRepo.set("003" , {name:"The Grand Table" , image:"/img/grandtable.jpg"})
    return (
        <main className="text-center p-5 w-full min-h-screen bg-white">
            <h1 className="text-lg font-medium ">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
            <Image src={venueDetail.data.picture}
            alt = 'Venue Picture'
            width={200}
            height={200}  sizes="100vw"
            className="rounded-lg  bg-black" />
            <div className="text-md mx-5 text-left">
                <div>Name : {venueDetail.data.name}</div>
                <div>Address : {venueDetail.data.address}</div>
                <div>District : {venueDetail.data.district}</div>
                <div>Postal Code : {venueDetail.data.postalcode}</div>
                <div>Tel : {venueDetail.data.tel}</div>
                <div>website : {venueDetail.data.website}</div>
                <Link href={`/booking?id=${params.vid}&name=${venueDetail.data.name}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">Make Booking</button>
                </Link> 
                </div>
            </div>
        </main>
    )
}