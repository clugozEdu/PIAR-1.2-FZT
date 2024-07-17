import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Alert,
  CardContent,
  IconButton,
  Divider,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { DocentStrategy } from "../../../../assets/icons/ListIcons";
import SelectFormField from "../../../shares/SelectFormField";

const strategyArray = [
  {
    category_sarm: "Sustitusión",
    stratey: "Aprendizaje por proyecto",
  },
  { category_sarm: "Sustitusión", stratey: "Lectura diaria" },
  {
    category_sarm: "Sustitusión",
    stratey: "Ejercitación para el pensamiento numérico",
  },
  {
    category_sarm: "Aumento",
    stratey: "Ejercitación para el desarrollo de fluidez y comprensión lectora",
  },
  { category_sarm: "Aumento", stratey: "Producción de texto" },
  {
    category_sarm: "Aumento",
    stratey:
      "Producción de figuras e ilustraciones para el desarrollo del pensamiento espacial",
  },
  {
    category_sarm: "Aumento",
    stratey: "Resolución de problemas",
  },
  {
    category_sarm: "Refinición",
    stratey: "Búsqueda, recogida y selección de información",
  },
  {
    category_sarm: "Refinición",
    stratey: "Aprendizaje a través de la programación",
  },
  { category_sarm: "Refinición", stratey: "Juegos computarizados" },
  { category_sarm: "Refinición", stratey: "Dictados" },
  {
    category_sarm: "Refinición",
    stratey:
      "Discusión dirigida para el desarrollo de la expresión y comprensión oral",
  },
];

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
};

function StrategyDocent({ currentDocent }) {
  const { values, setFieldValue } = useFormikContext();
  const [data, setData] = useState([]);
  const [newStrategy, setNewStrategy] = useState({
    strategy: "",
    category_sarm: "",
  });
  const [strategyExist, setStrategyExist] = useState(false);
  const [errorStrategy, setErrorStrategy] = useState(false);

  const getInitStrategy = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent.strategy : [];
  };

  useEffect(() => {
    setData(getInitStrategy(currentDocent) || []);
  }, [currentDocent, values.tableDocents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    strategyArray.forEach((s) => {
      if (value === s.stratey) {
        setNewStrategy((prev) => ({
          ...prev,
          [name]: value,
          ["category_sarm"]: s.category_sarm,
        }));
      }
    });
  };

  const handleAddStrategy = () => {
    if (!newStrategy.strategy) {
      setErrorStrategy(true);
      return;
    }

    if (newStrategy.strategy && newStrategy.category_sarm) {
      const strategyExist = data.some(
        (s) => s.strategy === newStrategy.strategy
      );
      if (strategyExist) {
        setStrategyExist(true);
        return;
      }

      const updateStrategy = [...data, newStrategy];

      const updateDocent = values.tableDocents.map((docent) =>
        docent.id == currentDocent.id
          ? { ...docent, strategy: updateStrategy }
          : docent
      );

      console.log(updateDocent);
      setFieldValue("tableDocents", updateDocent);
      setData(updateStrategy);
      setNewStrategy({
        strategy: "",
        category_sarm: "",
      });
      setStrategyExist(false);
      setErrorStrategy(false);
    }
  };

  const handleDeleteStrategy = (index) => {
    const updatedStrategy = data.filter((_, i) => i !== index);

    const updatedDocents = values.tableDocents.map((docent) =>
      docent.id === currentDocent.id
        ? { ...docent, strategy: updatedStrategy }
        : docent
    );

    setFieldValue("tableDocents", updatedDocents);
    setData(updatedStrategy);
  };

  return (
    <Card
      sx={{
        p: 1,
        border: "2px solid #d3d3d3",
        borderRadius: "20px",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            flexDirection={"column"}
            alignContent={"center"}
          >
            {strategyExist && (
              <Alert severity="error" sx={{ borderRadius: "20px" }}>
                <Typography variant="body1" align="center">
                  No se puede subir la misma estrategia, seleccione otra opción.
                </Typography>
              </Alert>
            )}
          </Grid>

          <SelectFormField
            name="strategy"
            label="Tipo de evidencia"
            catalog={strategyArray}
            menuItemValue="stratey"
            optionValue="stratey"
            value={newStrategy.strategy}
            onChange={handleInputChange}
            xs={12}
            sm={12}
            md={10}
            lg={10}
            error={errorStrategy}
            helperText={errorStrategy ? "Tiene que seleccionar" : ""}
          />

          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              my={1}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#2e8b57",
                  "&:hover": {
                    backgroundColor: "#1d5737",
                  },
                }}
                onClick={handleAddStrategy}
              >
                Añadir
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {data && data.length > 0 ? (
            data.map((strategy, index) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Card variant="outlined" sx={{ borderRadius: "20px" }}>
                  <CardContent>
                    <Box
                      display={"flex"}
                      flexDirection={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <DocentStrategy />
                        <Typography variant="h6" ml={1}>
                          Estrategia {index + 1}
                        </Typography>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteStrategy(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography>{strategy.strategy}</Typography>
                    <Typography color="textSecondary">
                      Categoria : {strategy.category_sarm}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid container mt={3} spacing={2}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={"column"}
                >
                  <Alert severity="info" sx={{ borderRadius: "20px" }}>
                    <Typography variant="body1" align="center">
                      Agrega las estrategias implementadas por el docente.
                    </Typography>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

StrategyDocent.propTypes = propTypes;

export default StrategyDocent;
