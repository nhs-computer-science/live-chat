"use strict";
const email = document.getElementById('email');
const loginBtn = document.getElementById('login-btn');
email.value = window.sessionStorage.getItem('email') || '';
loginBtn.addEventListener('click', () => {
    window.sessionStorage.setItem('email', email.value.trim());
});
