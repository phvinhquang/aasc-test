const DUMMY_DATA = [
  { id: 1, name: "Quang" },
  { id: 2, name: "Nga" },
  { id: 3, name: "Quang2" },
  { id: 4, name: "My" },
];

const axios = require("axios");

const listContainer = document.getElementById("list-container");
const btnRefresh = document.getElementById("btn-refresh");
const btnViewEmployee = document.getElementById("btn-view-employee");

const APP_ID = "local.66cee576c9dec5.13074353";

async function init() {
  // Get token from API
  const tokenResquest = await fetch(
    `http://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66cee576c9dec5.13074353`
  );
  // // const { token } = await tokenResquest.json();
  // const data = await tokenResquest.json();
  // console.log(data);
  // console.log(token);

  // const res = await axios.get(
  //   " https://b24-j0vrp3.bitrix24.vn/rest/user.get.json?ID=1&auth=1fb5d0660070cb350070cb230000000140380789c18fcf7848f444e116c37a55e21ade"
  // );

  // console.log("haha", res);

  // Get users list from API
  // Render list
  renderList();
}

function renderList(data) {
  listContainer.innerHTML = "";

  DUMMY_DATA.forEach((item) => {
    const html = `
      <li class="mt-1">${item.name}</li>
    `;

    listContainer.insertAdjacentHTML("beforeend", html);
  });
}

init();
