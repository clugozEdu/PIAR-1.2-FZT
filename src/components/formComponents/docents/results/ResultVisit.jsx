import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Box,
  Alert,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  TextField,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  ResultDocentTime,
  ResultDocentIntencity,
  ResultDocentFrecuency,
  ResultDocentMatery,
} from "../../../../assets/icons/ListIcons";

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
};

const iconResult = [
  {
    type: "Tiempo con el docente",
    icon: <ResultDocentTime />,
  },
  {
    type: "Intensidad de uso",
    icon: <ResultDocentIntencity />,
  },
  {
    type: "Frecuencia de uso",
    icon: <ResultDocentFrecuency />,
  },
  {
    type: "Material digital facilitado",
    icon: <ResultDocentMatery />,
  },
];

const typesResult = {
  matery: [
    {
      name: "Video tutorial de aplicaciones de la XO",
    },
    {
      name: "Guia de aprendizaje",
    },
    {
      name: "Set de estrategias didácticas",
    },
    {
      name: "Ninguna",
    },
  ],
  frecuency: [
    {
      name: "1 a 2 veces por semana",
    },
    {
      name: "3 veces por semana",
    },
    {
      id: "3",
      name: "4 a 5 veces por semana",
    },
    {
      name: "Ninguna",
    },
  ],
};

function ResultDocents({ currentDocent }) {
  const { values, setFieldValue } = useFormikContext();
  const [data, setData] = useState([]);
  const [timeDocent, setTimeDocent] = useState({
    option: "Tiempo con el docente",
    description: "",
  });
  const [intencityDocent, setIntencityDocent] = useState({
    option: "Intensidad de uso",
    description: "",
  });
  const [frecuencyDocent, setFrecuencyDocent] = useState({
    option: "Frecuencia de uso",
    description: "",
  });
  const [materyDocent, setMateryDocent] = useState({
    option: "Material digital facilitado",
    description: "",
  });
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const foundDocent = values.tableDocents.find(
      (d) => d.id === currentDocent.id
    );
    if (foundDocent) {
      setIsSaved(foundDocent.results && foundDocent.results.length > 0);
      setData(foundDocent.results || []);
      setTimeDocent(
        foundDocent.results?.find(
          (result) => result.option === "Tiempo con el docente"
        ) || { option: "Tiempo con el docente", description: "" }
      );
      setIntencityDocent(
        foundDocent.results?.find(
          (result) => result.option === "Intensidad de uso"
        ) || { option: "Intensidad de uso", description: "" }
      );
      setFrecuencyDocent(
        foundDocent.results?.find(
          (result) => result.option === "Frecuencia de uso"
        ) || { option: "Frecuencia de uso", description: "" }
      );
      setMateryDocent(
        foundDocent.results?.find(
          (result) => result.option === "Material digital facilitado"
        ) || { option: "Material digital facilitado", description: "" }
      );
    } else {
      setData([]);
      setIsSaved(false);
      setTimeDocent({ option: "Tiempo con el docente", description: "" });
      setIntencityDocent({ option: "Intensidad de uso", description: "" });
      setFrecuencyDocent({ option: "Frecuencia de uso", description: "" });
      setMateryDocent({
        option: "Material digital facilitado",
        description: "",
      });
    }
  }, [currentDocent, values.tableDocents]);

  const handleInputChange = (e, callBackState) => {
    const { value } = e.target;
    callBackState((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleAddResult = () => {
    if (
      !timeDocent.description ||
      !intencityDocent.description ||
      !frecuencyDocent.description ||
      !materyDocent.description
    ) {
      setError(true);
      return;
    }

    const updateResults = [
      timeDocent,
      intencityDocent,
      frecuencyDocent,
      materyDocent,
    ];

    let updatedDocents = values.tableDocents.map((docent) =>
      docent.id === currentDocent.id
        ? { ...docent, results: updateResults }
        : docent
    );

    if (!values.tableDocents.some((docent) => docent.id === currentDocent.id)) {
      const newDocent = { ...currentDocent, results: updateResults };
      updatedDocents = [...values.tableDocents, newDocent];
    }

    setFieldValue("tableDocents", updatedDocents);
    setData(updateResults);
    setError(false);
    setIsSaved(true);
  };

  const handleDeletedResult = () => {
    const updatedDocents = values.tableDocents.map((docent) => {
      if (docent.id === currentDocent.id) {
        /* eslint-disable-next-line no-unused-vars */
        const { results, ...docentWithoutResults } = docent;
        return docentWithoutResults;
      }
      return docent;
    });

    // const updatedDocents = values.tableDocents.filter(
    //   (docent) => docent.id !== currentDocent.id
    // );

    setFieldValue("tableDocents", updatedDocents);
    setIsSaved(false);
  };

  const getIconResult = (type) => {
    const result = iconResult.find((r) => r.type === type);
    return result ? result.icon : null;
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
            sx={{
              paddingBottom: 1,
            }}
          >
            {data.length === 4 && (
              <Alert severity="success" sx={{ borderRadius: "20px" }}>
                <Typography variant="body1" align="center">
                  Resultados agregados correctamente
                </Typography>
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <TextField
              fullWidth
              value={timeDocent.description}
              type="number"
              id="time-docent"
              label="Tiempo con el docente"
              name="option"
              variant="outlined"
              onChange={(e) => {
                handleInputChange(e, setTimeDocent);
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                },
              }}
              error={error}
              helperText={error ? "No puede estar vacío" : ""}
              disabled={data.length === 4}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <TextField
              fullWidth
              value={intencityDocent.description}
              type="number"
              id="intensity-docent"
              label="Intensidad de uso"
              name="option"
              variant="outlined"
              onChange={(event) => {
                handleInputChange(event, setIntencityDocent);
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                },
              }}
              error={error}
              helperText={error ? "No puede estar vacío" : ""}
              disabled={data.length === 4}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              select
              id="frecuency-select"
              name="Frecuencia de uso"
              label="Frecuencia de uso"
              onChange={(event) => {
                handleInputChange(event, setFrecuencyDocent);
              }}
              value={frecuencyDocent.description}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                },
              }}
              error={error}
              disabled={data.length === 4}
            >
              {typesResult.frecuency.map((result, index) => (
                <MenuItem key={index} value={result.name}>
                  {result.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              select
              id="matery-select"
              name="Material digital facilitado"
              label="Material digital facilitado"
              onChange={(event) => {
                handleInputChange(event, setMateryDocent);
              }}
              value={materyDocent.description}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                },
              }}
              error={error}
              disabled={data.length === 4}
            >
              {typesResult.matery.map((result, index) => (
                <MenuItem key={index} value={result.name}>
                  {result.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack direction="row" spacing={2} justifyContent="center">
              {!isSaved ? (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  sx={{
                    backgroundColor: "#2e8b57",
                    "&:hover": {
                      backgroundColor: "#1d5737",
                    },
                  }}
                  onClick={handleAddResult}
                  disabled={data.length === 4}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeletedResult}
                  sx={{
                    backgroundColor: "#f44336",
                    "&:hover": {
                      backgroundColor: "#ba000d",
                    },
                    color: "white",
                  }}
                >
                  Eliminar
                </Button>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {data && data.length > 0 ? (
            data.map((results, index) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Card variant="outlined" sx={{ borderRadius: "20px" }}>
                  <CardContent>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        {getIconResult(results.option)}
                        <Typography variant="h6" ml={1}>
                          {results.option}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" color={"teal"}>
                      {results.description}
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
                      Agrega los resultados de la visita
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

ResultDocents.propTypes = propTypes;

export default ResultDocents;
