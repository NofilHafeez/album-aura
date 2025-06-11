"use client"
import {useState} from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/context/UserContext";

export default function Login() {
    const router = useRouter()
      const { fetchUser } = useAuth();
    

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        return
      }

      fetchUser(); // Fetch user data after login
      // ✅ Login successful
      router.push('/dashboard') 
      
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong')
    }finally {
      setLoading(false)
    }
  }


  return (
   <>
    <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <div className="w-96 h-auto p-5 border-2 flex flex-col rounded-md">
        <h1 className="mb-5 font-bold text-2xl  text-white text-center w-full">Login</h1>
        {/* Email */}
        <h1 className=" text-white  w-full">Email</h1>
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required type="email" placeholder="Enter Email.." className="p-2  rounded-md mb-5 bg-zinc-900 outline-none text-white" />
        {/* Password */}
        <h1 className=" text-white w-full">Password</h1>
        <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter Password.." className="p-2 rounded-md mb-5 outline-none  bg-zinc-900  text-white" />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {/*Sign-in Button */}
        <button onClick={handleLogin} className="border-2 border-blue-500 mb-3 p-2 rounded-md text-white hover:bg-blue-600 transition-colors">{!loading ? 'Login' : 'logining'}</button> 
         <p>Dont have an account? <a onClick={() => router.push("/sign-in")} className="text-blue-500 cursor-pointer  mb-5 hover:underline">Sign Here</a></p>
         
        </div>
    </div>
   </>
  );
}
