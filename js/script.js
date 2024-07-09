const searchBtn = document.querySelector(".search-btn");
const input = document.getElementById("search");
let map = L.map("map", {
  zoomControl: false,
  attributionControl: false,
}).setView([51.505, -0.09], 13);

const IP_API_KEY = "at_8ZsTEBLk0rIwuEVytt8BN4osGzwUQ";
const geoIpify = "https://geo.ipify.org/api/v2/country,city?";

let icon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [46, 56], // size of the icon

  iconAnchor: [26, 55], // point of the icon which will correspond to marker's location

  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09], { icon }).addTo(map);

searchBtn.addEventListener("click", async (e) => {
  const response = await fetch(
    `${geoIpify}apiKey=${IP_API_KEY}&ipAddress=${input.value}`
  );

  const ipObj = await response.json();
  console.info(ipObj);
});
