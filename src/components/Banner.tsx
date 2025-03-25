"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";

export default function Banner() {
    const covers = ["/img/cover3.jpg", "/img/cover4.jpg", "/img/cover2.jpg", "/img/cover.jpg"];
    const [index, setIndex] = useState(0);
    const [showWelcome, setShowWelcome] = useState(true);
    const router = useRouter();
    const { data: session } = useSession();

    const nextIndex = (index + 1) % covers.length;
    const handleBannerClick = () => setIndex(nextIndex);

    useEffect(() => {
        if (session) {
            const timer = setTimeout(() => setShowWelcome(false), 5000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [session]);

    return (
        <div 
            className={`${styles.banner} relative h-[400px] w-full overflow-hidden cursor-pointer mt-[60px]`}
            onClick={handleBannerClick}
            aria-label="Click to change banner image"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image 
                    src={covers[index % 4]} 
                    alt="cover" 
                    fill={true} 
                    priority 
                    style={{ objectFit: "cover" }} 
                    className="transition-opacity duration-700 ease-in-out"
                    blurDataURL={covers[index % 4]} 
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg" aria-label="Register Now for the Online Job Fair">
                    🌟 Register Now for the <br /> Online Job Fair & Kickstart Your Career! 🚀
                </h1>
            </div>

            {/* Welcome Message (disappears after 5s) */}
            {session && showWelcome && (
                <div className="absolute top-6 right-10 bg-black/60 px-4 py-2 rounded-lg text-lg font-semibold text-white shadow-md transition-opacity duration-1000">
                    👋 Welcome, {session.user?.name}!
                </div>
            )}
        </div>
    );
}
