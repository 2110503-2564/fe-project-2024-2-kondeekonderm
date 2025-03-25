"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";

export default function Banner() {
    const covers = ["/img/cover3.jpg", "/img/cover4.jpg", "/img/cover2.jpg", "/img/cover.jpg"];
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    const nextIndex = (index + 1) % covers.length;
    const handleBannerClick = () => setIndex(nextIndex);

    return (
        <div 
            className={`${styles.banner} relative h-[400px] w-full overflow-hidden cursor-pointer mt-[60px]`}  // Add margin-top to avoid overlap
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
                    blurDataURL={covers[index % 4]}  // Optional: low-quality placeholder
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg" aria-label="Register Now for the Online Job Fair">
                    🌟 Register Now for the <br /> Online Job Fair & Kickstart Your Career! 🚀
                </h1>
            </div>

            {/* Welcome Message */}
            {session && (
                <div className="absolute top-6 right-10 bg-black/60 px-4 py-2 rounded-lg text-lg font-semibold text-white shadow-md">
                    👋 Welcome, {session.user?.name}!
                </div>
            )}

            {/* CTA Button */}
            <button 
                className="absolute bottom-6 right-10 bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all 
                hover:bg-cyan-400 hover:scale-105 focus:ring-4 focus:ring-cyan-300"
                aria-label="Go to the venue selection page"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push("/venue");
                }}
            >
                🎯 Select Company
            </button>
        </div>
    );
}
