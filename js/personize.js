'use strict'

let uname = getCookie("name");
uname = uname.replace(/ .*/,"");

let navname = document.getElementById("nav-name");
let jumboname = document.getElementById("jumbo-name");

navname.innerText = (uname);
jumboname.innerText = (uname + ",");

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