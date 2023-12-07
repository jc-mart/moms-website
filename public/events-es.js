const eventsContainer = document.getElementById('events-container');

fetch(`/events?limit=${limit}`)
    .then(response => response.json())
    .then(events => {
        displayEvents(events);
    })
    .catch(error => console.error('Error fetching events:', error));

function displayEvents(events) {
    events.forEach(event => {
        const eventDate = new Date(event.datetime);
        const eventElement = document.createElement('div');
        eventElement.innerHTML = `
                <hr>
                <h3>${event.title_spanish}</h3>
                <p>${formatDateTime(eventDate)}</p>
                <p style="font-size:20px">${event.description_spanish}</p>
                <p style="font-size:smaller">${event.ministry}</p>
            `;
        eventsContainer.appendChild(eventElement);
    });
}

function formatDateTime(datetime) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDateTime = new Date(datetime).toLocaleDateString('es-US', options);
    return formattedDateTime;
}