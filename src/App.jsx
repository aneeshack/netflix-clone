// import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useEffect } from 'react';
// import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

// const App = () => {

//   const navigate = useNavigate()

//   useEffect(() => {
//     onAuthStateChanged(auth, async(user) => {
//       if(user){
//         console.log('logged in');
//         navigate('/')
//       }else{
//         console.log('logged out');
//         navigate('/login')
//       }
//     })
//   },[])
//   return (
//     <div>
//        <ToastContainer theme='dark'/>
//      <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/player/:id' element={<Player/>}/>
//      </Routes>
      
//     </div>
//   )
// }
const App = () => {
  return (
    <AuthProvider>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<PrivateRoute><Player /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App