import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardsForms from "../components/layout/Cards";
import PieChartComponent from "../components/dashboard-panel/PieChar";
import BarChartComponent from "../components/dashboard-panel/BarsCharts";
import { Grid, Typography, Skeleton } from "@mui/material";
import { getSeriesData, getTotalUsers } from "../utils/helpers";
import { Stack } from "@mui/system";

function Home() {
  const { visitPiar, isLoading } = useSelector((state) => state.visitsPiar);
  const { advisor } = useSelector((state) => state.advisorData);
  const [visitForAdvisor, setVisitForAdvisor] = useState([]);
  const [typeVisit, setTypeVisit] = useState([]);
  const [totalVisit, setTotalVisit] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSchools, setTotalSchools] = useState(0);

  console.log(advisor);

  useEffect(() => {
    if (!isLoading && Array.isArray(visitPiar) && visitPiar.length > 0) {
      const advisorData = getSeriesData(visitPiar, "advisor_name", "data");
      const visitTypeData = getSeriesData(
        visitPiar,
        "visit_type_register",
        "value"
      );
      const totalVisitData = getSeriesData(visitPiar, "id", "value");
      const totalSchoolsData = getSeriesData(visitPiar, "school_code", "value");
      const totalUsersData = getTotalUsers(visitPiar);

      setVisitForAdvisor(advisorData);
      setTypeVisit(visitTypeData);
      setTotalVisit(totalVisitData);
      setTotalSchools(totalSchoolsData);
      setTotalUsers(totalUsersData);
    }
  }, [isLoading, visitPiar]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CardsForms
          title="Total de Visitas"
          formComponent={
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <Skeleton variant="text" width={100} height={50} />
              ) : (
                <Typography variant="h3">{totalVisit.length}</Typography>
              )}
            </Stack>
          }
          hcolor={"#1d2e3d"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CardsForms
          title="Total de Escuelas"
          formComponent={
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <Skeleton variant="text" width={100} height={50} />
              ) : (
                <Typography variant="h3">{totalSchools.length}</Typography>
              )}
            </Stack>
          }
          hcolor={"#1d2e3d"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CardsForms
          title="Docentes Atendidos"
          formComponent={
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <Skeleton variant="text" width={100} height={50} />
              ) : (
                <Typography variant="h3">{totalUsers.length}</Typography>
              )}
            </Stack>
          }
          hcolor={"#1d2e3d"}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}>
        <CardsForms
          title="Visitas por asesor"
          formComponent={
            isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : visitForAdvisor.length > 0 ? (
              <BarChartComponent data={visitForAdvisor} />
            ) : (
              <Typography variant="h4">Sin Datos</Typography>
            )
          }
          hcolor={"#1d2e3d"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <CardsForms
          title="Tipos de Visitas"
          formComponent={
            isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : typeVisit.length > 0 ? (
              <PieChartComponent visits={typeVisit} />
            ) : (
              <Typography variant="h4">Sin Datos</Typography>
            )
          }
          hcolor={"#1d2e3d"}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
