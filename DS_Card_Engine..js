// 1. The Asset Dictionary (Kept separate from card costs to prevent parsing errors)
const ASSET_REFS = {
  "elements": {
    "Wood": "https://github.com/JRJeffery3rd/dragon-shogun/blob/main/Icons/icn_wood.webp?raw=true",
    "Fire": "https://github.com/JRJeffery3rd/dragon-shogun/blob/main/Icons/icn_fire.webp?raw=true",
    "Earth": "https://github.com/JRJeffery3rd/dragon-shogun/blob/main/Icons/icn_earth.webp?raw=true",
    "Metal": "https://github.com/JRJeffery3rd/dragon-shogun/blob/main/Icons/icn_metal.webp?raw=true",
    "Water": "https://github.com/JRJeffery3rd/dragon-shogun/blob/main/Icons/icn_water.webp?raw=true"
  }
};

// 2. Icon Dynamic Resolver (Replaces plain text format with clean image tags)
function resolveTextIcons(text) {
  if (!text) return "";
  return text.replace(/\{(\w+)\}/g, (match, element) => {
    if (ASSET_REFS.elements[element]) {
      return `<img src="${ASSET_REFS.elements[element]}" class="inline-element-icon" alt="${element}"/>`;
    }
    return match;
  });
}

// 3. TCGArena DOM Generator for Split/Rotated Cards
function createTCGArenaCardElement(cardData) {
  const card = document.createElement('div');
  card.className = 'tcgarena-card';
  card.dataset.id = cardData.id;
  card.dataset.state = 'upright'; // Initial state

  const frontFace = cardData.face.front;

  // Render cost elements dynamically without breaking the deckbuilder values
  let costHTML = '';
  if (frontFace.cost) {
    Object.entries(frontFace.cost).forEach(([key, val]) => {
      if (ASSET_REFS.elements[key]) {
        costHTML += `<div class="cost-symbol"><img src="${ASSET_REFS.elements[key]}"/> <span>${val}</span></div>`;
      } else {
        costHTML += `<div class="cost-symbol generic-cost"><span>${val}</span></div>`;
      }
    });
  }

  // Define the core layout template TCGArena expects
  card.innerHTML = `
    <div class="card-inner">
      <!-- Background Art Layer -->
      <img src="${frontFace.image_url}" class="card-art-frame" alt="${frontFace.name}" />

      <!-- Upright Frame (0 Degrees) -->
      <div class="frame-upright">
        <div class="card-header">
          <span class="card-name">${frontFace.name}</span>
          <div class="card-cost">${costHTML}</div>
        </div>
        <div class="card-body">
          <div class="card-type-bar">${frontFace.type} ${frontFace.traits ? `• ${frontFace.traits}` : ''}</div>
          <div class="card-text">${resolveTextIcons(frontFace.upright_text)}</div>
        </div>
        ${frontFace.power !== null ? `
          <div class="card-stats">
            <span class="stat-pwr">ATK: ${frontFace.power}</span>
            <span class="stat-hp">HP: ${frontFace.health}</span>
          </div>
        ` : ''}
      </div>

      <!-- Reversed Frame (180 Degrees Upside Down) -->
      <div class="frame-reversed">
        <div class="card-header">
          <span class="card-name">${frontFace.reverse_name || frontFace.name}</span>
        </div>
        <div class="card-body">
          <div class="card-type-bar">
            ${frontFace.reversed_type ? `${frontFace.reversed_type} • ${frontFace.reversed_traits}` : `${frontFace.type} (Reversed)`}
          </div>
          <div class="card-text">${resolveTextIcons(frontFace.reverse_text)}</div>
        </div>
        ${frontFace.reversed_power !== undefined ? `
          <div class="card-stats">
            <span class="stat-pwr">ATK: ${frontFace.reversed_power}</span>
            <span class="stat-hp">HP: ${frontFace.reversed_health}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Game Logic Event: Click to Switch (Rotate 180°)
  card.addEventListener('click', () => {
    if (card.dataset.state === 'upright') {
      card.dataset.state = 'reversed';
      card.style.transform = 'rotate(180deg)';
    } else {
      card.dataset.state = 'upright';
      card.style.transform = 'rotate(0deg)';
    }
  });

  return card;
}