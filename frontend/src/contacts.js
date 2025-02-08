const url =
  "https://api.apollo.io/api/v1/mixed_people/search?person_titles[]=Investment%20Banking&person_locations[]=United%20States";
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "x-api-key": "API_KEY",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
