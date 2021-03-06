"use strict";

const startingRow = document.getElementById("starting-row");

getInfoForCards().then(data => {
  for (let i = 0; i < Object.keys(data).length; i++) {
    let convertedData = data[i];
    if (!convertedData.pending) {
      buildCard(
        convertedData.reqid,
        convertedData.ename,
        convertedData.date,
        convertedData.preapproval,
        convertedData.amount,
        convertedData.rurl,
        convertedData.approvedBy
      );
    }
  }
});

async function getInfoForCards() {
  const response = await fetch(
    "http://Reimbursementportal-env.mm26zshb3w.us-east-1.elasticbeanstalk.com/trans"
  );
  return await response.json();
}

function buildCard(reqid, name, date, preapproval, amount, url, approvedBy) {
  let coldiv = document.createElement("div");
  coldiv.className = "col-lg-";
  let carddiv = document.createElement("div");
  carddiv.className = "card";
  carddiv.id = reqid;
  let img = document.createElement("img");
  img.className = "card-img-top img-fluid";
  if (url) {
    img.src = url;
  }
  img.alt = "Receipt Image";
  let bodydiv = document.createElement("div");
  bodydiv.className = "card-body";
  let h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = name;
  let p1 = document.createElement("p");
  p1.className = "card-text card-date";
  p1.innerText = "Date of Charge: " + date;
  let p2 = document.createElement("p");
  p2.className = "card-text card-preapproval-question";
  if (preapproval) {
    p2.innerText = "Pre-Approved? Yes";
  } else {
    p2.innerText = "Pre-Approved? No";
  }
  let p3 = document.createElement("p");
  p3.className = "card-text card-preapproval-amount";
  p3.innerText = "Reimbursement Amount: $" + amount;
  let i = document.createElement("i");
  let p4 = document.createElement("p");
  if (approvedBy != null) {
    p4.className = "card-text card-approval-manager";
    p4.innerText = "Approved By: " + approvedBy;
  } else {
    p4.className = "card-text card-denied";
    p4.innerText = "Denied";
  }
  i.className = "material-icons download-icon right-align";
  i.innerText = "save";

  startingRow.appendChild(coldiv);
  coldiv.appendChild(carddiv);
  carddiv.appendChild(img);
  carddiv.appendChild(bodydiv);
  bodydiv.appendChild(h5);
  bodydiv.appendChild(p1);
  bodydiv.appendChild(p2);
  bodydiv.appendChild(p3);
  bodydiv.appendChild(p4);
  bodydiv.appendChild(i);
}

function Search() {
  let input, filter, sr, card, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  sr = document.getElementById("starting-row");
  card = sr.getElementsByClassName("card");
  
  for (i = 0; i < card.length; i++) {
    a = card[i].getElementsByTagName("h5")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}