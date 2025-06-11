// import { useState, useEffect } from 'react';


// export const useUser = () => {
//     interface User {
//   name: string;
//   image?: string;
// }

//   const [user, setUser] = useState<User>({ name: ''});
//   const [isLoading, setIsLoading] = useState(true);
 

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch('/api/auth/me');
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data.user.name);
//         } else {
//           setUser({ name: '' });
//         }
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//         setUser({ name: '' });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = async () => {
//     try {
//       await fetch('/api/logout', { method: 'GET' });
//       setUser({ name: '' });
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { user, isLoading, logout };
// };