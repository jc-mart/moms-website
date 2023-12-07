const eventsContainer = document.getElementById('events-container');

fetch(`/events?limit=${limit}`)
    .then(response => response.json())
    .then(events => {
        displayEvents(events);
    })
    .catch(error => console.error('Error fetching events:', error));

function displayEvents(events) {
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.innerHTML = `
                <hr>
                <h3>${event.title}</h3>
                <p>${formatDateTime(event.start_datetime)}</p>
                <p style="font-size:20px">${event.description}</p>
                <p style="font-size:smaller">${event.ministry}</p>
            `;
        eventsContainer.appendChild(eventElement);
    });
}

function formatDateTime(datetime) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDateTime = new Date(datetime).toLocaleDateString('en-US', options);
    return formattedDateTime;
}