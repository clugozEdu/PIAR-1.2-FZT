// MainLayout.js
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import AppBarSite from "./components/layout/SideBar";

function MainLayout() {
  const [advisorLogin, setAdvisorLogin] = useState([]);
  const { advisor } = useSelector((state) => state.advisorData);

  useEffect(() => {
    if (advisor && advisor) {
      setAdvisorLogin([advisor]);
    }
  }, [advisor]);

  return (
    <>
      <CssBaseline />
      {advisorLogin.length > 0 && <AppBarSite advisor={advisorLogin} />}
    </>
  );
}

export default MainLayout;
