import getAppointment from "@/libs/getAppointment"
import getCompany from "@/libs/getCompany"

export default async function VenueDetailPage({params}: {params: {vid: string}}) {
    
    const venueDetail = await getCompany(params.vid)

    return ( 
        <main className="text-center p-5 text-black">
            <h1 className="text-xl front-medium font-bold mt-[35px]">{venueDetail.data.name}</h1>

            <div className="text-md mx-5 text-black text-left">
                <div>Name: {venueDetail.data.name}</div>
                <div>Address: {venueDetail.data.address}</div>
                <div>District: {venueDetail.data.district}</div>
                <div>Postal Code: {venueDetail.data.postalcode}</div>
                <div>Tel: {venueDetail.data.tel}</div>
                <div>website: {venueDetail.data.website}</div>
            </div>

        </main>
    )
}
