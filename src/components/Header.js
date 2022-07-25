import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser } from "../util/AuthFunctions";

const pages = ["Explore"];
// const settings = ['My Account', 'Logout'];

const primaryColor = "#326DD9";
const secondaryColor = "#234C99";

const profileDropdownList = [
  {
    displayName: "My Profile",
    redirectTo: "my-profile",
  },
  {
    displayName: "My trips",
    redirectTo: "my-trips",
  },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("isLogin "+localStorage.getItem("isLogin"));
    if (localStorage.getItem("isLogin") === 'true') {
        setIsLogin(true);
    } else {
        setIsLogin(false);
    }
    return () => {};
  }, []);

  const logout = () => {
    const userMail = localStorage.getItem("userMail");
    console.log("Signout user");
    console.log(userMail);
    toast.success("Your successfully logged out", {
      position: toast.POSITION.TOP_RIGHT,
    });
    logoutUser(userMail);
  }
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="/tripflex.png"
              alt="Tripflex"
              loading="lazy"
              className="brand-img"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: primaryColor }} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button
                    sx={{ color: secondaryColor, backgroundColor: "white" }}
                    onClick={() => navigate(page.toLowerCase())}
                    textalign="center"
                    variant="outline"
                    underline="none"
                  >
                    {page}
                  </Button>
                  {/* <Link to={`/${page.toLowerCase()}`} textalign="center" underline="none">{page}</Link> */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="/tripflex.png"
              alt="Tripflex"
              loading="lazy"
              className="brand-img"
            />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              gap: "12px",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
                // href={`/${page.toLowerCase()}`}
                onClick={() => navigate(page.toLowerCase())}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {isLogin ? 
          (<><Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="S" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {profileDropdownList.map((setting) => (
                <MenuItem
                  key={setting.displayName}
                  onClick={handleCloseUserMenu}
                >
                  <Button
                    sx={{ color: secondaryColor }}
                    onClick={() => {navigate(setting.redirectTo)}}
                    textalign="center"
                    underline="none"
                  >
                    {setting.displayName}
                  </Button>
                  {/* <Typography textalign="center">{setting}</Typography> */}
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                    sx={{ color: secondaryColor }}
                    onClick={logout}
                    textalign="center"
                    underline="none"
                  >
                    Logout
                  </Button>
              </MenuItem>
            </Menu></>) : (<Button
                    sx={{ color: secondaryColor }}
                    onClick={() => {navigate("/login")}}
                    textalign="center"
                    underline="none"
                  >
                    Login
                  </Button>)}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
