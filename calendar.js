document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const addEventForm = document.getElementById('addEventForm');
    
    let events = JSON.parse(localStorage.getItem('events')) || [];

    function renderCalendar() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let html = `<h2>${date.toLocaleString('default', { month: 'long' })} ${year}</h2>`;
        html += '<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

        for (let i = 0; i < firstDay.getDay(); i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((firstDay.getDay() + day - 1) % 7 === 0) {
                html += '</tr><tr>';
            }
            const currentDate = new Date(year, month, day);
            const hasEvent = events.some(event => new Date(event.date).toDateString() === currentDate.toDateString());
            html += `<td class="${hasEvent ? 'event-day' : ''}">${day}</td>`;
        }

        html += '</tr></table>';
        calendar.innerHTML = html;
    }

    function addEvent(event) {
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar();
    }

    addEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value;

        addEvent({ title, date, time, description });
        addEventForm.reset();
    });

    renderCalendar();
});

