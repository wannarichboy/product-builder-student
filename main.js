const themeToggleBtn = document.getElementById('theme-toggle');
const partnerForm = document.getElementById('partner-form');
const partnerSubmitBtn = document.getElementById('partner-submit');
const formStatus = document.getElementById('form-status');
const themeStorageKey = 'partner-form-theme';

const applyTheme = (theme) => {
    const isLightMode = theme === 'light';
    document.body.classList.toggle('light-mode', isLightMode);
    themeToggleBtn.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
    themeToggleBtn.setAttribute(
        'aria-label',
        isLightMode ? 'Switch to dark mode' : 'Switch to light mode'
    );
};

themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
});

partnerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    formStatus.textContent = '문의 내용을 전송하고 있습니다...';
    partnerSubmitBtn.disabled = true;

    try {
        const response = await fetch(partnerForm.action, {
            method: 'POST',
            body: new FormData(partnerForm),
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        partnerForm.reset();
        formStatus.textContent = '문의가 접수되었습니다. 빠르게 확인 후 연락드리겠습니다.';
    } catch (error) {
        formStatus.textContent = '전송에 실패했습니다. Formspree 설정과 URL을 다시 확인해주세요.';
    } finally {
        partnerSubmitBtn.disabled = false;
    }
});

const savedTheme = localStorage.getItem(themeStorageKey);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
