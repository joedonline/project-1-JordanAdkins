"use strict";
document.cookie.split(";").forEach(function(c) {
  document.cookie = c
    .replace(/^ +/, "")
    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
window.location.href = "index.html";
