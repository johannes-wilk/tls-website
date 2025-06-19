// Map JavaScript for TLS & UAV Campaigns Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map if the map container exists
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        // Add a small delay to ensure the map container is fully rendered
        setTimeout(() => {
            initMap();
        }, 100);
    }
});

// Initialize Leaflet map
function initMap() {
    // Create map centered on Europe
    const map = L.map('map-container').setView([30, 0], 2);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add hardcoded locations directly
    const locations = [
        { status: 'done', 'plot-name': 'Las Majadas', lat: 39.942325, lon: -5.770050, 'forest-type': 'Savanna', date: 'December 2024', 'data-type': 'TLS', 'covered-area': '65ha' },
        { status: 'done', 'plot-name': 'Jenaro Herrera', lat: -4.898994, lon: -73.650462, 'forest-type': 'Tropical Forest', date: 'November 2024', 'data-type': 'TLS', 'covered-area': '4ha' },
        { status: 'done', 'plot-name': 'Font Blanceh', lat: 43.24079, lon: 5.67865, 'forest-type': 'Mediterrenian Forest', date: 'December 2024', 'data-type': 'TLS', 'covered-area': '1ha' },
        { status: 'done', 'plot-name': 'Paracou', lat: 5.274143, lon: -52.923681, 'forest-type': 'Tropical Forest', date: 'October 2023', 'data-type': 'TLS', 'covered-area': '1ha' },
        { status: 'done', 'plot-name': 'Tharandt', lat: 50.962923, lon: 13.564642, 'forest-type': 'Coniferous Forest', date: 'January 2025', 'data-type': 'TLS', 'covered-area': '3ha' },
        { status: 'done', 'plot-name': 'Hohes Holz', lat: 52.088904, lon: 11.211970, 'forest-type': 'Deciduous Forest', date: 'April 2024', 'data-type': 'TLS', 'covered-area': '3ha' },
        { status: 'done', 'plot-name': 'Kalebsberg', lat: 53.716025, lon: 12.582096, 'forest-type': 'Deciduous Forest', date: 'March 2025', 'data-type': 'ULS', 'covered-area': '10ha' },
        { status: 'planned', 'plot-name': 'Ghana', lat: 6.729383, lon: -2.085155, 'forest-type': 'Savanna', date: 'January 2026', 'data-type': 'TLS', 'covered-area': '10ha' },
        { status: 'planned', 'plot-name': 'Hyltemossa', lat: 56.09763, lon: 13.41897, 'forest-type': 'Coniferous Forest', date: 'August 2025', 'data-type': 'ULS', 'covered-area': '5ha' },
        { status: 'planned', 'plot-name': 'Svartberget', lat: 64.25611, lon: 19.7745, 'forest-type': 'Coniferous Forest', date: 'August 2025', 'data-type': 'ULS', 'covered-area': '5ha' },
        { status: 'planned', 'plot-name': 'Hyytiälä', lat: 61.8474, lon: 24.2947, 'forest-type': 'Coniferous Forest', date: 'August 2025', 'data-type': 'ULS', 'covered-area': '5ha' },
        { status: 'planned', 'plot-name': 'Sodankylä', lat: 67.36239, lon: 26.63859, 'forest-type': 'Coniferous Forest', date: 'July 2025', 'data-type': 'ULS', 'covered-area': '5ha' }
    ];
    
    // Add markers to map
    addMarkersToMap(map, locations);
    
    // Also try to load from CSV as backup
    fetch('assets/data/locations.csv')
        .then(response => response.text())
        .then(csvData => {
            console.log("CSV data loaded successfully");
            const csvLocations = parseCSV(csvData);
            // Only use CSV data if we don't have hardcoded locations
            if (locations.length === 0) {
                addMarkersToMap(map, csvLocations);
            }
        })
        .catch(error => {
            console.error('Error loading locations data:', error);
        });
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(';');
    
    return lines.slice(1).map(line => {
        const values = line.split(';');
        const location = {};
        
        headers.forEach((header, index) => {
            // Ensure we have a value for each header
            location[header] = values[index] || '';
        });
        
        // Convert lat/lon to numbers
        location.lat = parseFloat(location.lat);
        location.lon = parseFloat(location.lon);
        
        return location;
    });
}

// Add markers to the map
function addMarkersToMap(map, locations) {
    locations.forEach(location => {
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        
        if (!isNaN(lat) && !isNaN(lon)) {
            // Determine marker color based on status
            const markerColor = location.status === 'done' ? '#10B981' : '#F59E0B'; // green or orange
            
            // Create custom marker based on data type
            let markerIcon;
            if (location['data-type'] === 'TLS') {
                markerIcon = L.divIcon({
                    html: `<div class="tls-marker" style="color: ${markerColor}">✕</div>`,
                    className: '',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });
            } else { // UAV/ULS
                markerIcon = L.divIcon({
                    html: `<div class="uav-marker" style="color: ${markerColor}">✈</div>`,
                    className: '',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });
            }
            
            // Create marker
            const marker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
            
            // Add tooltip (hover)
            marker.bindTooltip(location['plot-name'], {
                direction: 'top',
                offset: [0, -10]
            });
            
            // Create popup content
            const popupContent = createPopupContent(location);
            
            // Add popup (click)
            marker.bindPopup(popupContent);
        }
    });
}

// Create popup content
function createPopupContent(location) {
    // Fields to exclude from popup
    const excludeFields = ['status', 'data-type', 'scannertype', 'forest-type', 'lat', 'lon'];
    
    // Create popup HTML
    let popupContent = `
        <div class="map-popup">
            <h3>${location['plot-name']}</h3>
            <div class="map-popup-content">
    `;
    
    // Add forest type
    popupContent += `
        <div class="map-popup-item">
            <span class="map-popup-label">Forest Type:</span>
            <span>${location['forest-type']}</span>
        </div>
    `;
    
    // Add other fields
    for (const [key, value] of Object.entries(location)) {
        if (!excludeFields.includes(key) && key !== 'plot-name') {
            // Format the key for display (remove hyphens, capitalize)
            const formattedKey = key
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            popupContent += `
                <div class="map-popup-item">
                    <span class="map-popup-label">${formattedKey}:</span>
                    <span>${value}</span>
                </div>
            `;
        }
    }
    
    popupContent += `
            </div>
        </div>
    `;
    
    return popupContent;
}
