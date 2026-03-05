// script.js
// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
setInterval(updateClock, 1000);
updateClock();

// Passenger Count Controls
let passengerCount = 1;
const countDisplay = document.getElementById('count');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');

plusBtn.addEventListener('click', () => {
    passengerCount++;
    countDisplay.textContent = passengerCount;
    updateTotalFare();
});

minusBtn.addEventListener('click', () => {
    if (passengerCount > 1) {
        passengerCount--;
        countDisplay.textContent = passengerCount;
        updateTotalFare();
    }
});

// Price Input Handler
document.getElementById('price').addEventListener('input', updateTotalFare);

function updateTotalFare() {
    const basePrice = parseFloat(document.getElementById('price').value) || 0;
    const total = basePrice * passengerCount;
    document.getElementById('total').value = total.toFixed(2);
}

// Generate Ticket
document.getElementById('generate').addEventListener('click', () => {
    const transportType = document.getElementById('transport').value;
    const fromStation = document.getElementById('from').value;
    const toStation = document.getElementById('to').value;
    const passengerType = document.getElementById('ptype').value;
    const passengers = passengerCount;
    const totalFare = parseFloat(document.getElementById('total').value) || 0;

    // Validation
    if (!fromStation || !toStation || fromStation === toStation) {
        alert('Please select valid From and To stations.');
        return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN');
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
    const ticketNumber = Math.floor(10000000 + Math.random() * 90000000).toString();

    // Ticket class based on transport (simple mapping)
    const ticketClass = transportType === 'Train' ? 'AC 2 TIER' : 
                        transportType === 'Local' ? 'SECOND CLASS' : 
                        transportType === 'Metro' ? 'GENERAL' : 'DELUXE';

    const passDesc = `${passengers} ${passengerType.toUpperCase()}${passengers > 1 ? 'S' : ''}`;

    // Build ticket content (monospace layout)
    const ticketContent = `
<div class="header">      INDIAN RAILWAYS</div>

FROM : ${fromStation.toUpperCase()}
TO   : ${toStation.toUpperCase()}
TYPE : ${ticketClass}
PASS : ${passDesc}
FARE : ₹${totalFare.toFixed(2)}

DATE : ${dateStr}
TIME : ${timeStr}
T.N. : ${ticketNumber}

<div class="footer">    HAVE A SAFE JOURNEY</div>
    `.trim();

    document.getElementById('ticket').innerHTML = ticketContent;

    // Generate QR Code
    const qrData = JSON.stringify({
        ticket: ticketNumber,
        from: fromStation,
        to: toStation,
        type: ticketClass,
        pass: passDesc,
        fare: totalFare,
        date: dateStr,
        time: timeStr
    });
    const qrCanvas = document.getElementById('qrcode');
    QRCode.toCanvas(qrCanvas, qrData, {
        width: 100,
        margin: 1,
        color: { dark: '#000000', light: '#FFFFFF' }
    }, (error) => {
        if (error) console.error('QR Code generation failed:', error);
    });

    // Show preview and enable print
    document.getElementById('preview').classList.remove('hidden');
    document.getElementById('print').disabled = false;
});

// Clear Form
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    document.getElementById('ptype').value = 'Adult';
    passengerCount = 1;
    countDisplay.textContent = 1;
    document.getElementById('price').value = 180;
    updateTotalFare();
    document.getElementById('preview').classList.add('hidden');
    document.getElementById('print').disabled = true;
    document.getElementById('qrcode').getContext('2d').clearRect(0, 0, 100, 100);
});

// Print Ticket
document.getElementById('print').addEventListener('click', () => {
    window.print();
});

// Keyboard Shortcuts (Optional Extra)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        document.getElementById('generate').click();
    } else if (e.key === 'Escape') {
        document.getElementById('clear').click();
    } else if (e.key === 'p' && e.ctrlKey) {
        document.getElementById('print').click();
    }
});
