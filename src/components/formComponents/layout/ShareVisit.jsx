import React, { useEffect } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  fecthAdvisorsShared,
  clearAdvisors,
} from "../../../redux/advisors/advisorsSlice";
import { SharedIcon } from "../../../assets/icons/ListIcons";

const ShareVisit = () => {
  const dispatch = useDispatch();
  const { setFieldValue, values } = useFormikContext();
  const { advisors, isLoading } = useSelector((state) => state.advisorsShared);
  const { advisor } = useSelector((state) => state.advisorData);

  useEffect(() => {
    if (values.idAdvisor.length === 0) {
      const advisorValues = {
        country: advisor.id_country,
        idArea: advisor.id_area,
        idAdvisor: [advisor.id_advisor],
        advisorLogin: advisor,
      };

      Object.keys(advisorValues).forEach((key) => {
        setFieldValue(key, advisorValues[key]);
      });
    }
  }, [values.idAdvisor, advisor, setFieldValue]);

  const handlerDispatch = () => {
    if (advisors.length === 0) {
      dispatch(fecthAdvisorsShared());
      setFieldValue("sharedVisit", true);
    }
  };

  const handlerDeleteDispatch = () => {
    if (advisors.length > 0) {
      dispatch(clearAdvisors());
      setFieldValue("sharedVisit", false);
      setFieldValue("idAdvisor", [advisor.id_advisor]);

      // Remove advisorAttend from each docente
      const updatedDocents = values.tableDocents.map((docente) => {
        /* eslint-disable-next-line no-unused-vars */
        const { advisorAttend, ...rest } = docente;
        return rest;
      });

      setFieldValue("tableDocents", updatedDocents);
    }
  };

  return (
    <Grid container justifyContent="end">
      {advisors.length === 0 ? (
        <Grid item>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#0D6E6E",
              "&:hover": {
                backgroundColor: "#4a9d9c",
              },
            }}
            startIcon={
              isLoading ? (
                <CircularProgress sx={{ color: "white" }} size={24} />
              ) : null
            }
            endIcon={<SharedIcon sx={{ fill: "white" }} />}
            onClick={handlerDispatch}
            disabled={advisors.length > 0}
          >
            Compartir Visita
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#f44336",
              "&:hover": {
                backgroundColor: "#ba000d",
              },
              color: "white",
            }}
            endIcon={<DeleteIcon />}
            onClick={handlerDeleteDispatch}
          >
            No compartir
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ShareVisit;
