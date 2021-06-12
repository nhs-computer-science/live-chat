"use strict";
const showAdminTokenBtn = document.getElementById('show-admin-token-btn');
const adminT = document.getElementById('admin-token');
const adminModalBtn = document.querySelector('.admin-modal-btn');
adminModalBtn.addEventListener('click', () => {
    setDisplay(adminT, 'none');
    showAdminTokenBtn.textContent = 'Show Admin Token';
});
showAdminTokenBtn.addEventListener('click', () => {
    if (showAdminTokenBtn.textContent === 'Show Admin Token') {
        adminT.style.display = 'block';
        showAdminTokenBtn.textContent = 'Hide Admin Token';
    }
    else {
        adminT.style.display = 'none';
        showAdminTokenBtn.textContent = 'Show Admin Token';
    }
});
