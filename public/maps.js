const loc = { lat: 41.83752894412787, lng: -87.71478380428482 };

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 16,
    });

    const marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'New Hope Church of God'
    })
}