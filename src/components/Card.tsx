"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { useState } from "react";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function Card({ 
    companyName, 
    imgSrc, 
    onRate 
}: { companyName: string; imgSrc: string; onRate?: Function }) {
    const [rating, setRating] = useState<number | null>(0);

    return (
        <InteractiveCard contentName={companyName}>
            {/* Image Container with Gradient Overlay */}
            <div className="w-full h-[85%] relative rounded-t-lg overflow-hidden">
                <Image 
                    src={imgSrc} 
                    alt={`${companyName} Image`} 
                    fill 
                    className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>
            </div>

            {/* Company Name */}
            <div className="w-full h-[15%] p-3 text-black text-lg font-semibold text-center truncate">
                {companyName}
            </div>

            {/* Rating Section (if onRate is provided) */}
            {onRate && (
                <div className="flex justify-center items-center py-2">
                    <Stack spacing={1}>
                        <Rating  
                            id={`${companyName} Rating`} 
                            name={`${companyName} Rating`} 
                            data-testid={`${companyName} Rating`} 
                            value={rating}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e, newValue) => {
                                setRating(newValue); 
                                onRate(companyName, newValue);
                            }}
                            precision={0.5}
                            size="large"
                        />
                    </Stack>
                </div>
            )}
        </InteractiveCard>
    );
}
