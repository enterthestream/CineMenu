import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export default async function fetchFilmData(title) {
  const apiKey = process.env.OMDB_API_KEY;

  let encodedTitle = encodeURIComponent(title);
  encodedTitle = encodedTitle.replace(/%20/g, "+");

  const apiURL = `https://www.omdbapi.com/?t=${encodedTitle}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiURL);

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching film data");
    return null;
  }
}

fetchFilmData("After Hours");
