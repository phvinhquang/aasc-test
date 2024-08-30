const listContainer = document.getElementById("list-container");
const loadingEl = document.getElementById("loading");
const btnRefresh = document.getElementById("btn-refresh");
const btnViewEmployee = document.getElementById("btn-view-employee");

let listItems;
let chosenListItem;
let modalWrap = null;

const APP_ID = "local.66cee576c9dec5.13074353";

async function fetchData() {
  // Show loading state
  loadingEl.innerHTML = `<p>Fetching data...</p>`;
  listContainer.innerHTML = "";

  try {
    // Get token from API
    const tokenResquest = await fetch(
      "https://bx-oauth2.aasc.com.vn/bx/oauth2_token/" + APP_ID
    );
    const { token } = await tokenResquest.json();

    // Get users list from API
    const usersRequest = await fetch(
      " https://b24-j0vrp3.bitrix24.vn/rest/user.get.json?auth=" + token
    );
    const data = await usersRequest.json();

    loadingEl.innerHTML = "";

    // Render list
    renderList(data.result);
  } catch (err) {
    alert(err.message);
  }
}

function renderList(data) {
  // Render item
  data.forEach((item) => {
    const html = `
      <li data-id=${item.ID} class="list-item">${item.LAST_NAME} ${item.NAME}</li>
    `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });

  // Add event listener to list items
  listItems = document.querySelectorAll(".list-item");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Add active class
      document.querySelector(".active")?.classList.remove("active");
      item.classList.add("active");

      // Update chosen item
      const itemId = item.getAttribute("data-id");

      chosenListItem = data.find((item) => item.ID === itemId);
    });
  });
}

const showModal = (employee) => {
  if (modalWrap !== null) modalWrap.remove();
  if (!employee) return alert("Choose a employee to see deatail");

  console.log("info to show", employee);
  let gender;
  if (!employee.PERSONAL_GENDER) gender = "unknown";
  else if (employee.PERSONAL_GENDER === "F") gender = "Female";
  else gender = "Male";
  const birthday = new Date(employee.PERSONAL_BIRTHDAY);
  const onboardDate = new Date(employee.UF_EMPLOYMENT_DATE);

  modalWrap = document.createElement("div");
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">Employee's Infomation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Name: ${employee.LAST_NAME} ${
    employee.SECOND_NAME ? employee.SECOND_NAME : ""
  } ${employee.NAME}</p>
            <p>Birthday: ${birthday.toLocaleDateString("de")}</p>
            <p>Gender: ${gender}</p>
            <p>Phone number: ${
              employee.PERSONAL_MOBILE ? employee.PERSONAL_MOBILE : "unknown"
            }</p>
            <p>City: ${employee.PERSONAL_CITY}</p>
            <p>Onboard date: ${onboardDate.toLocaleDateString("de")}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);

  var modal = new bootstrap.Modal(modalWrap.querySelector(".modal"));
  modal.show();
};

btnRefresh.addEventListener("click", fetchData);
btnViewEmployee.addEventListener("click", () => showModal(chosenListItem));

fetchData();
