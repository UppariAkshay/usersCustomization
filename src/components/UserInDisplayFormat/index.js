import { useState } from "react";

function UserInDisplayFormat(props)
{
    const {userDetails, seteditUserID, setAllUsersList} = props


    
    const deleteUser = async (id) => {
        const options = {
          method: 'DELETE'
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, options)
        const responseData = await response.json()
    
        console.log(responseData)
    
        if (response.ok)
        {
          setAllUsersList(prevState => prevState.filter(eachUser => eachUser.id !== id))
        }
      }
    
    return (
        <tr>
      <td>{userDetails.name}</td>
      <td>{userDetails.username}</td>
      <td>{userDetails.phone}</td>
      <td>{userDetails.email}</td>
      <td>{userDetails.address.city}</td>
      <td>{userDetails.company.name}</td>
      <td>{userDetails.website}</td>
      <td><button onClick={() => seteditUserID(userDetails.id)} className='btn btn-dark'>Edit</button> <button onClick={() => deleteUser(userDetails.id)} className='btn btn-danger'>Delete</button></td>
    </tr>
    )
}

export default UserInDisplayFormat