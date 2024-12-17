document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateQuickStats();
    animateStatCards(); 
});

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = formattedDate;
}

function updateQuickStats() {
   
    const tasksCompleted = Math.floor(Math.random() * 10);
    const totalTasks = Math.floor(Math.random() * 20) + 10;
    const studyTime = Math.floor(Math.random() * 8) + 1;
    const resourcesAccessed = Math.floor(Math.random() * 15);

    document.getElementById('tasksCompleted').textContent = `${tasksCompleted} / ${totalTasks}`;
    document.getElementById('studyTime').textContent = `${studyTime} hours`;
    document.getElementById('resourcesAccessed').textContent = resourcesAccessed;
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.querySelectorAll('.quick-link-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});


function animateStatCards() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}
