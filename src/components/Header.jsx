import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" className="bg-white shadow-md z-50">
        <Toolbar className="flex justify-between items-center px-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-3">
            <IconButton className="sm:hidden" onClick={toggleMobileMenu}>
              <AiOutlineMenu className="text-gray-700 text-xl" />
            </IconButton>
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-bold text-gray-800 hidden sm:block">
              SocialApp
            </span>
          </div>

          {/* Center: Search Bar (Hidden on Small Screens) */}
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1 w-1/3">
            <AiOutlineSearch className="text-gray-500 mr-2 text-lg" />
            <InputBase
              placeholder="Search..."
              className="text-gray-700 outline-none flex-1"
            />
          </div>

          {/* Right: Icons + Profile */}
          <div className="flex items-center space-x-4">
            <IconButton>
              <AiOutlineHome className="text-gray-700 text-xl" />
            </IconButton>
            <IconButton>
              <AiOutlineMessage className="text-gray-700 text-xl" />
            </IconButton>
            <IconButton>
              <AiOutlineBell className="text-gray-700 text-xl" />
            </IconButton>

            {/* User Avatar & Menu */}
            <IconButton onClick={handleMenuOpen}>
              <Avatar src="/user.jpg" alt="User" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* User Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Full-Screen Overlay Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
        <Box className="w-screen h-screen bg-white flex flex-col items-center justify-center text-gray-800 space-y-6">
          {/* Close Button */}
          <IconButton
            onClick={toggleMobileMenu}
            className="absolute top-5 right-5 text-gray-700"
          >
            <AiOutlineClose size={24} />
          </IconButton>

          {/* Navigation Links */}
          <List className="w-full text-center">
            <ListItem button onClick={toggleMobileMenu} component={Link} to="/home">
              <AiOutlineHome className="mr-3 text-lg" />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu} component={Link} to="/messages">
              <AiOutlineMessage className="mr-3 text-lg" />
              <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button onClick={toggleMobileMenu} component={Link} to="/notifications">
              <AiOutlineBell className="mr-3 text-lg" />
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
