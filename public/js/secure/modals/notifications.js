"use strict";
const notificationsModalBtn = document.querySelector('.notifications-modal-btn');
const receiveAllNotificationsBtn = document.getElementById('receive-all-notifications-btn');
const enableNotificationsBtns = document.querySelectorAll('.enable-notifications-btn');
const saveChangesBtn = document.querySelector('.save-changes-btn');
const receiveNotificationsSpinnerWrapper = document.getElementById('receive-notifications-spinner-wrapper');
const settingsUpdatedAlert = document.getElementById('settings-updated-alert');
const settingsFailedAlert = document.getElementById('settings-failed-alert');
const emails = [];
const spliceEmails = (btn) => {
    emails.splice(emails.indexOf(btn.id, 1));
};
const addEmail = (btn) => {
    emails.push(btn.id);
};
const hideSettingsUpdatedAlert = () => {
    setDisplay(settingsUpdatedAlert, 'none');
    setDisplay(settingsFailedAlert, 'none');
};
notificationsModalBtn.addEventListener('click', () => {
    disableSaveChangesBtn();
    hideSettingsUpdatedAlert();
    if (sessionStorage.getItem(receiveAllNotificationsBtn.id) === 'btn-danger') {
        setTextContent(receiveAllNotificationsBtn, 'Disable');
        changeClass(receiveAllNotificationsBtn, 'btn-danger', true);
        changeClass(receiveAllNotificationsBtn, 'btn-success', false);
    }
    else {
        setTextContent(receiveAllNotificationsBtn, 'Enable');
        changeClass(receiveAllNotificationsBtn, 'btn-danger', false);
        changeClass(receiveAllNotificationsBtn, 'btn-success', true);
    }
    accessBtns((btn) => {
        if (sessionStorage.getItem(btn.id) === 'btn-danger') {
            setTextContent(btn, 'Disable');
            changeClass(btn, 'btn-danger', true);
            changeClass(btn, 'btn-success', false);
        }
        else {
            setTextContent(btn, 'Enable');
            changeClass(btn, 'btn-danger', false);
            changeClass(btn, 'btn-success', true);
        }
    });
});
const changeBtnAppearence = (btn, d) => {
    if (d === 'enable') {
        console.log('enabled');
        setTextContent(btn, 'Enable');
        changeClass(btn, 'btn-success', true);
        changeClass(btn, 'btn-danger', false);
        return;
    }
    else if (d === 'disable') {
        console.log('disabled');
        setTextContent(btn, 'Disable');
        changeClass(btn, 'btn-danger', true);
        changeClass(btn, 'btn-success', false);
        return;
    }
    if (btn.textContent === 'Enable') {
        setTextContent(btn, 'Disable');
        changeClass(btn, 'btn-success', false);
        changeClass(btn, 'btn-danger', true);
    }
    else {
        setTextContent(btn, 'Enable');
        changeClass(btn, 'btn-danger', false);
        changeClass(btn, 'btn-success', true);
    }
};
const accessBtns = (cb) => {
    enableNotificationsBtns.forEach((btn) => {
        cb(btn);
    });
};
accessBtns((btn) => {
    btn.addEventListener('click', () => {
        saveChangesBtn.disabled = '';
        saveChangesBtn.style.cursor = 'pointer';
        hideSettingsUpdatedAlert();
        changeBtnAppearence(btn);
    });
});
receiveAllNotificationsBtn.addEventListener('click', () => {
    hideSettingsUpdatedAlert();
    if (receiveAllNotificationsBtn.textContent === 'Enable') {
        accessBtns((btn) => changeBtnAppearence(btn, 'disable'));
        setTextContent(receiveAllNotificationsBtn, 'Disable');
        changeClass(receiveAllNotificationsBtn, 'btn-success', false);
        changeClass(receiveAllNotificationsBtn, 'btn-danger', true);
    }
    else {
        accessBtns((btn) => changeBtnAppearence(btn, 'enable'));
        setTextContent(receiveAllNotificationsBtn, 'Enable');
        changeClass(receiveAllNotificationsBtn, 'btn-danger', false);
        changeClass(receiveAllNotificationsBtn, 'btn-success', true);
    }
});
const disableSaveChangesBtn = () => {
    saveChangesBtn.disabled = 'true';
    saveChangesBtn.style.cursor = 'not-allowed';
};
saveChangesBtn.addEventListener('click', () => {
    accessBtns((btn) => {
        if (btn.textContent === 'Disable') {
            addEmail(btn);
            sessionStorage.setItem(btn.id, 'btn-success');
        }
        else {
            spliceEmails(btn);
            sessionStorage.setItem(btn.id, 'btn-danger');
        }
    });
    if (receiveAllNotificationsBtn.textContent === 'Enable') {
        sessionStorage.setItem(receiveAllNotificationsBtn.id, 'btn-success');
    }
    else {
        sessionStorage.setItem(receiveAllNotificationsBtn.id, 'btn-danger');
    }
    const postRequestFinished = (element) => {
        setTimeout(() => {
            setDisplay(element, 'block');
            setVisibility(receiveNotificationsSpinnerWrapper, false);
        }, 500);
    };
    if (settingsUpdatedAlert.style.display !== 'block' &&
        settingsFailedAlert.style.display !== 'block') {
        setVisibility(receiveNotificationsSpinnerWrapper, true);
        POSTRequest('/home', { notificationEmails: emails }, (responseData) => {
            if (responseData === 'false') {
                postRequestFinished(settingsUpdatedAlert);
            }
            else {
                postRequestFinished(settingsUpdatedAlert);
            }
        });
        disableSaveChangesBtn();
    }
    else {
        alert('Make sure to change your settings before saving them!');
    }
});
