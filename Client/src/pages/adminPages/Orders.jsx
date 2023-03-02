import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/admin/Sidebar'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'FirstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'UserId',
    headerName: 'User id',
    width: 150,
    editable: false,
  },
  {
    field: 'PropertyTitle',
    headerName: 'Property',
    width: 150,
    editable: false,
  },
  {
    field: 'PropertyId',
    headerName: 'Property id',
    width: 150,
    editable: false,
  },
  {
    field: 'Email',
    headerName: 'Email',
    width: 210,
    editable: false,
  },
  {
    field: 'Phone',
    headerName: 'Phone number',
    width: 210,
    editable: false,
  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 210,
    editable: true,
  },
];

const Container = styled.div`

`
const Button = styled.button`
  background: none; border: none; cursor: pointer;
`
function Orders() {
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get('/order/find/', {headers:{ Cookie:"access_token"}})
      setOrders(res.data)
    }
    getOrders()
  }, [])
  // const handleDelete = async (id) => {
  //   try{
  //     const res = await axios.delete(`/order/delete/${id}`,{ headers: { Cookie: "access_token" } },);
  //     console.log("user id is : " + id)
  //   } catch (err) {
  //     console.log(err)
  //   }
    
  // }
  const handleUpdate = async (params) => {
    try{
      const res = await axios.put(`/order/${params._id}`,{Status : `${params.Status}`},{ headers: { Cookie: "access_token" } },);
      console.log("order is updated")
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
            {/* <button
              className="deleteButton"
              //onClick={handleDelete(params.row._id)}
            >
              Delete
            </button> */}
            <Button onClick={() => handleUpdate(params.row)}>
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
          getRowId={(Orders) => Orders._id}
          rows={Orders}
          columns={columns.concat(actionColumn)}
          // pageSize={5}
          // rowsPerPageOptions={[20]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      
    </Container>
  )
}

export default Orders