"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { data:session } = useSession()

    return (
        <div className={styles.banner} onClick={()=>{ setIndex(index+1) }}>
            <Image src={covers[index%4]}
            alt='cover'
            fill={true}
            priority
            style={{ objectFit: "cover" }} 
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-meduim'>where every event finds its venue</h1>
                <h3 className='text-xl font-serif'>Finding the perfect venue has never been easier. Whether it's a wedding, corporate event, or private party, we connecting people to the perfect place.</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>
                Welcome {session.user?.name}</div>:null
            }
        </div>
    );
}