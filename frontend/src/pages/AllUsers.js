import React, { useEffect } from 'react'
import SummaryApi from '../common'
import { useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import {MdModeEdit} from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id  : ""
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method : SummaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

    // console.log("All User data response", dataResponse)
  }

  useEffect(()=>{
    fetchAllUsers()
  },[])

  return (
    <div className='pb-4'>
      <table className='w-full userTable'>
        <thead className=''>
          <tr className='bg-black text-white'>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
          </tr>
        </thead>

        <tbody>
        {
          allUsers.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{element?.name}</td>
                <td>{element?.email}</td>
                <td>{element?.role}</td>
                <td>{moment(element?.createdAt).format('LL')}</td>
                <td>
                  <button className='rounded-full p-2 cursor-pointer hover:text-white hover:bg-red-600' 
                  onClick={()=>{
                    setUpdateUserDetails(element)
                    setOpenUpdateRole(true)
                    }}>
                    <MdModeEdit/>
                  </button>
                </td>
              </tr>
            )
          })
        }

        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole 
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
            />
        )
      }

      
    </div>
  )
}

export default AllUsers