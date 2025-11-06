// Scale - Extension Popup

(function() {
    'use strict';

    const VIZ_BASE_URL = 'https://your-domain.com/visualize.html';
    // For local testing: 'file:///path/to/webapp/visualize.html'

    // Parse number from string
    function parseNumber(str) {
        const cleaned = String(str).replace(/[,\s]/g, '');
        const num = parseInt(cleaned, 10);

        if (isNaN(num) || num < 1) {
            return null;
        }

        return num;
    }

    // Open visualization
    function openVisualization(number) {
        const url = `${VIZ_BASE_URL}?n=${number}`;
        chrome.tabs.create({ url: url });
    }

    // Handle number input
    const numberInput = document.getElementById('numberInput');
    const goBtn = document.getElementById('goBtn');

    goBtn.addEventListener('click', () => {
        const value = numberInput.value.trim();
        if (!value) return;

        const number = parseNumber(value);
        if (number === null) {
            // Show error (simple version)
            numberInput.style.borderColor = '#EF4444';
            setTimeout(() => {
                numberInput.style.borderColor = '';
            }, 1000);
            return;
        }

        openVisualization(number);
    });

    numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goBtn.click();
        }
    });

    // Handle example buttons
    const exampleBtns = document.querySelectorAll('.example-btn');
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const number = parseInt(btn.getAttribute('data-number'), 10);
            openVisualization(number);
        });
    });

    // Focus input on open
    numberInput.focus();

})();
