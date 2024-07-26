import React from "react";
import { Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";

const propTypes = {
  type: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  message: PropTypes.string.isRequired,
};

// const defaultProps = {
//   type: "info",
// };

const AlertComponent = ({ type, message, ...props }) => {
  return (
    <Alert
      severity={type}
      sx={{
        borderRadius: "20px",
      }}
      {...props}
    >
      <Typography variant="body1" align="center">
        {message}
      </Typography>
    </Alert>
  );
};

AlertComponent.propTypes = propTypes;
// AlertComponent.defaultProps = defaultProps;

export default AlertComponent;
