import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Task from "./Task";

const TaskList = ({ tasks, status }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Grid container spacing={2}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Grid item xs={12} key={task.id_task}>
            <Task task={task} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="subtitle2" align="center">
            No hay tareas en esta sección.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id_task: PropTypes.number.isRequired,
      task_title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      task_description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      hours_dedicated: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      status: PropTypes.oneOf(["TODO", "DOING", "DONE", "DELETED"]),
    }).isRequired
  ).isRequired,
  status: PropTypes.oneOf(["TODO", "DOING", "DONE", "DELETED"]).isRequired,
};

export default TaskList;
