import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';




export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = (e)=> {
    dispatch(logout())
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      > 
        { currentUser.isAdmin  ?
          <MenuItem>
              <Link to="/admin" style={{display:"flex", textDecoration:"none", alignItems: 'center', textAlign: 'center', color:"black"}}>
                <AdminPanelSettingsIcon  style={{marginRight: "10px", color: "gray"}}/>
                Admin
              </Link>
          </MenuItem> : null}
        <MenuItem>
           <Link to={`/user/order/${currentUser._id}`} style={{display:"flex", textDecoration:"none", alignItems: 'center', textAlign: 'center', color:"black"}}><ListItemIcon>
            <ReceiptIcon fontSize="small"/>
          </ListItemIcon>
          My orders </Link>
        </MenuItem>
        <MenuItem>
            <button onClick={() => handleLogout()} style={{background:"none", border:"none", cursor:"pointer", fontSize:"15px", display:"flex", alignItems: 'center', textAlign: 'center'}}>
               <ListItemIcon>
               <Logout fontSize="small" />
               </ListItemIcon>
               Logout
           </button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
