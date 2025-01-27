import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [allUsersList, setAllUsersList] = useState([])




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


  

  const displayUser = (userDetails) => {
    return <tr>
      <td>{userDetails.name}</td>
      <td>{userDetails.username}</td>
      <td>{userDetails.phone}</td>
      <td>{userDetails.email}</td>
      <td>{userDetails.address.city}</td>
      <td>{userDetails.company.name}</td>
      <td>{userDetails.website}</td>
      <td><button className='btn btn-dark'>Edit</button> <button className='btn btn-danger'>Delete</button></td>
    </tr>
  }

  return (
    <div className="App">

      <h1>User Details</h1>

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
