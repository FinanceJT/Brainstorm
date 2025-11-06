// Scale - Visualization Renderers

const ScaleVisualizations = {

    // Render Time Scale visualization
    renderTimeScale(number) {
        const timeData = ScaleUtils.calculateTime(number);

        // Update time display
        document.getElementById('timeValue').textContent = timeData.primary;
        document.getElementById('timeBreakdown').textContent = timeData.breakdown;

        // Start live counter
        this.startCounter(number);
    },

    // Start the live counter animation
    startCounter(targetNumber) {
        const counterEl = document.getElementById('liveCounter');
        const progressBar = document.getElementById('progressBar');

        let count = 0;
        const maxDisplay = Math.min(targetNumber, 100); // Show up to 100 for demo
        const duration = 10000; // 10 seconds for demo
        const interval = duration / maxDisplay;

        const counter = setInterval(() => {
            count++;
            counterEl.textContent = ScaleUtils.formatNumber(count);

            // Update progress bar
            const progress = (count / maxDisplay) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (count >= maxDisplay) {
                clearInterval(counter);

                // Show how much more there is to go
                if (targetNumber > maxDisplay) {
                    setTimeout(() => {
                        const remaining = targetNumber - maxDisplay;
                        counterEl.textContent = `${ScaleUtils.formatNumber(maxDisplay)}...`;
                        counterEl.style.opacity = '0.6';

                        // Update info text
                        const infoEl = document.querySelector('.counter-info');
                        const remainingTime = ScaleUtils.calculateTime(remaining);
                        infoEl.textContent = `Only ${maxDisplay} shown. ${ScaleUtils.formatNumber(remaining)} more to go (${remainingTime.primary} more counting)`;
                    }, 1000);
                }
            }
        }, interval);
    },

    // Render Physical Space visualization
    renderPhysicalSpace(number) {
        const physicalData = ScaleUtils.calculatePhysicalSpace(number);

        document.getElementById('volumeValue').textContent = physicalData.volume;
        document.getElementById('heightValue').textContent = physicalData.height;

        // Generate size comparison
        let sizeComparison;
        if (physicalData.heightKm > 100) {
            sizeComparison = 'Reaches into space!';
        } else if (physicalData.heightKm > 10) {
            sizeComparison = 'Taller than commercial airplanes fly';
        } else if (physicalData.heightKm > 1) {
            sizeComparison = 'Visible from miles away';
        } else if (physicalData.heightKm > 0.1) {
            sizeComparison = 'Taller than most buildings';
        } else {
            sizeComparison = 'Human scale';
        }

        document.getElementById('sizeComparison').textContent = sizeComparison;

        // Add visual representation
        const cubeViz = document.getElementById('cubeViz');
        cubeViz.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 16px;">📦</div>
                <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">
                    ${physicalData.volume}
                </div>
                <div style="opacity: 0.9;">
                    If stacked: ${physicalData.height}
                </div>
            </div>
        `;
    },

    // Render Comparative Scale visualization
    renderComparativeScale(number) {
        const comparisons = ScaleUtils.getComparisons(number);
        const container = document.getElementById('comparisonBars');

        // Find max value for scaling
        const maxValue = Math.max(...comparisons.map(c => c.value));

        // Clear container
        container.innerHTML = '';

        // Render each comparison
        comparisons.forEach((comp, index) => {
            const widthPercent = (comp.value / maxValue) * 100;

            const item = document.createElement('div');
            item.className = 'comparison-bar-item';

            item.innerHTML = `
                <div class="comparison-bar-header">
                    <span class="comparison-bar-label">
                        ${comp.label}
                        ${comp.isTarget ? '← You are here' : ''}
                    </span>
                    <span class="comparison-bar-value">${comp.displayValue}</span>
                </div>
                <div class="comparison-bar-container">
                    <div class="comparison-bar-fill ${comp.isTarget ? 'full' : ''}"
                         style="width: 0%;"
                         data-width="${widthPercent}">
                        ${comp.multiplier ? `<span class="comparison-bar-multiplier">${comp.multiplier}</span>` : ''}
                    </div>
                </div>
            `;

            container.appendChild(item);

            // Animate bar width
            setTimeout(() => {
                const bar = item.querySelector('.comparison-bar-fill');
                bar.style.width = `${widthPercent}%`;
            }, 100 + (index * 100));
        });
    },

    // Render Human Scale visualization
    renderHumanScale(number) {
        const humanComparisons = ScaleUtils.getHumanScale(number);
        const container = document.getElementById('humanComparisons');

        // Clear container
        container.innerHTML = '';

        // Render each comparison
        humanComparisons.forEach((comp, index) => {
            const item = document.createElement('div');
            item.className = 'human-comparison-item';
            item.style.animationDelay = `${index * 0.1}s`;

            item.innerHTML = `
                <div class="human-comparison-icon">${comp.icon}</div>
                <div class="human-comparison-content">
                    <div class="human-comparison-text">${comp.text}</div>
                    <div class="human-comparison-detail">${comp.detail}</div>
                </div>
            `;

            container.appendChild(item);
        });
    },

    // Render all visualizations
    renderAll(number) {
        this.renderTimeScale(number);
        this.renderPhysicalSpace(number);
        this.renderComparativeScale(number);
        this.renderHumanScale(number);
    }
};
