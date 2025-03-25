
import getCompany from "@/libs/getCompany"
import Link from "next/link"
import Image from "next/image"
export default async function AppointmentDetailPage({params}: {params: {vid: string}}) {
    
    const companyDetail = await getCompany(params.vid)

    return ( 
        <main className="text-center p-5 text-black">
            <h1 className="text-xl front-medium font-bold mt-[35px]">{companyDetail.data.name}</h1>

            <div className="text-md mx-5 text-black text-left">
            <Image src={companyDetail.data.picture}
            alt = 'Venue Picture'
            width={200}
            height={200}  sizes="100vw"
            className="rounded-lg  bg-black" />
                <div>Address: {companyDetail.data.address}</div>
                <div>Province: {companyDetail.data.province}</div>
                <div>District: {companyDetail.data.district}</div>
                <div>Postal Code: {companyDetail.data.postalcode}</div>
                <div>Website: {companyDetail.data.website}</div>
                <div>description: {companyDetail.data.description}</div>
                <div>Tel: {companyDetail.data.tel}</div>
                <Link href={`/booking?id=${params.vid}&company=${companyDetail.data.name}` }>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                text-white shadow-sm">
                    Make Booking
                </button>
                </Link>
            </div>
        </main>
    )
}

