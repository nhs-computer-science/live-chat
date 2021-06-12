"use strict";
const settingsModalBtn = document.querySelector('.settings-modal-btn');
const adminToken = document.getElementById('admin-token');
const submitAdminTokenBtn = document.getElementById('submit-admin-token-btn');
const invalidAdminTokenAlert = document.getElementById('invalid-admin-token-alert');
const adminTokenSpinnerWrapper = document.getElementById('admin-token-spinner-wrapper');
const adminTokenPostRequestFinished = () => {
    setTimeout(() => {
        adminTokenSpinnerWrapper.style.display = 'none';
    });
};
settingsModalBtn.addEventListener('click', () => {
    setDisplay(invalidAdminTokenAlert, 'none');
});
submitAdminTokenBtn.addEventListener('click', () => {
    adminTokenSpinnerWrapper.style.display = 'block';
    POSTRequest('/home', { adminToken: adminToken.value.trim() }, (responseData) => {
        if (responseData === 'false') {
            adminTokenPostRequestFinished();
            setDisplay(invalidAdminTokenAlert, 'block');
        }
        else {
            adminTokenPostRequestFinished();
            window.location.reload();
        }
        setValue(adminToken, '');
    });
});
