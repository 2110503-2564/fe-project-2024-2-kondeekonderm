import CardPanel from "@/components/CardPanel"
import VenueCatalog from "@/components/CompanyCatalog"
import getVenues from "@/libs/getVenues"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { VenueJson } from "../../../../interface"
import getCompanys from "@/libs/getCompanys"

export default async function Venue() {
    const venues:VenueJson = await getCompanys()

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl front-medium text-black">Select Your Venue</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <VenueCatalog venuesJson={venues}/>
            </Suspense>
        </main>
    )
}