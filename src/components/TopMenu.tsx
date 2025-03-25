import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
export default async function TopMenu () {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.token) {
        // ถ้าไม่มี session หรือ token ให้ return ค่า fallback หรือ render UI อื่น
        return (
            <div className="fixed top-0 left-0 right-0 z-30 flex h-[50px] flex-row items-center border-t border-b border-gray-300 bg-yellow-100">
            <div className="flex flex-row absolute left-4 h-full items-center">
                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">
                        <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                            Sign-Out 
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link href="/api/auth/signin?callbackUrl=/">
                            <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                                Sign-In
                            </div>
                        </Link>
                        <Link href="/register">
                            <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                                Register
                            </div>
                        </Link>
                    </>
                )}

                { <Link href="/mybooking">
                            <div className="flex items-center h-full px-4 text-gray-500 text-md hover:text-black">
                            My Booking
                        </div>
                    </Link>}
            </div>

            <TopMenuItem label="Booking" link="/booking" />
            <Image src="/img/logo.png" alt="logo" className="w-auto h-full" width={0} height={0} sizes="100vh" />
        </div>
        )
    }

    const profile = await getUserProfile(session.user.token)
    console.log(profile)
    
    const role = profile.data.role

    const adminCheck = (role: string) => role === "admin"

    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex h-[50px] flex-row items-center border-t border-b border-gray-300 bg-yellow-100">
            <div className="flex flex-row absolute left-4 h-full items-center">
                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">
                        <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                            Sign-Out of {profile.data.name}
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link href="/api/auth/signin?callbackUrl=/">
                            <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                                Sign-In
                            </div>
                        </Link>
                        <Link href="/register">
                            <div className="flex items-center h-full px-4 text-cyan-600 text-md hover:text-cyan-800">
                                Register
                            </div>
                        </Link>
                    </>
                )}

                {adminCheck(role) ? (
                    <Link href="/viewusers/">
                        <div className="flex items-center h-full px-4 text-gray-500 text-md hover:text-black">
                            View All Users
                        </div>
                    </Link>
                ) : null}

                { <Link href="/mybooking">
                            <div className="flex items-center h-full px-4 text-gray-500 text-md hover:text-black">
                            My Booking
                        </div>
                    </Link>}
                { <Link href="/">
                        <div className="flex items-center h-full px-4 text-gray-500 text-md hover:text-black">
                            Home
                        </div>
                    </Link>}
            </div>
            
            
            <TopMenuItem label="Booking" link="/venue" />
            <Image src="/img/logo.png" alt="logo" className="w-auto h-full" width={0} height={0} sizes="100vh" />
        </div>
    )
}
