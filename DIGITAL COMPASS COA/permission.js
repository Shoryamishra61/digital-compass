function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    alert('Permission to access gyroscope denied');
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function handleOrientation(event) {
    let alpha = event.alpha;
    if (alpha !== null) {
        let heading = 360 - alpha;
        document.getElementById('direction').textContent = `Heading: ${Math.round(heading)}°`;
    }
}

// Call requestPermission on button click or automatically

