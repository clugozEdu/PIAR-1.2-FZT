import React from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";
import PropTypes from "prop-types";
import { format } from "date-fns";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

function TimeFormField({ xs = 12, sm = 12, md = 6, lg = 3, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value) => {
    // Format the date to avoid timezone issues
    const formattedValue = format(value, "HH:mm:ss");
    helpers.setValue(formattedValue);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          slotProps={{ textField: { fullWidth: true } }}
          onChange={handleChange}
          value={field.value ? new Date(`1970-01-01T${field.value}`) : null}
          autoOk
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          {...props}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "20px",
            },
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
}

TimeFormField.propTypes = propTypes;

export default TimeFormField;
