import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const CardTasks = ({ title, children, color }) => {
  return (
    <Card elevation={2}>
      <CardHeader
        sx={{ backgroundColor: { color } }}
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
  color: PropTypes.string,
};

export default CardTasks;
