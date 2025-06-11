"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function SignIn() {
    const router = useRouter()

  interface User {
    name: string
    email: string
    password: string
  }
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: ''
  });

 const signUp = async () => {
  try {
    setLoading(true);
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data.message);

    if (res.ok) {
      router.push('/login'); // Redirect to login page on successful signup
      console.log('Signup successful!');
    } else {
      console.log(data.message);
    }
  } catch (err) {
    console.error('Signup request failed:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-96 h-auto p-5 border-2 flex flex-col rounded-md">
        <h1 className="mb-5 font-bold text-2xl text-white text-center w-full">Sign In</h1>

        <label className="text-white w-full">Name</label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
          type="text"
          placeholder="Enter Name.."
          className="p-2 rounded-md mb-5 text-white bg-zinc-900 outline-none"
        />

        <label className="text-white w-full">Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          type="email"
          placeholder="Enter Email.."
          className="p-2 rounded-md mb-5 bg-zinc-900 outline-none"
        />

        <label className="text-white w-full">Password</label>
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          type="password"
          placeholder="Enter Password.."
          className="p-2 rounded-md mb-5 bg-zinc-900 outline-none"
        />

        <button
          onClick={signUp}
          className="mb-3 p-2 rounded-md text-white border-2 border-blue-500 hover:bg-blue-600 transition-colors"
        >
          {!loading ? 'Sign In': 'Signing In...'}
        </button>

        <p className="text-white">
          Already have an account?{' '}
          <a onClick={() => router.push("/login")} className="text-blue-500 cursor-pointer hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
