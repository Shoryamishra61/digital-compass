function handleOrientation(event) {
    let alpha = event.alpha;
    if (alpha !== null) {
        let heading = 360 - alpha;
        document.getElementById('direction').textContent = `Heading: ${Math.round(heading)}°`;
    }
}

// Check if DeviceOrientationEvent is available and request permission
if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ or Android Chrome requiring permission
        let permissionButton = document.createElement('button');
        permissionButton.innerHTML = "Enable Compass";
        document.body.appendChild(permissionButton);

        permissionButton.addEventListener('click', function() {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        permissionButton.style.display = 'none';
                    } else {
                        alert('Permission to access gyroscope denied');
                    }
                })
                .catch(console.error);
        });
    } else {
        // If no explicit permission is needed (Android older versions)
        window.addEventListener('deviceorientation', handleOrientation);
    }
} else {
    document.getElementById('direction').textContent = 'DeviceOrientation not supported on your device';
}
