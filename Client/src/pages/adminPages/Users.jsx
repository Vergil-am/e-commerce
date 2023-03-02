import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/admin/Sidebar'
//import Datagrid from '../../components/admin/Dataagrid';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'FirstName' ,
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'Email',
    width: 210,
    editable: true,
  },
  {
    field: 'Phone',
    headerName: 'Phone number',
    width: 210,
    editable: true,
  },
  {
    field: 'isAdmin',
    headerName: 'Admin',
    width: 210,
    editable: true,
  },
];


const Container = styled.div`
`
const Button = styled.button`
  background: none; border: none; cursor: pointer;
`

function Users() {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('/user/find/', {headers:{ Cookie:"access_token"}})
      setUsers(res.data)
    }
    getUsers()
  }, [])

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`/user/delete/${id}`,{ headers: { Cookie: "access_token" } },);
      console.log("user id is : " + id)
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleEdit = async (params) => {
    try {
      const res = await axios.put(`/user/update/${params._id}`, { 
        FirstName: `${params.FirstName}`,
        LastName: `${params.LastName}`,
        Email: `${params.Email}`,
        Phone: `${params.Phone}`,
        isAdmin: `${params.isAdmin}`
      } , {header: { Cookie: "access_token"}})
      console.log("user updated")
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
    
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex"}} className="cellAction">
            <Button onClick={() => handleDelete(params.row._id)}>
              <DeleteOutlineIcon style={{color: "red"}}/>
            </Button>
            <Button onClick={() => handleEdit(params.row)}>
              <EditIcon style={{color: "blue"}} /> 
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Container>
        <Sidebar />
        <Box sx={{ height: '100vh', width: '100vw' }}>
        <DataGrid
          getRowId={(Users) => Users._id}
          rows={Users}
          columns={columns.concat(actionColumn)}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  )
}

export default Users