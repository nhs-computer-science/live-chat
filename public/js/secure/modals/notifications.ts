const notificationsModalBtn = document.querySelector(
  '.notifications-modal-btn'
)!;

const receiveAllNotificationsBtn = document.getElementById(
  'receive-all-notifications-btn'
)!;
const enableNotificationsBtns = document.querySelectorAll(
  '.enable-notifications-btn'
)!;
const saveChangesBtn = document.getElementById('save-changes-btn')!;
const loadingSpinnerWrapper = document.getElementById(
  'loading-spinner-wrapper'
)!;
const settingsUpdatedAlert = document.getElementById('settings-updated-alert')!;
const settingsFailedAlert = document.getElementById('settings-failed-alert')!;

const emails: string[] = [];

const spliceEmails = (btn: Element): void => {
  emails.splice(emails.indexOf(btn.id, 1));
};

const addEmail = (btn: Element): void => {
  emails.push(btn.id);
};

const hideSettingsUpdatedAlert = (): void => {
  setDisplay(settingsUpdatedAlert, 'none');
  setDisplay(settingsFailedAlert, 'none');
};

notificationsModalBtn.addEventListener('click', (): void => {
  hideSettingsUpdatedAlert();

  if (sessionStorage.getItem(receiveAllNotificationsBtn.id)! === 'btn-danger') {
    setTextContent(receiveAllNotificationsBtn, 'Disable');
    changeClass(receiveAllNotificationsBtn, 'btn-danger', true);
    changeClass(receiveAllNotificationsBtn, 'btn-success', false);
  } else {
    setTextContent(receiveAllNotificationsBtn, 'Enable');
    changeClass(receiveAllNotificationsBtn, 'btn-danger', false);
    changeClass(receiveAllNotificationsBtn, 'btn-success', true);
  }

  accessBtns((btn: Element): void => {
    if (sessionStorage.getItem(btn.id)! === 'btn-danger') {
      setTextContent(btn, 'Disable');
      changeClass(btn, 'btn-danger', true);
      changeClass(btn, 'btn-success', false);
    } else {
      setTextContent(btn, 'Enable');
      changeClass(btn, 'btn-danger', false);
      changeClass(btn, 'btn-success', true);
    }
  });
});

const changeBtnAppearence = (btn: Element): void => {
  if (btn.textContent === 'Enable') {
    setTextContent(btn, 'Disable');
    changeClass(btn, 'btn-success', false);
    changeClass(btn, 'btn-danger', true);
  } else {
    setTextContent(btn, 'Enable');
    changeClass(btn, 'btn-danger', false);
    changeClass(btn, 'btn-success', true);
  }
};

const accessBtns = (cb: (btn: Element) => void): void => {
  enableNotificationsBtns.forEach((btn: Element): void => {
    cb(btn);
  });
};

accessBtns((btn: Element): void => {
  btn.addEventListener('click', (): void => {
    hideSettingsUpdatedAlert();
    changeBtnAppearence(btn);
  });
});

receiveAllNotificationsBtn.addEventListener('click', (): void => {
  hideSettingsUpdatedAlert();

  accessBtns((btn: Element): void => changeBtnAppearence(btn));

  if (receiveAllNotificationsBtn.textContent === 'Enable') {
    setTextContent(receiveAllNotificationsBtn, 'Disable');
    changeClass(receiveAllNotificationsBtn, 'btn-success', false);
    changeClass(receiveAllNotificationsBtn, 'btn-danger', true);
  } else {
    setTextContent(receiveAllNotificationsBtn, 'Enable');
    changeClass(receiveAllNotificationsBtn, 'btn-danger', false);
    changeClass(receiveAllNotificationsBtn, 'btn-success', true);
  }
});

saveChangesBtn.addEventListener('click', (): void => {
  accessBtns((btn: Element): void => {
    if (btn.textContent === 'Enable') {
      addEmail(btn);
      sessionStorage.setItem(btn.id, 'btn-success');
    } else {
      spliceEmails(btn);
      sessionStorage.setItem(btn.id, 'btn-danger');
    }
  });

  if (receiveAllNotificationsBtn.textContent === 'Enable') {
    sessionStorage.setItem(receiveAllNotificationsBtn.id, 'btn-success');
  } else {
    sessionStorage.setItem(receiveAllNotificationsBtn.id, 'btn-danger');
  }

  const postRequestFinished = (element: HTMLElement): void => {
    setTimeout((): void => {
      setDisplay(element, 'block');
      setVisibility(loadingSpinnerWrapper, false);
    }, 500);
  };
  if (
    settingsUpdatedAlert.style.display !== 'block' &&
    settingsFailedAlert.style.display !== 'block'
  ) {
    setVisibility(loadingSpinnerWrapper, true);
    POSTRequest(
      '/home',
      { notificationEmails: emails },
      (responseData): void => {
        if (!responseData) {
          postRequestFinished(settingsUpdatedAlert);
        } else {
          postRequestFinished(settingsUpdatedAlert);
        }
      }
    );
  } else {
    alert('Make sure to change your settings before saving them!');
  }
});
