import React, { useEffect } from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { useField } from "formik";
import PropTypes from "prop-types";

const propTypes = {
  catalog: PropTypes.array.isRequired,
  menuItemValue: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  fatherValue: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

const SelectFormField = ({
  catalog,
  menuItemValue,
  optionValue,
  fatherValue,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  // console.log('SelectFormField', field, meta, helpers)

  if (!catalog.some((item) => item[optionValue] === field.value)) {
    field.value = "";
  }

  useEffect(() => {
    if (!catalog.some((item) => item[optionValue] === field.value)) {
      helpers.setValue("");
    }
  }, [fatherValue]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        fullWidth
        select
        helperText={meta.touched && meta.error}
        error={!!(meta.touched && meta.error)}
        {...field}
        {...props}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "20px",
          },
        }}
      >
        {catalog.map((option, index) => (
          <MenuItem key={index} value={option && option[optionValue]}>
            {option && option[menuItemValue]}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

SelectFormField.propTypes = propTypes;

export default SelectFormField;
