# 🐉 Dragon Shogun - TCG Arena Module

Welcome to the digital module repository for **Dragon Shogun**, a strategic trading card game of tactical positioning, elemental alignments, and dual-state card rotation mechanics. 

This repository hosts the asset file structures and CDN links required to import and play Dragon Shogun smoothly using the custom game sandbox engine on [TCG Arena](https://tcg-arena.fr).

---

## 🎮 Supported Game Modes

The game module is pre-configured with structural validation rules for the two main styles of play:

### 1. Strategy Mode (Constructed)
* **Deck Size:** Exactly 50 cards.
* **Duplication Limits:** Maximum of 4 copies of any card by name.
* **Spell Constraints:** Strict deck-building limitation cap of up to **16 total cards** featuring the *Kyu-kyu-nyo-ritsu-ryo* spell state on their reversed layout side.

### 2. Blitz Shield Mode (Sealed/Draft)
* **Deck Size:** Exactly 40 cards.
* **Duplication Limits:** Unlimited duplicate copy limits (`99`) to accommodate open sealed-pool generation from booster packs.

---

## 🗺️ Play Zones & Table Layout

When a match is initialized, the virtual tabletop will automatically generate five designated interaction anchoring points:
* **Gates (Shields):** A horizontal row initialized face-down with exactly 5 life pools.
* **Deck:** Your library, managed face-down with native randomization draw algorithms.
* **Hand:** A hidden evaluation zone accessible only to the active player.
* **Battlefield:** The open active zone for deploying units and executing spells.
* **Hell (Graveyard):** A face-up discard pile tracking spent or destroyed assets.

---

## ⚙️ How to Import into TCG Arena

To set up your local client sandbox and start testing or playing matches, follow these steps:

### Step 1: Download the Database Configuration
1. Combine the structural framework data segments provided in the setup blocks.
2. Save the compiled text file onto your local hard drive, naming it `dragon_shogun.json`.

### Step 2: Upload the File into TCG Arena
1. Open your web browser on a desktop computer and navigate to [TCG Arena](https://tcg-arena.fr).
2. Click on the **"Find More Games"** or **"Custom Games"** option in the main navigation menu.
3. Select **"Create/Import New Profile"** and assign the title name: `Dragon Shogun`.
4. Click **"Upload Configuration"** and select your saved `dragon_shogun.json` file.

### Step 3: Build Your Deck & Launch
* Once parsed, the card database filter tabs will display all 65 unique elements alongside inline **Elementium Symbol Graphics** (`Fire`, `Water`, `Wood`, `Metal`, `Earth`) mapped directly from the repository's content delivery network links.
* Build your 40 or 50 card legal configuration, invite an opponent, and launch your match!

---

## 📁 Repository Directory Structure

To keep your files organized if you decide to branch or modify card assets later:
* `/` (Root) — Houses main game profile JSON configurations and base card faces (`DSa-XXX_EN_on.png`).
* `/icons/` — Contains clean Elementium asset symbols utilized for dynamic text-field graphics processing inside the simulation module.

---

## ⚖️ License & Credits
Dragon Shogun is an independent trading card game project. All graphic illustrations, structural mechanics, game terms, and title branding belong to the repository owner.
