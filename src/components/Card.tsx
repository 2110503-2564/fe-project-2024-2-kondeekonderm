"use client"

import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import { useState } from "react";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Card({ companyName, imgSrc, onRate}:{ companyName: string, imgSrc: string, onRate?: Function }) {
    const [rating, setRating] = useState<number | null>(0);

    return (
        <InteractiveCard contentName={companyName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className="w-full h-[15%] p-[10px] text-black underline">{companyName}</div>
            {
                onRate? <Stack spacing={1}>
                <Rating  
                    id={`${companyName} Rating`} 
                    name={`${companyName} Rating`} 
                    data-testid={`${companyName} Rating`} 
                    value={rating}
                    onClick={(e)=>e.stopPropagation()}
                    onChange={(e, newValue) => {
                        setRating(newValue); 
                        onRate(companyName, newValue);
                        //e.preventDefault()
                    }}
                    precision={0.5}
                />
                </Stack>:''
            }
            
        </InteractiveCard>
    )
}

