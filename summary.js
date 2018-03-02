// Get current URL
const currentURL = location.search;
// Fix current URL by replacing "+" with " "
const fixedURL = currentURL.replace(/\+/g, " ");
// Loop through the query string and create an array based on name and value
const data = {};
if (fixedURL)
  fixedURL
    .substr(1)
    .split("&")
    .forEach(item => {
      var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
      (data[k] = data[k] || []).push(v);
    });
// Create a new table
const table = document.createElement("table");
table.className += "summary-table";
// Add the table header
const tr = document.createElement("tr");
const leftRow = document.createElement("td");
tr.appendChild(leftRow);
const rightRow = document.createElement("td");
tr.appendChild(rightRow);
table.appendChild(tr);
// Add the table rows
for (const name in data) {
  const value = data[name];
  const tr = document.createElement("tr");
  const leftRow = document.createElement("td");
  leftRow.innerHTML = name + ":";
  tr.appendChild(leftRow);
  const rightRow = document.createElement("td");
  rightRow.innerHTML = value;
  tr.appendChild(rightRow);
  table.appendChild(tr);
}
// Add the created table to the HTML page
document.querySelector(".wrapper").appendChild(table);
