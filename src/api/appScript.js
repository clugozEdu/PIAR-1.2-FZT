import axios from "axios";

let baseUrl =
  "https://script.google.com/macros/s/AKfycby8v0VM6rmpzOzKp7VOel6C8ys_NK-4-YzE3rnItXHYuxgxET5K8WckCkIQQBC-Epx8/exec?";

let urlAPITask =
  "https://script.google.com/macros/s/AKfycbygoVG4SXUhlL5D-7GJASOa6uw-DZOnIKKezz2nLFckfaInosjiqk-OJMb4LwkyRgrDcQ/exec?";

export async function getApiData(context) {
  const dataApi = `${baseUrl}context=${context}`;

  try {
    const response = await axios.get(dataApi);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function postApiData(data) {
  const URL =
    "https://script.google.com/macros/s/AKfycbyCRMoa1JJ36wezOjv9i5Otu6IuTLExiWsqRQzXTrHxI82k2Os0n4hdxIiJ_9-4pArBQQ/exec";

  try {
    const response = await axios.post(URL, data, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getTasks = async (advisor_id) => {
  const urlTmp = `${urlAPITask}context=getTask&advisor_id=${advisor_id}`;

  try {
    const response = await axios.get(urlTmp);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
