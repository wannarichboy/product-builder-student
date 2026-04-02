const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

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

// Initial generation
displayNumbers(generateLottoNumbers());
