import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinksBreadcrumbs from "./Breadcrumbs";
import navLinks from "../../utils/navlinks";
import ListSideBar from "./ListSideBar";
import AccountMenu from "../../pages/auth/AccountMenu";

function AppBarSite({ advisor }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Función para manejar la apertura y cierre del drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Obtener detalles del advisor de manera segura
  const {
    name = "Nombre desconocido",
    area = "Área desconocida",
    role,
  } = advisor?.[0] || {};

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ backgroundColor: "#0d1f2d" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            style={{ height: "50px" }}
          />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, marginLeft: 2 }}>
            PIAR Fundación Zamora Terán
          </Typography>
          <Typography variant="h6" noWrap sx={{ marginRight: 1 }}>
            {name}
          </Typography>
          <AccountMenu userName={name} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Reduce la cantidad de montajes
        sx={{
          width: 280,
          [`& .MuiDrawer-paper`]: { width: 280, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <ListSideBar
          listData={navLinks}
          userArea={area}
          isAdmin={role === "admin"}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <NavLinksBreadcrumbs />
        <Outlet />
      </Box>
    </Box>
  );
}

AppBarSite.propTypes = {
  advisor: PropTypes.arrayOf(
    PropTypes.shape({
      id_advisor: PropTypes.number.isRequired,
      id_area: PropTypes.number.isRequired,
      id_country: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      identification_number: PropTypes.string,
      birthdate: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppBarSite;
