import axios from "axios";

export async function getApiData(context, url) {
  const dataApi = `${url}context=${context}`;

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
