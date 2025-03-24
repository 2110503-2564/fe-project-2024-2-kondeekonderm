"use client"
import DateReserve from "@/components/DateReserve";
import { TextField, Button, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import React from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import Company from "@/db/models/Company"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import {IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Booking () {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password2, setPassword2] = useState("");
    const [showPassword2, setShowPassword2] = useState(false);

    const checkPassword = (password1 : string , password2 : string , email : string , name : string , contactNumber : string) => {
        if(password1 == password2) {
            userRegister(email , password2 , name ,contactNumber)
            router.push('/')
            return true ;
        }
        alert("Please check your password again") ;
        return false ;
    }

    return (
        <main className="w-full flex flex-col items-center space-y-6 py-10">
            <div className="text-2xl font-bold text-stone-950">Register your Account</div>
            
            <div className="space-y-6 p-6 flex flex-col max-w-md mx-auto shadow-lg rounded-lg">
                <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" 
                value={name} onChange={(e) => {setName(e.target.value) }}/>
                <TextField variant="standard" name="Contact-Number" label="Contact-Number"
                value={contactNumber} onChange={(e) => {setContactNumber(e.target.value)}}/>

                <TextField variant="standard" name="email" label="Email"
                value={email} onChange={(e) => {setEmail(e.target.value)}}/>

                <TextField
                variant="standard"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />

                <TextField
                    variant="standard"
                    name="password2"
                    label="Confirm Password"
                    type={showPassword2 ? 'text' : 'password'}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => setShowPassword2(!showPassword2)}
                            edge="end"
                            >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    />

                

                
                <Button name="register" className="block rounded-md bg-sky-600 hover:bg-indigo-600 
                px-3 py-2 shadow-sm text-white"
                onClick={() => {console.log("register") 
                ; 
                checkPassword(password , password2 ,email , name ,contactNumber)}}>
                 Register
                </Button>

            </div>
            
        </main>
    );
}