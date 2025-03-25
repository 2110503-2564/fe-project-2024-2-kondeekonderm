import getCompany from "@/libs/getCompany";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaGlobe, FaPhone, FaInfoCircle } from "react-icons/fa";

export default async function AppointmentDetailPage({ params }: { params: { vid: string } }) {
    const companyDetail = await getCompany(params.vid);
    const company = companyDetail.data;

    return (
        <main className="text-center p-6 text-black">
            {/* Company Name */}
            <h1 className="text-3xl font-bold mt-8 text-gray-900">{company.name}</h1>

            {/* Company Image */}
            <div className="flex justify-center mt-6">
                <Image 
                    src={company.picture}
                    alt={`${company.name} Picture`}
                    width={350}
                    height={350}
                    className="rounded-lg shadow-md object-cover"
                />
            </div>

            {/* Company Info */}
            <div className="max-w-lg mx-auto mt-6 p-4 text-left bg-gray-100 rounded-lg shadow-md">
                <div className="flex items-center gap-2 text-gray-800">
                    <FaMapMarkerAlt className="text-sky-600" /> 
                    <span>{company.address}, {company.district}, {company.province}, {company.postalcode}</span>
                </div>

                {company.website && (
                    <div className="flex items-center gap-2 text-gray-800 mt-2">
                        <FaGlobe className="text-sky-600" /> 
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                            {company.website}
                        </a>
                    </div>
                )}

                <div className="flex items-center gap-2 text-gray-800 mt-2">
                    <FaPhone className="text-sky-600" /> 
                    <span>{company.tel}</span>
                </div>

                <div className="flex items-start gap-2 text-gray-800 mt-3">
                    <FaInfoCircle className="text-sky-600 mt-1" />
                    <p className="text-sm leading-relaxed">{company.description}</p>
                </div>
            </div>

            {/* Booking Button */}
            <Link href={`/booking?id=${params.vid}&company=${company.name}`} className="inline-block mt-6">
                <button className="bg-sky-600 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    📅 Make a Booking
                </button>
            </Link>
        </main>
    );
}
