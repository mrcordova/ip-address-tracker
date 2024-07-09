const searchBtn = document.querySelector(".search-btn");
const input = document.getElementById("search");
const infoDiv = document.querySelector(".info-container");
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
function abbrState(input, to) {
  var states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  if (to == "abbr") {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == "name") {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
}
searchBtn.addEventListener("click", async (e) => {
  const response = await fetch(
    `${geoIpify}apiKey=${IP_API_KEY}&ipAddress=${input.value}&domain=${input.value}`
  );

  const {
    ip,
    isp,
    location: { country, region, city, lat, lng, postalCode, timezone },
  } = await response.json();

  const [ipEle, locationEle, timezoneEl, ispEle] = infoDiv.children;
  ipEle.children[1].textContent = `${ip || "N/A"}`;
  locationEle.children[1].textContent = `${city}, ${abbrState(
    region,
    "abbr"
  )} ${postalCode}`;
  timezoneEl.children[1].textContent = `UTC ${timezone}`;
  ispEle.children[1].textContent = `${isp.slice(0, isp.indexOf("(")) || "N/A"}`;
});
