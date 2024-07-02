import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import {Link, Outlet, useNavigate} from 'react-router-dom'
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);

    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])
  
    return (
    <div className='min-h-[calc(100vh-150px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex flex-col justify-center items-center'>
                <div className="text-5xl cursor-pointer relative flex justify-center">
                {user?.ProfilePic ? (
                    <img
                    src={user?.ProfilePic}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full "
                    />
                ) : (
                    <FaRegUserCircle />
                )}
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='text-sm'>{user?.role}</p>
            </div>
            {/* navigation */}
            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:scale-105 transition-all duration-200 hover:font-semibold'>All Users</Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:scale-105 transition-all duration-200 hover:font-semibold'>All Products</Link>

                </nav>

            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel