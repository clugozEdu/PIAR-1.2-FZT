import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const CardTasks = ({ title, children }) => {
  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
            {title}
          </Typography>
        }
      />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

CardTasks.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default CardTasks;
