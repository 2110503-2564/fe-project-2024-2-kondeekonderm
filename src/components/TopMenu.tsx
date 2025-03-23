import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from 'next/link';

export default async function TopMenu () {

    const session = await getServerSession(authOptions)

    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex h-[50px] flex-row items-center border-t border-b border-gray-300 bg-white">
            <div className='flex flex-row absolute left-4 h-full items-center'>
            {
                session? <Link href="/api/auth/signout?callbackUrl=/"><div className='flex items-center h-full px-4 text-cyan-600 text-lg hover:text-cyan-800'>
                    Sign-Out of {session.user ?. name}</div></Link>
                :<Link href="/api/auth/signin?callbackUrl=/"><div className='flex items-center h-full px-4 text-cyan-600 text-lg hover:text-cyan-800'>
                    Sign-In</div></Link>
            }
            <TopMenuItem label="My Booking" link="/mybooking"/>
            </div>
            
            <TopMenuItem label="Booking" link="/booking" />
            <Image src="/img/logo.png" alt='logo' className="w-auto h-full" width={0} height={0} sizes="100vh"/>
            
        </div>
    );
}