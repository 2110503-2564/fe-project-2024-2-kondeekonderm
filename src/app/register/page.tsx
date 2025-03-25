"use client";
import DateReserve from "@/components/DateReserve";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function Booking() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const regex = /^0\d{9}$/;
    return regex.test(phone);
  };

  const checkPassword = (
    password1: string,
    password2: string,
    email: string,
    name: string,
    contactNumber: string
  ) => {
    if (!validatePhoneNumber(contactNumber)) {
      alert("Please enter a valid phone number (10 digits and starts with 0)");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (password1 !== password2) {
      alert("Passwords do not match. Please try again.");
      return false;
    }

    userRegister(email, password2, name, contactNumber);
    router.push("/");
    return true;
  };

  return (
    <main className="w-full flex flex-col items-center py-10 min-h-screen bg-gray-100 py-10 px-4 sm:px-6 md:px-8">
      <div className="text-3xl font-bold text-stone-950 mb-8">Create Your Account</div>

      <div className="space-y-6 p-8 flex flex-col max-w-lg mx-auto bg-white shadow-xl rounded-lg">
        <TextField
          variant="outlined"
          name="Name-Lastname"
          label="Name-Lastname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          variant="outlined"
          name="Contact-Number"
          label="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          fullWidth
        />

        <TextField
          variant="outlined"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          variant="outlined"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          name="password2"
          label="Confirm Password"
          type={showPassword2 ? "text" : "password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          className="mt-6 w-full rounded-lg bg-blue-600 text-white py-3 px-8 shadow-lg text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          onClick={() => checkPassword(password, password2, email, name, contactNumber)}
        >
          Register
        </Button>


      </div>
    </main>
  );
}
