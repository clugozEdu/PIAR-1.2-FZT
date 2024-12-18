import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import TaskForm from "./tasks/TaskForm";
import { getTasks } from "../../api/appScript";
import DialogForm from "../../components/shares/DialogForm";
import TaskList from "./tasks/TaskList";
import { useSelector } from "react-redux";
import CardTasks from "../../components/CardTasks";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { advisor } = useSelector((state) => state.advisorData);

  useEffect(() => {
    const getTasksAdvisor = async () => {
      const response = await getTasks(advisor.id_advisor);
      console.log(response);
      setTasks(response);
      setLoading(false);
    };
    getTasksAdvisor();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  const skeletonCharge = (status) => {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} key={index}>
            <Paper
              elevation={5}
              style={{ padding: "16px", borderRadius: "8px" }}
            >
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                sx={{ marginBottom: 1 }}
              />
              {status !== "Todo" && (
                <Skeleton
                  variant="text"
                  width="70%"
                  height={20}
                  sx={{ marginBottom: 1 }}
                />
              )}
              {status === "Doing" && (
                <Grid container justifyContent={"end"}>
                  <Skeleton variant="rectangular" width="30%" height={20} />
                </Grid>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid container justifyContent={{ xs: "center", lg: "end" }}>
        <Button
          startIcon={<i className="fas fa-plus"></i>}
          size="small"
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Nueva Tarea
        </Button>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardTasks title="Backlog">
          {loading ? (
            skeletonCharge("Todo")
          ) : (
            <TaskList tasks={tasks} status={"TODO"} />
          )}
        </CardTasks>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardTasks title="Pendiente">
          {loading ? (
            skeletonCharge("Doing")
          ) : (
            <TaskList tasks={tasks} status={"DOING"} />
          )}
        </CardTasks>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardTasks title="Realizadas">
          {loading ? (
            skeletonCharge("Done")
          ) : (
            <TaskList tasks={tasks} status={"DONE"} />
          )}
        </CardTasks>
      </Grid>
      <DialogForm
        open={open}
        onClose={handleClose}
        title="Nueva Tarea"
        onSave={handleSave}
      >
        <TaskForm />
      </DialogForm>
    </Grid>
  );
};

export default TasksPage;
