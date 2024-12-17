document.addEventListener('DOMContentLoaded', function() {

    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.js');
    }


    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const resetButton = document.getElementById('resetTimer');
    const studyDurationInput = document.getElementById('studyDuration');
    const breakDurationInput = document.getElementById('breakDuration');

    let timeLeft = studyDurationInput.value * 60; 
    let timerId = null;
    let isStudyTime = true;
    let isPaused = true;


    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
   
        if (timeLeft <= 60) { 
            timerDisplay.style.color = '#ff4444';
        } else {
            timerDisplay.style.color = 'white';
        }
    }

  
    function timerTick() {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
         
            clearInterval(timerId);
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();
            
            if (isStudyTime) {
                timeLeft = breakDurationInput.value * 60;
                isStudyTime = false;
                timerDisplay.style.color = '#4CAF50';
                showNotification('Study session complete! Time for a break!');
            } else {
                timeLeft = studyDurationInput.value * 60;
                isStudyTime = true;
                timerDisplay.style.color = 'white';
                showNotification('Break time over! Back to studying!');
            }
            
            updateDisplay();
            startTimer(); 
        }
    }


    function startTimer() {
        if (isPaused) {
            isPaused = false;
            timerId = setInterval(timerTick, 1000);
            startButton.classList.add('active');
            pauseButton.classList.remove('active');
            
         
            studyDurationInput.disabled = true;
            breakDurationInput.disabled = true;
        }
    }


    function pauseTimer() {
        if (!isPaused) {
            isPaused = true;
            clearInterval(timerId);
            startButton.classList.remove('active');
            pauseButton.classList.add('active');
        }
    }


    function resetTimer() {
        pauseTimer();
        isStudyTime = true;
        timeLeft = studyDurationInput.value * 60;
        updateDisplay();
        timerDisplay.style.color = 'white';
     
        studyDurationInput.disabled = false;
        breakDurationInput.disabled = false;
        
  
        startButton.classList.remove('active');
        pauseButton.classList.remove('active');
    }

  
    function showNotification(message) {
        if (Notification.permission === 'granted') {
            new Notification('Study Timer', { body: message });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Study Timer', { body: message });
                }
            });
        }
    }

   
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);


    studyDurationInput.addEventListener('change', function() {
        if (isPaused && isStudyTime) {
            timeLeft = this.value * 60;
            updateDisplay();
        }
    });

    breakDurationInput.addEventListener('change', function() {
        if (isPaused && !isStudyTime) {
            timeLeft = this.value * 60;
            updateDisplay();
        }
    });


    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            isPaused ? startTimer() : pauseTimer();
        } else if (e.code === 'KeyR') {
            resetTimer();
        }
    });

 
    updateDisplay();
});
