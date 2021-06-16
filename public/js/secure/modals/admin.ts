const showAdminTokenBtn: HTMLElement = document.getElementById(
  'show-admin-token-btn'
)!;
const adminT: HTMLElement = document.getElementById('admin-token')!;
const adminModalBtn: HTMLElement = document.querySelector('.admin-modal-btn')!;
const blacklistBtn: HTMLElement = document.getElementById('blacklist-btn')!;
const toBeBlacklistedEmail: HTMLElement = document.getElementById(
  'to-be-blacklisted-email'
)!;
const blacklistFailedAlert: HTMLElement = document.getElementById(
  'blacklist-failed-alert'
)!;
const blacklistSpinnerWrapper: HTMLElement = document.getElementById(
  'blacklist-email-spinner-wrapper'
)!;
const blacklistEmailSettingsUpdated: HTMLElement = document.getElementById(
  'removed-blacklist-email-alert'
)!;
const blacklistEmailSettingsFailed: HTMLElement = document.getElementById(
  'removed-blacklist-email-fail-alert'
)!;
const removeAdminStatusBtn: HTMLElement = document.getElementById(
  'remove-admin-status-btn'
)!;
const removeBlacklistedEmailBtns: NodeListOf<Element> =
  document.querySelectorAll('.remove-blacklisted-email-btn');

adminModalBtn.addEventListener('click', () => {
  setDisplay(adminT, 'none');
  setDisplay(blacklistFailedAlert, 'none');
  setDisplay(blacklistEmailSettingsFailed, 'none');
  setDisplay(blacklistEmailSettingsUpdated, 'none');
  showAdminTokenBtn.textContent = 'Show Admin Token';
});

removeAdminStatusBtn.addEventListener('click', (): void => {
  POSTRequest(
    '/home',
    { removeAdminStatus: true },
    (responseData: any): void => {
      if (responseData === 'false') {
        return;
      } else {
        window.location.reload();
      }
    }
  );
});

showAdminTokenBtn.addEventListener('click', (): void => {
  if (showAdminTokenBtn.textContent === 'Show Admin Token') {
    adminT.style.display = 'block';
    showAdminTokenBtn.textContent = 'Hide Admin Token';
  } else {
    adminT.style.display = 'none';
    showAdminTokenBtn.textContent = 'Show Admin Token';
  }
});

const hideBlacklistEmailSpinnerWrapper = (cb: () => void): void => {
  setTimeout((): void => {
    blacklistBtn.disabled = '';
    blacklistBtn.style.cursor = 'pointer';
    setDisplay(blacklistSpinnerWrapper, 'none');
    cb();
  }, 500);
};

removeBlacklistedEmailBtns.forEach((btn: Element): void => {
  btn.addEventListener('click', (): void => {
    btn.disabled = 'true';
    document.getElementById(btn.id)!.style.cursor = 'not-allowed';
    setDisplay(blacklistSpinnerWrapper, 'inline-block');
    POSTRequest(
      '/home',
      { blacklistedEmailRemoval: btn.id },
      (responseData: any): void => {
        if (responseData === 'false') {
          hideBlacklistEmailSpinnerWrapper((): void => {
            setDisplay(blacklistEmailSettingsFailed, 'block');
          });
        } else {
          const blacklistedEmails: HTMLElement = document.getElementById(
            'blacklisted-emails-ul'
          )!;
          hideBlacklistEmailSpinnerWrapper((): void => {
            setDisplay(blacklistEmailSettingsUpdated, 'block');
            blacklistedEmails.removeChild(btn.parentElement!);
          });
        }
      }
    );
  });
});

blacklistBtn.addEventListener('click', (): void => {
  if (toBeBlacklistedEmail.value.trim() === '') {
    return;
  }

  setDisplay(blacklistSpinnerWrapper, 'inline-block');
  blacklistBtn.disabled = 'true';
  blacklistBtn.style.cursor = 'not-allowed';
  POSTRequest(
    '/home',
    { blacklistedEmail: toBeBlacklistedEmail.value.trim() },
    (responseData: any): void => {
      if (responseData === 'false') {
        hideBlacklistEmailSpinnerWrapper((): void => {
          setDisplay(blacklistFailedAlert, 'block');
        });
      } else {
        hideBlacklistEmailSpinnerWrapper((): void => {
          location.reload();
        });
      }
    }
  );
});
