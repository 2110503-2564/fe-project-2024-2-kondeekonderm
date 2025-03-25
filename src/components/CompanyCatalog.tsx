import Link from "next/link";
import Card from "./Card";
import { CompanyJson } from "../../interface";

export default async function CompanyCatalog({ companysJson }: { companysJson: Object }) {
    const companyJsonReady = await companysJson;

    if (!companyJsonReady.data || companyJsonReady.data.length === 0) {
        return <p className="text-center text-lg text-gray-600 mt-6">🚫 No venues found. Please check back later.</p>;
    }

    return (
        <div className="text-black px-4 overflow-x-auto">
            {/* Flex Container - Ensures exactly 4 items per row */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 w-full">
                {companyJsonReady.data.map((companyItem: any) => (
                    <Link 
                        key={companyItem._id} 
                        href={`/venue/${companyItem._id}`}
                        className="w-[22%] min-w-[250px] transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <Card companyName={companyItem.name} imgSrc={companyItem.picture} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
