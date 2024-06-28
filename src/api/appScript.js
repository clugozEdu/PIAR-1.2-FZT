import axios from "axios";

let baseUrl =
  "https://script.google.com/macros/s/AKfycby8v0VM6rmpzOzKp7VOel6C8ys_NK-4-YzE3rnItXHYuxgxET5K8WckCkIQQBC-Epx8/exec?";

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
