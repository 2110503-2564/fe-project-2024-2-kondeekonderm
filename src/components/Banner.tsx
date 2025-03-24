'use client'
import styles from './banner.module.css'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner(){
    const covers = ['/img/banner02.jpg' , '/img/banner05.jpg' , '/img/banner03.jpg','/img/banner04.jpg']
    const [index , setIndex] = useState(0) 
    const rounter = useRouter()
    const {data : session} = useSession()
    console.log(session?.user.token)
    return (
        <div className={styles.banner} onClick={() => setIndex(index+1)}>
            <Image src={covers[index%4]}
            alt ='cover'
            fill={true}
            priority
            objectFit='cover' />
            <div className={styles.bannerText}>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>Welcome {session.user?.name}</div>:null
            }
            <button className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent" onClick={(e) => {e.stopPropagation(); rounter.push('/venue')}}>Booking Your Company</button>
        </div>
    )
}