document.addEventListener('DOMContentLoaded', () => {
  
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.js');
    }

    initializeResourceCards();
    animateResourceCards();
    updateResourceStats();
});

function initializeResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach((card, index) => {
   
        card.style.animationDelay = `${index * 0.1}s`;

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = card.querySelector('p').textContent;
        card.appendChild(tooltip);

        card.addEventListener('mouseenter', () => showTooltip(card));
        card.addEventListener('mouseleave', () => hideTooltip(card));
        
    
        card.addEventListener('click', () => {
            card.classList.add('clicked');
            setTimeout(() => card.classList.remove('clicked'), 300);
            incrementResourceUsage(card.querySelector('h3').textContent);
        });
    });
}

function animateResourceCards() {
    const categories = document.querySelectorAll('.resource-category');
    
    categories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        category.classList.add('fade-in');
    });
}

function showTooltip(card) {
    const tooltip = card.querySelector('.tooltip');
    
    const cardRect = card.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${cardRect.height}px`;
    tooltip.style.left = `${(cardRect.width - tooltipRect.width) / 2}px`;
    
    tooltip.classList.add('show');
}

function hideTooltip(card) {
    const tooltip = card.querySelector('.tooltip');
    tooltip.classList.remove('show');
}

function incrementResourceUsage(resourceName) {
    let usage = JSON.parse(localStorage.getItem('resourceUsage')) || {};
    usage[resourceName] = (usage[resourceName] || 0) + 1;
    localStorage.setItem('resourceUsage', JSON.stringify(usage));
    updateResourceStats();
}

function updateResourceStats() {
    const usage = JSON.parse(localStorage.getItem('resourceUsage')) || {};
    const totalUsage = Object.values(usage).reduce((sum, count) => sum + count, 0);
    const resourcesAccessedElement = document.getElementById('resourcesAccessed');
    
    if (resourcesAccessedElement) {

        const currentValue = parseInt(resourcesAccessedElement.textContent) || 0;
        animateNumber(resourcesAccessedElement, currentValue, totalUsage);
    }


    updateMostUsedResources(usage);
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            element.textContent = end;
        }
    }, duration / steps);
}

function updateMostUsedResources(usage) {
    const mostUsed = Object.entries(usage)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
    
    const mostUsedElement = document.getElementById('mostUsedResources');
    if (mostUsedElement) {
        mostUsedElement.innerHTML = mostUsed
            .map(([name, count]) => `<div class="most-used-item">
                <span>${name}</span>
                <span class="count">${count} visits</span>
            </div>`)
            .join('');
    }
}
