document.addEventListener('DOMContentLoaded', function() {
    
    // --- Calendar Logic (Keep existing, just updating DOM refs) ---
    const allEvents = document.querySelectorAll('.grid-card');
    const calGrid = document.getElementById('miniCalendarGrid');
    const calLabel = document.getElementById('calMonthYear');
    
    let today = new Date();
    let currentMonth = today.getMonth(); 
    let currentYear = today.getFullYear(); 
    
    // --- Filter Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';

    // 1. Button Click Handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            currentCategory = btn.getAttribute('data-filter');
            applyFilters();
        });
    });

    function applyFilters() {
        allEvents.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (currentCategory === 'all' || categories.includes(currentCategory)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 2. Calendar Logic
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function renderCalendar(month, year) {
        calGrid.innerHTML = "";
        calLabel.innerText = `${monthNames[month]} ${year}`;

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // Collect dates
        let eventDates = [];
        allEvents.forEach(card => {
            if(card.getAttribute('data-date')) eventDates.push(card.getAttribute('data-date'));
        });

        for (let i = 0; i < firstDay; i++) {
            let span = document.createElement('span');
            span.classList.add('text-muted');
            calGrid.appendChild(span);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let span = document.createElement('span');
            span.innerText = day;
            let monStr = (month + 1).toString().padStart(2, '0');
            let dayStr = day.toString().padStart(2, '0');
            let fullDate = `${year}-${monStr}-${dayStr}`;

            if (eventDates.includes(fullDate)) {
                span.classList.add('has-event');
            }
            calGrid.appendChild(span);
        }
    }

    // Navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});