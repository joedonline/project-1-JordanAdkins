"use strict";

const startingRow = document.getElementById("starting-row");
let thisName = getCookie("name");

getInfoForCards().then(data => {
  let cardcounter = 0;
  for (let i = 0; i < Object.keys(data).length; i++) {
    let convertedData = data[i];
    if(convertedData.pending && convertedData.ename == thisName ){
    buildCard(
      convertedData.reqid,
      convertedData.ename,
      convertedData.date,
      convertedData.preapproval,
      convertedData.amount,
      convertedData.rurl,
    );
    cardcounter++
    }
  }
  if(cardcounter === 0){
    let h1 = document.createElement("h1");
    h1.className = "col-xl-12 big-center-text";
    h1.innerText = "You have no pending requests"
    startingRow.appendChild(h1);
}
});

async function getInfoForCards() {
  const response = await fetch("http://Reimbursementportal-env.mm26zshb3w.us-east-1.elasticbeanstalk.com/trans");
  return await response.json();
}

function buildCard(reqid, name, date, preapproval, amount, url) {
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
  let a = document.createElement("a");
  a.href = "#";
  let i = document.createElement("i");
  i.className = "material-icons download-icon right-align";
  i.innerText = "save";
  i.href = url;

  startingRow.appendChild(coldiv);
  coldiv.appendChild(carddiv);
  carddiv.appendChild(img);
  carddiv.appendChild(bodydiv);
  bodydiv.appendChild(h5);
  bodydiv.appendChild(p1);
  bodydiv.appendChild(p2);
  bodydiv.appendChild(p3);
  bodydiv.appendChild(i);
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }