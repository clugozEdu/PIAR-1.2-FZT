import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Box, Grid, IconButton } from "@mui/material";
import { format } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Task = ({ task }) => {
  const {
    task_title,
    task_description,
    startDate,
    endDate,
    hours_dedicated,
    status,
  } = task;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  return (
    <Paper style={{ padding: "16px", borderRadius: "8px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {task_title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body2">{task_description}</Typography>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Typography variant="caption">
          {startDate &&
            endDate &&
            `${formatDate(startDate)} - ${formatDate(endDate)} | `}
          {hours_dedicated && `${hours_dedicated} hrs`}
        </Typography>
      </Box>
      {status === "DOING" && (
        <Box mt={1} display="flex" justifyContent="flex-end">
          <IconButton
            size="small"
            color="primary"
            // onClick={() => onMarkComplete(task)}
            style={{ marginRight: "4px" }}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            // onClick={() => onCancel(task)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    task_title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    task_description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    hours_dedicated: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
