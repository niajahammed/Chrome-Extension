let allLinks = [];

const input = document.getElementById("input");

const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");

const list = document.getElementById("list");

let getLinksFromStorage = JSON.parse(localStorage.getItem("links"));

if (getLinksFromStorage) {
  allLinks = getLinksFromStorage;
  renderArr(allLinks);
}

function renderArr (arr) {
  list.innerHTML = "";
  arr.forEach (item => {
    list.innerHTML += `
      <li><a href="${item}" class="link" target="_blank">${item}</a></li>
    `;
  })
}

inputBtn.addEventListener("click", () => {
  let links = input.value;

  allLinks.push(links);
  console.log(allLinks);

  input.value = '';

  localStorage.setItem("links", JSON.stringify(allLinks));

  renderArr(allLinks);
});


// for delete 
deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  allLinks = [];
  renderArr(allLinks);
});


// for save current tab :
tabBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let activeTab = tabs[0].url;
    allLinks.push(activeTab);
    localStorage.setItem("links", JSON.stringify(allLinks));
    renderArr(allLinks);
  }); 
});