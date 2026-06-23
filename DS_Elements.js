function createTCGArenaCardElement(cardData) {
  const card = document.createElement('div');
  card.className = 'tcgarena-card';
  card.dataset.id = cardData.id;
  
  // Track states independently
  card.dataset.faceState = 'upright'; // 'upright' or 'reversed'
  card.dataset.tapState = 'untapped';  // 'untapped' or 'tapped'

  const frontFace = cardData.face.front;

  // [... Build your costHTML and innerHTML layout as before ...]
  card.innerHTML = `
    <div class="card-inner">
      <!-- Tap Overlay Button so it doesn't conflict with regular clicks -->
      <button class="card-tap-btn" title="Tap/Untap">↩</button>
      
      <img src="${frontFace.image_url}" class="card-art-frame" />
      <div class="frame-upright"><!-- Upright Text --></div>
      <div class="frame-reversed"><!-- Reversed Text --></div>
    </div>
  `;

  // Function to calculate and apply the correct physical rotation
  function updateRotation() {
    let degrees = 0;
    if (card.dataset.faceState === 'reversed') degrees += 180;
    if (card.dataset.tapState === 'tapped') degrees += 90;
    
    card.style.transform = `rotate(${degrees}deg)`;
  }

  // Action 1: Click the card body to Switch/Reverse (180 degrees)
  card.addEventListener('click', (e) => {
    // Prevent switching if they clicked the tap button
    if (e.target.classList.contains('card-tap-btn')) return;

    card.dataset.faceState = (card.dataset.faceState === 'upright') ? 'reversed' : 'upright';
    updateRotation();
  });

  // Action 2: Click the Tap icon to Tap/Untap (90 degrees)
  card.querySelector('.card-tap-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // Stop the card from reversing when tapping
    card.dataset.tapState = (card.dataset.tapState === 'untapped') ? 'tapped' : 'untapped';
    updateRotation();
  });

  return card;
}