// stations.js
const stations = [
    "Nashik Road",
    "Igatpuri",
    "Kasara",
    "Kalyan",
    "Dadar",
    "CSMT Mumbai",
    "Thane",
    "Vashi",
    "Panvel",
    "Pune Jn"
];

function populateDropdowns() {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    fromSelect.innerHTML = '<option value="">Select Station</option>';
    toSelect.innerHTML = '<option value="">Select Station</option>';

    stations.forEach(station => {
        const option1 = document.createElement('option');
        option1.value = station;
        option1.textContent = station;
        fromSelect.appendChild(option1);

        const option2 = option1.cloneNode(true);
        toSelect.appendChild(option2);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', populateDropdowns);
