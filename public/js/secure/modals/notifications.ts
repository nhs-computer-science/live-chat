const notificationsModalBtn: HTMLElement = document.querySelector(
  '.notifications-modal-btn'
)!;

const receiveAllNotificationsBtn: HTMLElement = document.getElementById(
  'receive-all-notifications-btn'
)!;
const enableNotificationsBtns: NodeListOf<Element> = document.querySelectorAll(
  '.enable-notifications-btn'
)!;
const saveChangesBtn: HTMLElement =
  document.querySelector('.save-changes-btn')!;

const receiveNotificationsSpinnerWrapper = document.getElementById(
  'receive-notifications-spinner-wrapper'
)!;

const settingsUpdatedAlert: HTMLElement = document.getElementById(
  'settings-updated-alert'
)!;
const settingsFailedAlert: HTMLElement = document.getElementById(
  'settings-failed-alert'
)!;

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
  disableSaveChangesBtn();
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

const changeBtnAppearence = (btn: Element, d?: string): void => {
  if (d === 'enable') {
    console.log('enabled');
    setTextContent(btn, 'Enable');
    changeClass(btn, 'btn-success', true);
    changeClass(btn, 'btn-danger', false);
    return;
  } else if (d === 'disable') {
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
    saveChangesBtn.disabled = '';
    saveChangesBtn.style.cursor = 'pointer';
    hideSettingsUpdatedAlert();
    changeBtnAppearence(btn);
  });
});

receiveAllNotificationsBtn.addEventListener('click', (): void => {
  hideSettingsUpdatedAlert();

  if (receiveAllNotificationsBtn.textContent === 'Enable') {
    accessBtns((btn: Element): void => changeBtnAppearence(btn, 'disable'));
    setTextContent(receiveAllNotificationsBtn, 'Disable');
    changeClass(receiveAllNotificationsBtn, 'btn-success', false);
    changeClass(receiveAllNotificationsBtn, 'btn-danger', true);
  } else {
    accessBtns((btn: Element): void => changeBtnAppearence(btn, 'enable'));
    setTextContent(receiveAllNotificationsBtn, 'Enable');
    changeClass(receiveAllNotificationsBtn, 'btn-danger', false);
    changeClass(receiveAllNotificationsBtn, 'btn-success', true);
  }
});

const disableSaveChangesBtn = (): void => {
  saveChangesBtn.disabled = 'true';
  saveChangesBtn.style.cursor = 'not-allowed';
};

saveChangesBtn.addEventListener('click', (): void => {
  accessBtns((btn: Element): void => {
    if (btn.textContent === 'Disable') {
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
      setVisibility(receiveNotificationsSpinnerWrapper, false);
    }, 500);
  };
  if (
    settingsUpdatedAlert.style.display !== 'block' &&
    settingsFailedAlert.style.display !== 'block'
  ) {
    setVisibility(receiveNotificationsSpinnerWrapper, true);
    POSTRequest(
      '/home',
      { notificationEmails: emails },
      (responseData: any): void => {
        if (responseData === 'false') {
          postRequestFinished(settingsUpdatedAlert);
        } else {
          postRequestFinished(settingsUpdatedAlert);
        }
      }
    );
    disableSaveChangesBtn();
  } else {
    alert('Make sure to change your settings before saving them!');
  }
});
