"use strict";

let profilePic = document.getElementById("profile-picture");
let employeeId = document.getElementById("eid");
let employeeName = document.getElementById("ename");
let employeeTeam = document.getElementById("eteam");
let employeeRole = document.getElementById("erole");
let employeeEmail = document.getElementById("eemail");
let employeeAddress = document.getElementById("eaddress");
let employeePhone = document.getElementById("ephone");
let jumbotronName = document.getElementById("jumbo-name");
let navbarName = document.getElementById("nav-name");
let employeeModel = {};
var cookieValue = document.cookie.replace(
  /(?:(?:^|.*;\s*)chk\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
let auth = { id: "" };
auth.id = cookieValue;
getPageData().then(data => {
    employeeModel.id = data.eId;
    employeeModel.name = data.ename;
    employeeModel.team = data.eteam;
    employeeModel.role = data.erole;
    employeeModel.email = data.eemail;
    employeeModel.address = data.eaddress;
    employeeModel.phone = data.ephone;
    employeeModel.ismanager = data.ismanager;
    employeeModel.eimageurl = data.eimageurl;
    employeeId.innerText = employeeModel.id;
    employeeName.innerText = employeeModel.name;
    employeeTeam.innerText = employeeModel.team;
    employeeRole.innerText = employeeModel.role;
    employeeEmail.innerText = employeeModel.email;
    employeeAddress.innerText = employeeModel.address;
    employeePhone.innerText = employeeModel.phone;
    document.cookie = "name="+employeeModel.name;
    document.cookie = "team="+employeeModel.team;
    let firstName = employeeModel.name.replace(/ .*/,"");
    jumbotronName.innerText = (firstName + ",");
    navbarName.innerText = firstName;
    if(employeeModel.ismanager){
      document.cookie = "bosu=t"
    }
    if(employeeModel.eimageurl != null){
      profilePic.src = employeeModel.eimageurl;
    } else{
      profilePic.src = "/content/defaultuser.svg"
    }
    addScript ("/js/mvis.js");

})

async function getPageData() {
  const response = await fetch(
    "http://Reimbursementportal-env.mm26zshb3w.us-east-1.elasticbeanstalk.com/employeeinfo",
    {
      method: "POST",
      credintials: "include",
      body: JSON.stringify(auth)
    }
  );
  return await response.json();
}

function addScript( src ) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  document.body.appendChild( s );
}

document.getElementById("update-info").addEventListener('click',(e)=>{
  updateInformation();
  setTimeout(function (){
    location.reload();
  },2000)
})

async function updateInformation(){
  let newName = document.getElementById("modal-name");
  let newEmail = document.getElementById("modal-email");
  let newAddress = document.getElementById("modal-address");
  let newPhone = document.getElementById("modal-phone");

  let newPerson = {name: "", email: "", address: "", phone: "", id: ""};
  newPerson.name = newName.value;
  newPerson.email = newEmail.value;
  newPerson.phone = newPhone.value;
  newPerson.address = newAddress.value;
  newPerson.id = auth.id;

  const response = await fetch("http://Reimbursementportal-env.mm26zshb3w.us-east-1.elasticbeanstalk.com/update", {
    method: "POST",
    body: JSON.stringify(newPerson)
  });
  setTimeout(function (){
  },3000)
}