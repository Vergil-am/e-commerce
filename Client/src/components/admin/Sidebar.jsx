import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const Container = styled.div`
`

const Center = styled.div`
  display: flex; background-color: #050a30;
  align-items: center; justify-content: space-between;
  height: 50px;

`
const Title = styled.p`
        font-size: 24px;
        font-weight: bold;
        color: white;
        padding-top: 10px;
`
const Span = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: white;
    margin-left: 10px;
`
const Button = styled.button`
  background: none; border-style: none;
  cursor: pointer; color: white ; font-weight: 600;
  font-size: 13px; margin-left: 5px;
`
const Sidebar = () => {
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = (e)=> {
    dispatch(logout())
  }
  return (
    <Container>
      <Center>
          <Link to="/" style={{textDecoration: 'none'}} >
              <Span>Home</Span>
          </Link>

          <Link to="/admin/users" style={{ textDecoration: "none",color: "white" }}>
              <PersonOutlineIcon />
              <Span>Users</Span>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none",color: "white" }}>
              <StoreIcon />
              <Span>Products</Span>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" ,color: "white"}}>
                <CreditCardIcon/>
                <Span>Orders</Span>
          </Link>

          
          
          <Link to="/admin/products/create" style={{ textDecoration: "none" ,color: "white"}}>
              <AddCircleOutlineIcon />
              <Span>new product</Span>
          </Link>
          <Span>
            <ExitToAppIcon style={{ color: "white" }}/>
            <Button onClick={handleLogout}> Logout</Button></Span>
      </Center>
      
    </Container>
  );
};

export default Sidebar;
