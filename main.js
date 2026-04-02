const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeStorageKey = 'lotto-theme';

const applyTheme = (theme) => {
    const isLightMode = theme === 'light';
    document.body.classList.toggle('light-mode', isLightMode);
    themeToggleBtn.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
    themeToggleBtn.setAttribute(
        'aria-label',
        isLightMode ? 'Switch to dark mode' : 'Switch to light mode'
    );
};

const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

const displayNumbers = (numbers) => {
    lottoNumbersContainer.innerHTML = '';
    numbers.forEach(number => {
        const lottoBall = document.createElement('div');
        lottoBall.className = 'lotto-ball';
        lottoBall.textContent = number;
        lottoNumbersContainer.appendChild(lottoBall);
    });
};

generateBtn.addEventListener('click', () => {
    const newNumbers = generateLottoNumbers();
    displayNumbers(newNumbers);
});

themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
});

const savedTheme = localStorage.getItem(themeStorageKey);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

// Initial generation
displayNumbers(generateLottoNumbers());
