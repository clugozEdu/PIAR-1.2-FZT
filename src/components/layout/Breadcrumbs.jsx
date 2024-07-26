import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { pathTitles } from "../../utils/Variables";

function NavLinksBreadcrumbs() {
  // hook to get location in navLinks
  const location = useLocation();

  const pathnames =
    location.pathname == "/"
      ? ["Inicio"]
      : location.pathname.split("/").filter((x) => x);

  // function to return values the pathnames
  const getCustomName = (pathSegment) => {
    return pathTitles[pathSegment] || pathSegment;
  };

  return (
    <Grid container>
      <Grid item sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const displayName = getCustomName(value);

            return last ? (
              <Typography key={to} variant="h6" color="black">
                {displayName}
              </Typography>
            ) : (
              <Typography key={to} variant="h6" color="black">
                {displayName}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}

export default NavLinksBreadcrumbs;
