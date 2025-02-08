import { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { AiOutlineHome, AiOutlineMessage, AiOutlineBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between items-center px-4">
        
        {/* Left Section: Logo + Mobile Menu */}
        <div className="flex items-center space-x-3">
          <IconButton className="sm:hidden" onClick={toggleMobileMenu}>
            <AiOutlineMenu className="text-gray-700 text-xl" />
          </IconButton>
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-lg font-bold text-gray-800 hidden sm:block">SocialApp</span>
        </div>

        {/* Center: Search Bar (Hidden on Small Screens) */}
        <div className="relative hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1 w-1/3">
          <AiOutlineSearch className="text-gray-500 mr-2 text-lg" />
          <InputBase
            placeholder="Search..."
            className="text-gray-700 outline-none flex-1"
          />
        </div>

        {/* Right Section: Icons + Profile */}
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

      {/* User Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} className="mt-2">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
        <List className="w-60">
          <ListItem button onClick={toggleMobileMenu}>
            <AiOutlineHome className="mr-3 text-lg" />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <AiOutlineMessage className="mr-3 text-lg" />
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <AiOutlineBell className="mr-3 text-lg" />
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
