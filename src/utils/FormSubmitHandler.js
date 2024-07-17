import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { postApiData } from "../api/appScript.js";
import "../App.css";

const MySwal = withReactContent(Swal);

const formSubmitHandler = async (
  values,
  { setSubmitting, resetForm },
  setSubmitStatus
) => {
  const dataSend = {
    context: "savePlanning",
    content: {
      ...values,
    },
  };

  console.log(dataSend);

  const result = await MySwal.fire({
    title: "¿Desea enviar la información?",
    text: "¡No podrá revertir esta acción!",
    icon: "warning",
    iconColor: "#000",
    showCancelButton: true,
    confirmButtonColor: "#0d6e6e",
    cancelButtonColor: "#ff3d3d",
    confirmButtonText: "Sí, enviar!",
    cancelButtonText: "No, cancelar!",
  });

  if (result.isConfirmed) {
    setSubmitting(true); // Set submitting to true when the user confirms
    try {
      const response = await postApiData(dataSend);

      if (response && response.status) {
        MySwal.fire({
          title: "¡Excelente!",
          text: `Registro guardado con éxito! ID de la visita: ${response.id_visit}`,
          icon: "success",
          timer: 4000,
          timerProgressBar: true,
        });
        resetForm();
        setSubmitStatus("success"); // CALLBACK FOR RESET STEPS IN FORMPLANNING
      } else {
        MySwal.fire({
          title: "¡Error!",
          text: "Error al guardar el registro, por favor intente de nuevo",
          icon: "error",
          timer: 4000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      MySwal.fire({
        title: "¡Error!",
        text: "Error al guardar el registro, por favor intente de nuevo",
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    } finally {
      setSubmitting(false); // Ensure submitting is set to false after the process is complete
    }
  } else {
    setSubmitting(false); // Set submitting to false if the user cancels
  }
};

export default formSubmitHandler;
