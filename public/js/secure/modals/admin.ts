const showAdminTokenBtn: HTMLElement = document.getElementById(
  'show-admin-token-btn'
)!;
const adminT: HTMLElement = document.getElementById('admin-token')!;
const adminModalBtn: HTMLElement = document.querySelector('.admin-modal-btn')!;

adminModalBtn.addEventListener('click', () => {
  setDisplay(adminT, 'none');
  showAdminTokenBtn.textContent = 'Show Admin Token';
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
