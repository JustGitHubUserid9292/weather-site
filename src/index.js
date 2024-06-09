import app from "./app";


function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', function() {
    loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js', function() {
        VANTA.CLOUDS({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            speed: 0.90
        })
    });
});

app()