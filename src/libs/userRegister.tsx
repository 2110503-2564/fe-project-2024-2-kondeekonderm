export default async function userRegister(userEmail: string, userPassword: string , userName : string , userTel : string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name : userName ,
            tel : userTel ,
            email: userEmail,
            password: userPassword,
            role : "user"
        }),
    })

    if(!response.ok) {
        alert("Cannot register your account")
        throw new Error("Failed to fetch venues")
    }
    alert("register successfull")
    return await response. json()
}