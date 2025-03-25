import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
import getUsers from '@/libs/getUsers';
import { UserItem } from '../../interface';

export default async function AllUsers() {
    const session = await getServerSession(authOptions);
    
    
    if (!session || !session.user?.token) {
        return <div>Access Denied</div>;
    }

    
    const users = await getUsers(session.user.token);
    console.log(users)
    
    return (
        <div className="p-5">
            <div className="text-center text-lg text-gray-600">There are {users.count} users in this data</div>
            
            {users.data && users.data.length > 0 ? (
                users.data.map((userItem : UserItem) => (
                    <div key={userItem._id} className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black">
                        <div className="text-xl">{userItem.name}</div>
                        <div className="text-sm">Tel: {userItem.tel}</div>
                        <div className="text-sm">Email: {userItem.email}</div>
                        <div className="text-sm">Date: {userItem.createdAt}</div>
                    </div>
                ))
            ) : (
                <div>No users found</div> 
            )}
        </div>
    );
}
