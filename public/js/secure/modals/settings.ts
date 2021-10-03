const settingsModalBtn: HTMLElement = document.querySelector(
  '.settings-modal-btn'
)!;
const adminToken: HTMLElement = document.getElementById('admin-t')!;
const submitAdminTokenBtn: HTMLElement = document.getElementById(
  'submit-admin-token-btn'
)!;
const invalidAdminTokenAlert: HTMLElement = document.getElementById(
  'invalid-admin-token-alert'
)!;
const adminTokenSpinnerWrapper: HTMLElement = document.getElementById(
  'admin-token-spinner-wrapper'
)!;

const adminTokenPostRequestFinished = (): void => {
  setTimeout(() => {
    adminTokenSpinnerWrapper.style.display = 'none';
  });
};

settingsModalBtn.addEventListener('click', (): void => {
  setDisplay(invalidAdminTokenAlert, 'none');
});

if (submitAdminTokenBtn) {
  submitAdminTokenBtn.addEventListener('click', () => {
    adminTokenSpinnerWrapper.style.display = 'block';
    POSTRequest(
      '/home',
      { adminToken: adminToken.value.trim() },
      (responseData: any): void => {
        if (responseData === 'false') {
          adminTokenPostRequestFinished();
          setDisplay(invalidAdminTokenAlert, 'block');
        } else {
          adminTokenPostRequestFinished();
          location.reload();
        }
        setValue(adminToken, '');
      }
    );
  });
}
