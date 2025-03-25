import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-1.5 
            backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-md">
            
            {/* Left Section - Logo */}
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <Image 
                        src="/img/logo2.jpeg" 
                        alt="logo" 
                        width={30} // Reduced logo size
                        height={25} // Reduced logo size
                        className="rounded-full shadow-md hover:scale-105 transition-transform"
                    />
                    <span className="ml-2 text-lg font-semibold text-cyan-700 hover:text-cyan-900 transition-colors">
                        KonDeeKonDerm
                    </span>
                </Link>
            </div>

            {/* Right Section - Navigation & Auth */}
            <div className="flex items-center space-x-4"> {/* Reduced space between items */}
                <TopMenuItem label="Booking" link="/venue" />
                <TopMenuItem label="My Booking" link="/mybooking" />
                <TopMenuItem label='Register' link = "/register"/>

                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">
                        <div className="px-3 py-1.5 text-md font-medium text-cyan-600 rounded-lg 
                            hover:text-white hover:bg-cyan-600 transition-all duration-300">
                            Sign Out ({session.user?.name})
                        </div>
                    </Link>
                ) : (
                    <Link href="/api/auth/signin?callbackUrl=/">
                        <div className="px-3 py-1.5 text-md font-medium text-cyan-600 rounded-lg 
                            hover:text-white hover:bg-cyan-600 transition-all duration-300">
                            Sign In
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
