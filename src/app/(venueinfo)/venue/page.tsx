import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanys from "@/libs/getCompanys";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { CompanyJson } from "../../../../interface";

export default async function Company() {
    const companys: CompanyJson = await getCompanys();

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                🎯 Select Your Company
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Browse and choose a company for your appointment</p>

            {/* Company Catalog */}
            <main className="text-center p-5">
                <h1 className="text-2xl front-medium text-black">Select Your Company</h1>
                <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                    <CompanyCatalog companysJson={companys} />
                </Suspense>
            </main>

        </main>
    );
}

// Loading Animation Component
function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center mt-6">
            <p className="text-gray-600 text-lg">Fetching Companies...</p>
            <LinearProgress className="w-64 mt-2" />
        </div>
    );
}