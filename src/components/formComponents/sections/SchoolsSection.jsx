import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AutoCompleteFormField from "../../shares/AutoCompleteField";
import { fetchSchools } from "../../../redux/schoolData/schoolDataSlice";

const SchoolSection = ({ titleCard }) => {
  const { values, setFieldValue } = useFormikContext();
  const dispatch = useDispatch();
  const { schools, error } = useSelector((state) => state.schoolData);

  useEffect(() => {
    if (schools.length === 0) {
      dispatch(fetchSchools());
    }
  }, [dispatch, schools]);

  useEffect(() => {
    if (values.idSchool.length > 0) {
      let departmentsId = [];
      let municipalitiesId = [];
      values.idSchool.forEach((idSchool) => {
        const school = schools.find((school) => school.id_school === idSchool);

        if (school) {
          departmentsId.push(school.school_municipality);
          municipalitiesId.push(school.school_department);
        }
      });

      setFieldValue("municipalities", municipalitiesId);
      setFieldValue("departments", departmentsId);
    } else {
      setFieldValue("municipalities", []);
      setFieldValue("departments", []);
    }
  }, [values.idSchool, schools, setFieldValue]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container spacing={2} rowSpacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" flexDirection={"column"}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            fontWeight={"bold"}
          >
            {titleCard}
          </Typography>
        </Box>
      </Grid>

      <AutoCompleteFormField
        name="idSchool"
        label="Escuela"
        options={schools}
        getOptionLabel={(option) => option.school_name}
        getOptionSelectedValue={(option) => option.id_school}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        maxSelections={5}
      />
    </Grid>
  );
};

SchoolSection.propTypes = {
  titleCard: PropTypes.string,
};

export default SchoolSection;
