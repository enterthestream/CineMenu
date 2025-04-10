export default async function fetchFilmData(title) {
  const apiKey = "7c83821c";

  let encodedTitle = encodeURIComponent(title);
  encodedTitle = encodedTitle.replace(/%20/g, "+");

  const apiURL = `https://www.omdbapi.com/?t=${encodedTitle}&apikey=${apiKey}`;

  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching film data");
    return null;
  }
}
