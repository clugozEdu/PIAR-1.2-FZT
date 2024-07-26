import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import IndicatorTable from "../../layout/IndicatorsTable";

const RubricTable = ({ indicators, context, currentDocent }) => {
  const [data, setData] = useState([]);
  const [indicatorsExist, setIndicatorsExist] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const { values } = useFormikContext();

  const getInitialRubric = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent[context] : [];
  };

  useEffect(() => {
    setInitialData(getInitialRubric(currentDocent));
  }, [currentDocent, values.tableDocents]);

  useEffect(() => {
    const hasInitialData = initialData?.length > 0;
    setIndicatorsExist(!hasInitialData);
    setData(hasInitialData ? initialData : indicators);
  }, [initialData, indicators]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{
            paddingBottom: 0,
          }}
        >
          Haga clic en las celdas de la columna Verde, Amarillo o Rojo para
          establecer el estado.
        </Typography>
      </Grid>

      <IndicatorTable
        data={data}
        setData={setData}
        indicatorsExist={indicatorsExist}
        context={context}
        currentDocent={currentDocent}
        showDescription={false}
      />
    </Grid>
  );
};

RubricTable.propTypes = {
  indicators: PropTypes.array.isRequired,
  context: PropTypes.oneOf(["saber", "saberHacer", "saberSer"]).isRequired,
  currentDocent: PropTypes.object.isRequired,
};

export default RubricTable;
