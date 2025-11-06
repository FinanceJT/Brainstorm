// Scale - Utility Functions

const ScaleUtils = {

    // Format number with commas
    formatNumber(num) {
        return num.toLocaleString();
    },

    // Get number name (thousand, million, billion, etc.)
    getNumberName(num) {
        if (num >= 1e12) return 'trillion';
        if (num >= 1e9) return 'billion';
        if (num >= 1e6) return 'million';
        if (num >= 1e3) return 'thousand';
        return 'number';
    },

    // Convert number to readable form (e.g., "5 billion")
    toReadable(num) {
        const absNum = Math.abs(num);

        if (absNum >= 1e12) {
            return (num / 1e12).toFixed(2) + ' trillion';
        }
        if (absNum >= 1e9) {
            return (num / 1e9).toFixed(2) + ' billion';
        }
        if (absNum >= 1e6) {
            return (num / 1e6).toFixed(2) + ' million';
        }
        if (absNum >= 1e3) {
            return (num / 1e3).toFixed(2) + ' thousand';
        }
        return num.toString();
    },

    // Time calculations (if counting 1/second)
    calculateTime(num) {
        const seconds = num;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const years = days / 365.25;

        let primary, breakdown;

        if (years >= 1) {
            const y = Math.floor(years);
            const d = Math.floor((years - y) * 365.25);
            primary = years < 10
                ? `${years.toFixed(1)} years`
                : `${this.formatNumber(Math.round(years))} years`;
            breakdown = `That's ${this.formatNumber(y)} years and ${this.formatNumber(d)} days`;
        } else if (days >= 1) {
            const d = Math.floor(days);
            const h = Math.floor((days - d) * 24);
            primary = `${days.toFixed(1)} days`;
            breakdown = `That's ${d} days and ${h} hours`;
        } else if (hours >= 1) {
            const h = Math.floor(hours);
            const m = Math.floor((hours - h) * 60);
            primary = `${hours.toFixed(1)} hours`;
            breakdown = `That's ${h} hours and ${m} minutes`;
        } else if (minutes >= 1) {
            const m = Math.floor(minutes);
            const s = Math.floor((minutes - m) * 60);
            primary = `${minutes.toFixed(1)} minutes`;
            breakdown = `That's ${m} minutes and ${s} seconds`;
        } else {
            primary = `${seconds} seconds`;
            breakdown = 'Less than a minute!';
        }

        return { primary, breakdown, seconds, minutes, hours, days, years };
    },

    // Physical space calculations (1 unit = 1cm³)
    calculatePhysicalSpace(num) {
        const volumeCm3 = num;
        const volumeM3 = volumeCm3 / 1e6;

        // Height if stacked (1cm cubes)
        const heightCm = num;
        const heightM = heightCm / 100;
        const heightKm = heightM / 1000;
        const heightMiles = heightKm * 0.621371;

        // Comparison objects
        let volumeComparison, heightComparison;

        // Volume comparisons
        if (volumeM3 >= 1e9) {
            volumeComparison = `${(volumeM3 / 1e9).toFixed(2)} km³`;
        } else if (volumeM3 >= 1e6) {
            volumeComparison = `${(volumeM3 / 1e6).toFixed(2)} Olympic pools`;
        } else if (volumeM3 >= 1000) {
            volumeComparison = `${(volumeM3 / 1000).toFixed(2)} large buildings`;
        } else if (volumeM3 >= 1) {
            volumeComparison = `${volumeM3.toFixed(2)} m³`;
        } else {
            volumeComparison = `${volumeCm3.toFixed(0)} cm³`;
        }

        // Height comparisons
        if (heightKm >= 100) {
            heightComparison = `${heightKm.toFixed(0)} km (space!)`;
        } else if (heightKm >= 8.8) {
            const everests = (heightKm / 8.848).toFixed(1);
            heightComparison = `${heightKm.toFixed(1)} km (${everests}× Mt. Everest)`;
        } else if (heightKm >= 1) {
            heightComparison = `${heightKm.toFixed(2)} km`;
        } else if (heightM >= 100) {
            const burjs = (heightM / 828).toFixed(2);
            heightComparison = `${heightM.toFixed(0)} m (${burjs}× Burj Khalifa)`;
        } else if (heightM >= 1) {
            heightComparison = `${heightM.toFixed(1)} meters`;
        } else {
            heightComparison = `${heightCm.toFixed(0)} cm`;
        }

        return {
            volume: volumeComparison,
            height: heightComparison,
            volumeM3,
            heightKm,
            heightMiles
        };
    },

    // Get comparison data for bar chart
    getComparisons(num) {
        const comparisons = [];

        // Population comparisons
        const populations = [
            { label: 'Monaco', value: 39000 },
            { label: 'San Francisco', value: 873000 },
            { label: 'New York City', value: 8.3e6 },
            { label: 'California', value: 39e6 },
            { label: 'United States', value: 331e6 },
            { label: 'China', value: 1.4e9 },
            { label: 'World Population', value: 7.9e9 }
        ];

        // Time comparisons
        const timeUnits = [
            { label: 'Seconds in a day', value: 86400 },
            { label: 'Seconds in a year', value: 31536000 },
            { label: 'Seconds in a decade', value: 315360000 },
            { label: 'Seconds in a century', value: 3153600000 }
        ];

        // Distance comparisons
        const distances = [
            { label: 'Miles NYC to LA', value: 2800 },
            { label: 'Miles around Earth', value: 24901 },
            { label: 'Miles to the Moon', value: 238900 },
            { label: 'Miles to the Sun', value: 93e6 }
        ];

        // Money comparisons (in dollars)
        const money = [
            { label: 'Median US household income', value: 70000 },
            { label: 'Cost of a house', value: 400000 },
            { label: 'Cost of raising a child', value: 233610 },
            { label: 'Harvard 4-year tuition', value: 200000 },
            { label: 'Million dollars', value: 1e6 },
            { label: 'Billion dollars', value: 1e9 }
        ];

        // Select appropriate comparison set based on magnitude
        let comparisonSet;
        if (num < 1e5) {
            comparisonSet = timeUnits.slice(0, 2).concat(money.slice(0, 3));
        } else if (num < 1e7) {
            comparisonSet = populations.slice(0, 3).concat(distances.slice(0, 2));
        } else if (num < 1e9) {
            comparisonSet = populations.slice(2, 5).concat(money.slice(4, 5));
        } else {
            comparisonSet = populations.slice(4, 7).concat(money.slice(5, 6));
        }

        // Build comparison objects
        comparisonSet.forEach(item => {
            const ratio = num / item.value;
            comparisons.push({
                label: item.label,
                value: item.value,
                ratio: ratio,
                displayValue: this.formatNumber(Math.round(item.value)),
                isReference: ratio < 1,
                multiplier: ratio >= 1 ? `${ratio.toFixed(1)}×` : null
            });
        });

        // Add the target number itself
        comparisons.push({
            label: 'Your number',
            value: num,
            ratio: 1,
            displayValue: this.formatNumber(num),
            isReference: false,
            multiplier: null,
            isTarget: true
        });

        // Sort by value
        comparisons.sort((a, b) => a.value - b.value);

        return comparisons;
    },

    // Get human scale comparisons
    getHumanScale(num) {
        const comparisons = [];

        // Stadium capacity
        const stadiumCapacity = 50000;
        const stadiums = num / stadiumCapacity;
        if (stadiums >= 0.1) {
            comparisons.push({
                icon: '🏟️',
                text: stadiums >= 1
                    ? `${this.formatNumber(Math.round(stadiums))} football stadiums full of people`
                    : `${(stadiums * 100).toFixed(1)}% of a football stadium`,
                detail: `At ${this.formatNumber(stadiumCapacity)} people per stadium`
            });
        }

        // City populations
        if (num >= 100000) {
            const sf = num / 873000;
            const nyc = num / 8.3e6;

            if (nyc >= 1) {
                comparisons.push({
                    icon: '🏙️',
                    text: `${nyc.toFixed(1)}× the population of New York City`,
                    detail: `NYC has about 8.3 million people`
                });
            } else if (sf >= 1) {
                comparisons.push({
                    icon: '🌉',
                    text: `${sf.toFixed(1)}× the population of San Francisco`,
                    detail: `SF has about 873,000 people`
                });
            }
        }

        // Country populations
        if (num >= 1e7) {
            const california = num / 39e6;
            const us = num / 331e6;
            const world = num / 7.9e9;

            if (world >= 1) {
                comparisons.push({
                    icon: '🌍',
                    text: `${world.toFixed(2)}× the entire world population`,
                    detail: `That's everyone on Earth, multiple times over`
                });
            } else if (us >= 1) {
                comparisons.push({
                    icon: '🇺🇸',
                    text: `${us.toFixed(2)}× the US population`,
                    detail: `The United States has ~331 million people`
                });
            } else if (california >= 1) {
                comparisons.push({
                    icon: '🌴',
                    text: `${california.toFixed(2)}× California's population`,
                    detail: `California has ~39 million people`
                });
            }
        }

        // If no comparisons, add a basic one
        if (comparisons.length === 0) {
            comparisons.push({
                icon: '👥',
                text: `${this.formatNumber(num)} people`,
                detail: `Each unit representing one person`
            });
        }

        return comparisons;
    }
};
