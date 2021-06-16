"use strict";
const showAdminTokenBtn = document.getElementById('show-admin-token-btn');
const adminT = document.getElementById('admin-token');
const adminModalBtn = document.querySelector('.admin-modal-btn');
const blacklistBtn = document.getElementById('blacklist-btn');
const toBeBlacklistedEmail = document.getElementById('to-be-blacklisted-email');
const blacklistFailedAlert = document.getElementById('blacklist-failed-alert');
const blacklistSpinnerWrapper = document.getElementById('blacklist-email-spinner-wrapper');
const blacklistEmailSettingsUpdated = document.getElementById('removed-blacklist-email-alert');
const blacklistEmailSettingsFailed = document.getElementById('removed-blacklist-email-fail-alert');
const removeAdminStatusBtn = document.getElementById('remove-admin-status-btn');
const removeBlacklistedEmailBtns = document.querySelectorAll('.remove-blacklisted-email-btn');
adminModalBtn.addEventListener('click', () => {
    setDisplay(adminT, 'none');
    setDisplay(blacklistFailedAlert, 'none');
    setDisplay(blacklistEmailSettingsFailed, 'none');
    setDisplay(blacklistEmailSettingsUpdated, 'none');
    showAdminTokenBtn.textContent = 'Show Admin Token';
});
removeAdminStatusBtn.addEventListener('click', () => {
    POSTRequest('/home', { removeAdminStatus: true }, (responseData) => {
        if (responseData === 'false') {
            return;
        }
        else {
            window.location.reload();
        }
    });
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
const hideBlacklistEmailSpinnerWrapper = (cb) => {
    setTimeout(() => {
        blacklistBtn.disabled = '';
        blacklistBtn.style.cursor = 'pointer';
        setDisplay(blacklistSpinnerWrapper, 'none');
        cb();
    }, 500);
};
removeBlacklistedEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.disabled = 'true';
        document.getElementById(btn.id).style.cursor = 'not-allowed';
        setDisplay(blacklistSpinnerWrapper, 'inline-block');
        POSTRequest('/home', { blacklistedEmailRemoval: btn.id }, (responseData) => {
            if (responseData === 'false') {
                hideBlacklistEmailSpinnerWrapper(() => {
                    setDisplay(blacklistEmailSettingsFailed, 'block');
                });
            }
            else {
                const blacklistedEmails = document.getElementById('blacklisted-emails-ul');
                hideBlacklistEmailSpinnerWrapper(() => {
                    setDisplay(blacklistEmailSettingsUpdated, 'block');
                    blacklistedEmails.removeChild(btn.parentElement);
                });
            }
        });
    });
});
blacklistBtn.addEventListener('click', () => {
    if (toBeBlacklistedEmail.value.trim() === '') {
        return;
    }
    setDisplay(blacklistSpinnerWrapper, 'inline-block');
    blacklistBtn.disabled = 'true';
    blacklistBtn.style.cursor = 'not-allowed';
    POSTRequest('/home', { blacklistedEmail: toBeBlacklistedEmail.value.trim() }, (responseData) => {
        if (responseData === 'false') {
            hideBlacklistEmailSpinnerWrapper(() => {
                setDisplay(blacklistFailedAlert, 'block');
            });
        }
        else {
            hideBlacklistEmailSpinnerWrapper(() => {
                location.reload();
            });
        }
    });
});
