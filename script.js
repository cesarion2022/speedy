let map;
let userLocation;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            map.setCenter(userLocation);
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Ubicación Actual',
            });
        }, () => {
            handleLocationError(true, map.getCenter());
        });
    } else {
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation
        ? 'Error: El servicio de geolocalización ha fallado.'
        : 'Error: Su navegador no soporta geolocalización.');
}

document.getElementById('locateButton').addEventListener('click', function() {
    if (userLocation) {
        document.getElementById('pickup').value = `Lat: ${userLocation.lat}, Lng: ${userLocation.lng}`;
    } else {
        alert('Ubicación no disponible');
    }
});

document.getElementById('packageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const notes = document.getElementById('notes').value;

    if (name && phone && pickup && destination) {
        const whatsappLink = `https://wa.link/ureayk?text=Nombre:%20${encodeURIComponent(name)}%0ATeléfono:%20${encodeURIComponent(phone)}%0ALugar%20de%20recogida:%20${encodeURIComponent(pickup)}%0ADestino:%20${encodeURIComponent(destination)}%0ANotas:%20${encodeURIComponent(notes)}`;
        window.open(whatsappLink, '_blank');
        document.getElementById('packageForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});
