import CompanyCatalog from "@/components/CompanyCatalog"
import getCompanys from "@/libs/getCompanys"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { CompanyJson } from "../../../../interface"

export default async function Company() {
    const companys:CompanyJson = await getCompanys()

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl front-medium text-black">Select Your Venue</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <CompanyCatalog companysJson={companys}/>
            </Suspense>
        </main>
    )
}
