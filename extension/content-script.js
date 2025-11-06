// Scale - Content Script
// Detects and highlights large numbers on web pages

(function() {
    'use strict';

    const CONFIG = {
        minNumber: 10000, // Only highlight numbers >= 10,000
        vizBaseURL: 'https://your-domain.com/visualize.html', // Update with your domain
        // For local testing, use: 'file:///path/to/webapp/visualize.html'
    };

    // Regex patterns to match numbers
    const PATTERNS = {
        // Matches: 1,000,000 or 1000000
        numeric: /\b(\d{1,3}(?:,\d{3})+|\d{5,})\b/g,

        // Matches: 5 million, 3.2 billion, etc.
        written: /\b(\d+(?:\.\d+)?)\s*(million|billion|trillion)\b/gi
    };

    // Convert written numbers to numeric
    const multipliers = {
        'thousand': 1000,
        'million': 1000000,
        'billion': 1000000000,
        'trillion': 1000000000000
    };

    // Parse number from string
    function parseNumber(str) {
        // Remove commas
        const cleaned = str.replace(/,/g, '');
        return parseInt(cleaned, 10);
    }

    // Parse written form (e.g., "5 billion")
    function parseWrittenNumber(numberPart, wordPart) {
        const num = parseFloat(numberPart);
        const multiplier = multipliers[wordPart.toLowerCase()];
        return Math.round(num * multiplier);
    }

    // Check if element should be processed
    function shouldProcessElement(element) {
        const tagName = element.tagName;

        // Skip these elements
        const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'EMBED'];
        if (skipTags.includes(tagName)) {
            return false;
        }

        // Skip if already processed
        if (element.classList && element.classList.contains('scale-processed')) {
            return false;
        }

        return true;
    }

    // Highlight numbers in text node
    function highlightNumbersInTextNode(textNode) {
        if (!textNode.textContent.trim()) {
            return;
        }

        const parent = textNode.parentNode;
        if (!parent || !shouldProcessElement(parent)) {
            return;
        }

        const text = textNode.textContent;
        const fragments = [];
        let lastIndex = 0;
        let hasMatch = false;

        // Find numeric patterns (e.g., "1,000,000")
        let match;
        const numericRegex = new RegExp(PATTERNS.numeric);

        while ((match = numericRegex.exec(text)) !== null) {
            const matchedText = match[0];
            const number = parseNumber(matchedText);

            if (number >= CONFIG.minNumber) {
                hasMatch = true;

                // Add text before match
                if (match.index > lastIndex) {
                    fragments.push(document.createTextNode(text.substring(lastIndex, match.index)));
                }

                // Create highlighted span
                const span = createNumberSpan(matchedText, number);
                fragments.push(span);

                lastIndex = match.index + matchedText.length;
            }
        }

        // Find written patterns (e.g., "5 billion")
        const writtenRegex = new RegExp(PATTERNS.written);
        lastIndex = 0;
        const textForWritten = text;

        while ((match = writtenRegex.exec(textForWritten)) !== null) {
            const numberPart = match[1];
            const wordPart = match[2];
            const number = parseWrittenNumber(numberPart, wordPart);

            if (number >= CONFIG.minNumber) {
                hasMatch = true;

                const matchedText = match[0];

                // Add text before match
                if (match.index > lastIndex) {
                    fragments.push(document.createTextNode(textForWritten.substring(lastIndex, match.index)));
                }

                // Create highlighted span
                const span = createNumberSpan(matchedText, number);
                fragments.push(span);

                lastIndex = match.index + matchedText.length;
            }
        }

        // If we found matches, replace the text node
        if (hasMatch) {
            // Add remaining text
            if (lastIndex < text.length) {
                fragments.push(document.createTextNode(text.substring(lastIndex)));
            }

            // Replace text node with fragments
            fragments.forEach(fragment => {
                parent.insertBefore(fragment, textNode);
            });
            parent.removeChild(textNode);
        }
    }

    // Create span element for highlighted number
    function createNumberSpan(text, number) {
        const span = document.createElement('span');
        span.className = 'scale-number';
        span.textContent = text;
        span.setAttribute('data-scale-number', number);
        span.setAttribute('title', `Click to visualize: ${text}`);

        // Click handler
        span.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openVisualization(number);
        });

        return span;
    }

    // Open visualization page
    function openVisualization(number) {
        const url = `${CONFIG.vizBaseURL}?n=${number}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Get all text nodes in element
    function getTextNodes(element) {
        const textNodes = [];
        const walk = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip whitespace-only nodes
                    if (!node.textContent.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    // Skip if parent should not be processed
                    if (!shouldProcessElement(node.parentNode)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walk.nextNode()) {
            textNodes.push(node);
        }

        return textNodes;
    }

    // Process page
    function processPage() {
        console.log('[Scale] Processing page for numbers...');

        const textNodes = getTextNodes(document.body);

        textNodes.forEach(textNode => {
            try {
                highlightNumbersInTextNode(textNode);
            } catch (err) {
                console.error('[Scale] Error processing text node:', err);
            }
        });

        // Mark body as processed
        document.body.classList.add('scale-processed');

        console.log('[Scale] Page processed. Numbers highlighted.');
    }

    // Initialize
    function init() {
        // Wait for page to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', processPage);
        } else {
            // DOM already loaded
            processPage();
        }

        // Watch for dynamic content changes (optional)
        // Note: This can be expensive on dynamic sites
        // Uncomment if needed:
        /*
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const textNodes = getTextNodes(node);
                        textNodes.forEach(highlightNumbersInTextNode);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        */
    }

    // Start
    init();

})();
