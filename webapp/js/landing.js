// Scale - Landing Page

(function() {
    'use strict';

    // Elements
    const demoBtn = document.getElementById('demoBtn');
    const numberInput = document.getElementById('numberInput');
    const goBtn = document.getElementById('goBtn');
    const exampleBtns = document.querySelectorAll('.example-btn');

    // Navigate to visualization page
    function visualizeNumber(number) {
        // Parse and validate
        const parsed = parseNumber(number);
        if (parsed === null) {
            alert('Please enter a valid number');
            return;
        }

        // Navigate to visualize page
        window.location.href = `visualize.html?n=${parsed}`;
    }

    // Parse number from string (handles commas, etc.)
    function parseNumber(str) {
        // Remove commas, spaces
        const cleaned = String(str).replace(/[,\s]/g, '');
        const num = parseInt(cleaned, 10);

        // Validate
        if (isNaN(num) || num < 1) {
            return null;
        }

        return num;
    }

    // Event Listeners
    demoBtn.addEventListener('click', () => {
        visualizeNumber(5000000000); // 5 billion
    });

    goBtn.addEventListener('click', () => {
        const value = numberInput.value.trim();
        if (value) {
            visualizeNumber(value);
        }
    });

    numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goBtn.click();
        }
    });

    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const number = btn.getAttribute('data-number');
            visualizeNumber(number);
        });
    });

    // Animate the demo number
    let numberValue = 5000000000;
    const demoNumber = document.getElementById('demoNumber');

    function animateNumber() {
        // Random number between 1M and 10B
        const numbers = [
            1000000,
            5000000,
            100000000,
            1000000000,
            5000000000,
            7900000000, // World population
            37000000000000 // US national debt (rough)
        ];

        const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
        numberValue = randomNum;

        // Format with commas
        demoNumber.textContent = numberValue.toLocaleString();
    }

    // Change number every 4 seconds
    setInterval(animateNumber, 4000);

})();
