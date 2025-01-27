import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [allUsersList, setAllUsersList] = useState([])
  const [newUserDetails, setNewUserDetails] = useState([])



  useEffect( () => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const responseData = await response.json()

      if (response.ok)
      {
        setAllUsersList(responseData)
      }
    }

    fetchUsers()
  }, [])


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

  const onClickAddNewUser = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserDetails)
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/users',options )
    const responseData = await response.json()
    
    console.log(responseData)

    if (response.ok)
    {
      setAllUsersList(prevState => ([...prevState, responseData]))
    }
  }

  const displayUser = (userDetails) => {
    return <tr>
      <td>{userDetails.name}</td>
      <td>{userDetails.username}</td>
      <td>{userDetails.phone}</td>
      <td>{userDetails.email}</td>
      <td>{userDetails.address.city}</td>
      <td>{userDetails.company.name}</td>
      <td>{userDetails.website}</td>
      <td><button className='btn btn-dark'>Edit</button> <button onClick={() => deleteUser(userDetails.id)} className='btn btn-danger'>Delete</button></td>
    </tr>
  }

  return (
    <div className="App">

      <h1>User Details</h1>

      <h1 className='text-start'>Add New User</h1>
      <form className='d-flex mb-5 mt-3'>
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, name: e.target.value}))} className='form-control' type='text' placeholder='Enter Name' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, username: e.target.value}))} className='form-control' type='text' placeholder='Enter user name' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, phone: e.target.value}))} className='form-control' type='text' placeholder='Enter Phone' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, email: e.target.value}))} className='form-control' type='text' placeholder='Enter Email' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, address: {city: e.target.value}}))} className='form-control' type='text' placeholder='Enter Address' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, company: {name: e.target.value}}))} className='form-control' type='text' placeholder='Enter Company Name' />
        <input onChange={(e) => setNewUserDetails(prevState => ({...prevState, website: e.target.value}))} className='form-control' type='text' placeholder='Enter Website' />
        <button type='button' onClick={() => onClickAddNewUser() } className='btn btn-success'>ADD</button>
      </form>


      <table className='table table-striped mt-5'>

        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>User Name</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Email</th>
            <th scope='col'>Address</th>
            <th scope='col'>Company Name</th>
            <th scope='col'>Website</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            allUsersList.map(eachUser => displayUser(eachUser) )
          }
        </tbody>

      </table>
    </div>
  );
}

export default App;
