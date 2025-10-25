// State management
let currentGroup = null;
let currentRiddleIndex = 0;
let map = null;
let marker = null;
let answerMarker = null;
let shuffledRiddles = [];
let currentMarkerLocation = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeGroupSelection();
    loadProgress();
});

// Group Selection
function initializeGroupSelection() {
    const groupSelect = document.getElementById('group-select');
    const startBtn = document.getElementById('start-btn');

    groupSelect.addEventListener('change', function() {
        startBtn.disabled = !this.value;
    });

    startBtn.addEventListener('click', function() {
        currentGroup = groupSelect.value;
        if (currentGroup) {
            startGame();
        }
    });
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start the game
function startGame() {
    // Shuffle riddles for this team
    shuffledRiddles = shuffleArray(riddles);
    
    document.getElementById('group-selection').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('current-group').textContent = currentGroup;
    
    initializeMap();
    loadRiddle();
}

// Initialize the map
function initializeMap() {
    map = L.map('map', {
        tap: true, // Enable tap for mobile
        tapTolerance: 15, // Increase tap tolerance for easier clicking on mobile
        zoomControl: true
    }).setView(
        [DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng], 
        DEFAULT_MAP_CENTER.zoom
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(map);

    // Move zoom controls to bottom right on mobile
    if (window.innerWidth < 768) {
        map.zoomControl.setPosition('bottomright');
    }

    // Handle map clicks
    map.on('click', function(e) {
        handleMapClick(e.latlng);
    });

    // Handle submit button
    document.getElementById('submit-answer-btn').addEventListener('click', function() {
        if (currentMarkerLocation) {
            checkAnswer(currentMarkerLocation);
        }
    });

    // Fix map size after initialization (helps with mobile rendering)
    setTimeout(function() {
        map.invalidateSize();
    }, 100);
}

// Load current riddle
function loadRiddle() {
    if (currentRiddleIndex >= shuffledRiddles.length) {
        showCompletionScreen();
        return;
    }

    const riddle = shuffledRiddles[currentRiddleIndex];
    
    document.getElementById('riddle-text').textContent = riddle.text;
    document.getElementById('riddle-progress').textContent = 
        `Riddle ${currentRiddleIndex + 1} of ${shuffledRiddles.length}`;
    
    // Display fun content (inside jokes and images)
    const funContent = document.getElementById('fun-content');
    funContent.innerHTML = '';
    
    if (riddle.funnyText || riddle.imageUrl) {
        if (riddle.funnyText) {
            const funText = document.createElement('div');
            funText.className = 'fun-text';
            funText.textContent = riddle.funnyText;
            funContent.appendChild(funText);
        }
        
        if (riddle.imageUrl) {
            const funImage = document.createElement('img');
            funImage.className = 'fun-image';
            funImage.src = riddle.imageUrl;
            funImage.alt = 'Funny memory';
            funContent.appendChild(funImage);
        }
        
        funContent.classList.remove('hidden');
    } else {
        funContent.classList.add('hidden');
    }
    
    // Reset UI
    document.getElementById('answer-section').classList.add('hidden');
    document.getElementById('password-input').value = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('submit-answer-btn').disabled = true;
    currentMarkerLocation = null;
    
    // Clear markers
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
    if (answerMarker) {
        map.removeLayer(answerMarker);
        answerMarker = null;
    }

    // Recenter map
    map.setView([DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng], DEFAULT_MAP_CENTER.zoom);

    saveProgress();
}

// Handle map click for answer submission
function handleMapClick(latlng) {
    // Don't allow clicking if answer is already revealed
    if (!document.getElementById('answer-section').classList.contains('hidden')) {
        return;
    }

    // Place or update marker
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
    currentMarkerLocation = latlng;
    
    // Enable submit button
    document.getElementById('submit-answer-btn').disabled = false;
    
    // Clear previous feedback
    document.getElementById('feedback').className = 'feedback';
}

// Check if the clicked location is correct
function checkAnswer(latlng) {
    const riddle = shuffledRiddles[currentRiddleIndex];
    const correctLocation = L.latLng(riddle.lat, riddle.lng);
    const clickedLocation = L.latLng(latlng.lat, latlng.lng);
    
    const distance = correctLocation.distanceTo(clickedLocation);
    
    const feedback = document.getElementById('feedback');
    
    if (distance <= ACCEPTABLE_RADIUS) {
        // Correct!
        feedback.className = 'feedback success';
        feedback.textContent = '🎉 Correct! Head to this location and click Next when ready.';
        
        // Disable submit button after correct answer
        document.getElementById('submit-answer-btn').disabled = true;
        
        // Show answer section
        revealAnswer();
    } else {
        // Incorrect
        feedback.className = 'feedback error';
        feedback.textContent = `❌ Not quite! You're ${Math.round(distance)} meters away. Try again!`;
    }
}

// Reveal button handler
document.getElementById('reveal-btn').addEventListener('click', function() {
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;
    
    if (password === GIVE_UP_PASSWORD) {
        document.getElementById('password-error').textContent = '';
        revealAnswer();
    } else {
        document.getElementById('password-error').textContent = 'Incorrect password!';
    }
});

// Reveal the answer
function revealAnswer() {
    const riddle = shuffledRiddles[currentRiddleIndex];
    
    document.getElementById('answer-text').textContent = riddle.answer;
    document.getElementById('answer-section').classList.remove('hidden');
    
    // Show correct location on map
    if (answerMarker) {
        map.removeLayer(answerMarker);
    }
    
    const correctIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    answerMarker = L.marker([riddle.lat, riddle.lng], { icon: correctIcon })
        .addTo(map)
        .bindPopup(riddle.answer)
        .openPopup();
    
    map.setView([riddle.lat, riddle.lng], 16);
}

// Next riddle button
document.getElementById('next-riddle-btn').addEventListener('click', function() {
    currentRiddleIndex++;
    loadRiddle();
});

// Show completion screen
function showCompletionScreen() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('completion-screen').classList.add('active');
    document.getElementById('completion-group').textContent = 
        `${currentGroup} - You finished all riddles!`;
    
    // Clear progress
    clearProgress();
}

// Restart button
document.getElementById('restart-btn').addEventListener('click', function() {
    currentRiddleIndex = 0;
    currentMarkerLocation = null;
    shuffledRiddles = [];
    document.getElementById('completion-screen').classList.remove('active');
    document.getElementById('group-selection').classList.add('active');
    document.getElementById('group-select').value = '';
    document.getElementById('start-btn').disabled = true;
});

// Progress management (localStorage)
function saveProgress() {
    if (currentGroup) {
        const progress = {
            group: currentGroup,
            riddleIndex: currentRiddleIndex
        };
        localStorage.setItem('treasureHuntProgress', JSON.stringify(progress));
    }
}

function loadProgress() {
    const saved = localStorage.getItem('treasureHuntProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        
        // Optional: Auto-resume (commented out by default)
        // Uncomment the lines below if you want to auto-resume progress
        /*
        currentGroup = progress.group;
        currentRiddleIndex = progress.riddleIndex;
        if (currentGroup && currentRiddleIndex < riddles.length) {
            startGame();
        }
        */
    }
}

function clearProgress() {
    localStorage.removeItem('treasureHuntProgress');
}

