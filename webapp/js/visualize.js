// Scale - Visualization Page Controller

(function() {
    'use strict';

    // Parse number from URL
    function getNumberFromURL() {
        const params = new URLSearchParams(window.location.search);
        const n = params.get('n');

        if (!n) {
            return null;
        }

        const parsed = parseInt(n, 10);
        if (isNaN(parsed) || parsed < 1) {
            return null;
        }

        return parsed;
    }

    // Update page title and meta
    function updatePageMeta(number) {
        const readable = ScaleUtils.toReadable(number);
        document.title = `${ScaleUtils.formatNumber(number)} - Scale`;

        // Update meta description for sharing
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.content = `Visualizing ${readable} - see how big this number really is`;
        }
    }

    // Update number display
    function updateNumberDisplay(number) {
        const displayEl = document.getElementById('numberDisplay');
        const descriptionEl = document.getElementById('numberDescription');

        // Format number with commas
        displayEl.textContent = ScaleUtils.formatNumber(number);

        // Generate description
        const readable = ScaleUtils.toReadable(number);
        const name = ScaleUtils.getNumberName(number);

        let description;
        if (number >= 1e9) {
            description = `${readable} is a ${name}. That's a lot. Let's make it tangible.`;
        } else if (number >= 1e6) {
            description = `${readable} is a big number. Let's see what it really means.`;
        } else {
            description = `Understanding ${readable} through visual comparisons.`;
        }

        descriptionEl.textContent = description;
    }

    // Share functionality
    function setupShareButton() {
        const shareBtn = document.getElementById('shareBtn');

        shareBtn.addEventListener('click', async () => {
            const url = window.location.href;
            const number = getNumberFromURL();
            const title = `How big is ${ScaleUtils.formatNumber(number)}?`;
            const text = `Check out this visualization of ${ScaleUtils.toReadable(number)}`;

            // Try native Web Share API first
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        text: text,
                        url: url
                    });
                    return;
                } catch (err) {
                    // User cancelled or error, fall through to clipboard
                }
            }

            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                showToast('Link copied to clipboard!');
            } catch (err) {
                // Final fallback: show URL in alert
                alert(`Share this URL:\n${url}`);
            }
        });
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: var(--white);
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: fadeIn 0.3s var(--ease);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s var(--ease)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Handle error state
    function showError(message) {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div style="text-align: center; padding: 96px 24px;">
                <div style="font-size: 4rem; margin-bottom: 24px;">🤔</div>
                <h1 style="font-size: 2rem; margin-bottom: 16px; color: var(--primary);">
                    Hmm, something's not right
                </h1>
                <p style="font-size: 1.125rem; color: var(--text-light); margin-bottom: 32px;">
                    ${message}
                </p>
                <a href="index.html" style="
                    display: inline-block;
                    padding: 12px 32px;
                    background: var(--primary);
                    color: var(--white);
                    text-decoration: none;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: all 0.3s var(--ease);
                ">
                    Try Again
                </a>
            </div>
        `;
    }

    // Initialize page
    function init() {
        const number = getNumberFromURL();

        if (!number) {
            showError('No number provided. Please enter a number to visualize.');
            return;
        }

        if (number > 1e15) {
            showError('That number is too large! Try something under 1 quadrillion.');
            return;
        }

        try {
            updatePageMeta(number);
            updateNumberDisplay(number);
            setupShareButton();

            // Render all visualizations
            ScaleVisualizations.renderAll(number);

        } catch (err) {
            console.error('Error rendering visualizations:', err);
            showError('Something went wrong while creating the visualizations.');
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
