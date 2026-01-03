document.addEventListener('DOMContentLoaded', function() {
    
    // --- Configuration ---
    const allEvents = document.querySelectorAll('.event-card');
    const statusMessage = document.getElementById('statusMessage');
    const calGrid = document.getElementById('miniCalendarGrid');
    const calLabel = document.getElementById('calMonthYear');
    
    // --- Calendar State ---
    let today = new Date();
    let currentMonth = today.getMonth(); // 0 = Jan
    let currentYear = today.getFullYear(); // 2026
    
    // --- Filter State ---
    let filters = {
        date: null,       // "2026-01-15"
        categories: [],
        locations: [],
        search: ""
    };

    // --- 1. Calendar Logic ---
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function renderCalendar(month, year) {
        calGrid.innerHTML = "";
        calLabel.innerText = `${monthNames[month]} ${year}`;

        // Get first day of month (0=Sun, 1=Mon...)
        let firstDay = new Date(year, month, 1).getDay();
        // Get number of days in month
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // Collect all event dates from DOM for dots
        let eventDates = [];
        allEvents.forEach(card => {
            const d = card.getAttribute('data-date');
            if(d && d !== 'ongoing') eventDates.push(d);
        });

        // 1. Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            let span = document.createElement('span');
            span.classList.add('text-muted'); // placeholder
            calGrid.appendChild(span);
        }

        // 2. Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            let span = document.createElement('span');
            span.innerText = day;
            
            // Format date string YYYY-MM-DD
            let monStr = (month + 1).toString().padStart(2, '0');
            let dayStr = day.toString().padStart(2, '0');
            let fullDate = `${year}-${monStr}-${dayStr}`;
            
            span.setAttribute('data-date', fullDate);

            // Add Dot if event exists
            if (eventDates.includes(fullDate)) {
                span.classList.add('has-event');
            }

            // Highlight if selected
            if (filters.date === fullDate) {
                span.classList.add('active');
            }

            // Click Handler
            span.addEventListener('click', function() {
                // Remove active from others
                document.querySelectorAll('.cal-grid span').forEach(s => s.classList.remove('active'));
                
                // Toggle Select
                if (filters.date === fullDate) {
                    filters.date = null; // Deselect
                    this.classList.remove('active');
                } else {
                    filters.date = fullDate;
                    this.classList.add('active');
                }
                applyFilters();
            });

            calGrid.appendChild(span);
        }
    }

    // Navigation Buttons
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

    // Initial Render
    renderCalendar(currentMonth, currentYear);

    // --- 2. Filter Logic (Same as before) ---
    const catCheckboxes = document.querySelectorAll('#categoryFilters input');
    catCheckboxes.forEach(cb => cb.addEventListener('change', updateFilters));
    
    const locCheckboxes = document.querySelectorAll('#locationFilters input');
    locCheckboxes.forEach(cb => cb.addEventListener('change', updateFilters));

    document.getElementById('eventSearch').addEventListener('input', (e) => {
        filters.search = e.target.value.toLowerCase();
        applyFilters();
    });

    function updateFilters() {
        filters.categories = Array.from(catCheckboxes).filter(i => i.checked).map(i => i.value);
        filters.locations = Array.from(locCheckboxes).filter(i => i.checked).map(i => i.value);
        applyFilters();
    }

    function applyFilters() {
        let visibleCount = 0;

        allEvents.forEach(card => {
            const cardDate = card.getAttribute('data-date');
            const cardCats = card.getAttribute('data-category');
            const cardLocs = card.getAttribute('data-location');
            const cardText = card.innerText.toLowerCase();

            let dateMatch = !filters.date || cardDate === filters.date;
            let catMatch = filters.categories.length === 0 || filters.categories.some(c => cardCats.includes(c));
            let locMatch = filters.locations.length === 0 || filters.locations.some(l => cardLocs.includes(l));
            let searchMatch = !filters.search || cardText.includes(filters.search);

            if (dateMatch && catMatch && locMatch && searchMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Status Message for Date Selection
        if (filters.date && visibleCount === 0) {
            const dateObj = new Date(filters.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            statusMessage.style.display = 'block';
            statusMessage.innerHTML = `No events found on <strong>${dateObj.toLocaleDateString('en-US', options)}</strong>.`;
        } else {
            statusMessage.style.display = 'none';
        }

        // Hide empty Month Headers
        document.querySelectorAll('.event-group').forEach(group => {
            const visibleCards = group.querySelectorAll('.event-card[style="display: flex;"]');
            group.style.display = visibleCards.length > 0 ? 'block' : 'none';
        });
    }
});