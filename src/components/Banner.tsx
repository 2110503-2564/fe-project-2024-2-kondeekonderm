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
                <h1 className='text-4xl font-meduim'>where every event finds its venue</h1>
                <h3 className='text-xl font-serif'>Finding the perfect venue has never been easier. Whether it's a wedding, corporate event, or private party, we connecting people to the perfect place.</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>Welcome {session.user?.name}</div>:null
            }
        </div>
    )
}
