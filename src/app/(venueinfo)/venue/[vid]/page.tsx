import Image from "next/image"
import getVenue from "@/libs/getVenue"
import getAppointments from "@/libs/getAppointments"

export default async function VenueDetailPage({params}: {params: {vid: string}}) {
    
    const venueDetail = await getAppointments(params.vid)

    return ( 
        <main className="text-center p-5 text-black">
            <h1 className="text-xl front-medium font-bold mt-[35px]">{venueDetail.data.apptDate}</h1>

            <div className="text-md mx-5 text-black text-left">
                <div>Name: {venueDetail.data.user}</div>
                <div>Address: {venueDetail.data.address}</div>
                <div>District: {venueDetail.data.district}</div>
                <div>Postal Code: {venueDetail.data.postalcode}</div>
                <div>Tel: {venueDetail.data.tel}</div>
                <div>Daily Rate: {venueDetail.data.dailyrate}</div>
            </div>

        </main>
    )
}
