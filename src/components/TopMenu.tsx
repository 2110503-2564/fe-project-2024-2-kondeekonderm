import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
import { FiLogIn, FiLogOut, FiHome, FiUsers, FiClipboard } from 'react-icons/fi'; // Importing icons
import { IoMdTime } from "react-icons/io";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.token) {
        return (
            <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-[60px] px-6 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md rounded-b-lg">
                <div className="flex items-center space-x-6">
                    <Link href="/api/auth/signin?callbackUrl=/">
                        <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                            <FiLogIn />
                            <span>Sign-In</span>
                        </div>
                    </Link>
                    <Link href="/register">
                        <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                            <FiClipboard />
                            <span>Register</span>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    const profile = await getUserProfile(session.user.token);
    console.log(profile);

    const role = profile.data.role;
    const adminCheck = (role: string) => role === "admin";

    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-[60px] px-6 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md rounded-b-lg">
            <div className="flex items-center space-x-6">
                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">
                        <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                            <FiLogOut />
                            <span>Sign-Out of {profile.data.name}</span>
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link href="/api/auth/signin?callbackUrl=/">
                            <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                                <FiLogIn />
                                <span>Sign-In</span>
                            </div>
                        </Link>
                        <Link href="/register">
                            <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                                <FiClipboard />
                                <span>Register</span>
                            </div>
                        </Link>
                    </>
                )}

                {adminCheck(role) ? (
                    <Link href="/viewusers/">
                        <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                            <FiUsers />
                            <span>View All Users</span>
                        </div>
                    </Link>
                ) : null}

                <Link href="/mybooking">
                    <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                        <FiClipboard />
                        <span>My Booking</span>
                    </div>
                </Link>

                <Link href="/">
                    <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                        <FiHome />
                        <span>Home</span>
                    </div>
                </Link>
            </div>

            <Link href="/venue">
                    <div className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 cursor-pointer">
                    <IoMdTime />
                        <span>Booking</span>
                    </div>
                </Link>
        </div>
    );
}
