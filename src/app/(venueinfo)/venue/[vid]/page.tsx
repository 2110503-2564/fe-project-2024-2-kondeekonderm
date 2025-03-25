import getCompany from "@/libs/getCompany"
import Link from "next/link"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"

export default async function AppointmentDetailPage({params}: {params: {vid: string}}) {
    
    const companyDetail = await getCompany(params.vid)

    return ( 
        <main className="text-center p-5 text-black">
            <h1 className="text-xl front-medium font-bold mt-[35px]">{companyDetail.data.name}</h1>

            <div className="text-md mx-5 text-black text-left">
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
                    Make Reservation
                </button>
                </Link>
            </div>
        </main>
    )
}
