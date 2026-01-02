const axios = require("axios");
const { Card } = require("../models/cards.js");

const API_KEY = "925a9c88-fc98-4eb0-ab26-846499f3f6c8";
const API_URL = "https://api.pokemontcg.io/v2/cards";

const featuredPokemon = [
  "Charizard", "Blastoise", "Venusaur",
  "Pikachu", "Raichu", "Mewtwo", "Mew",
  "Gyarados", "Dragonite", "Alakazam", "Snorlax", "Lapras"
];

async function fetchAndInsertCards() {
  try {
    const res = await axios.get(API_URL, {
      headers: { "X-Api-Key": API_KEY },
    timeout: 60000,
      params: {
        q: `(set.id:base1 OR set.id:base2 OR set.id:base3)
    AND
    (rarity:Common OR rarity:Uncommon OR rarity:Rare OR rarity:"Rare Holo")`,
        pageSize: 250
      }
    });

    for (const card of res.data.data) {
        const setNamesMap = {
  base1: "Base",
  base2: "Jungle",
  base3: "Fossil"
};

      await Card.upsert({
        name: card.name,
        set_name: setNamesMap[card.set?.id] || "Unknown Set",
        rarity: card.rarity || "Unknown",
        type: card.types ? card.types.join(", ") : "Unknown",
        image_url: card.images?.small || "",
        price: generatePrice(card.rarity),
        stock: generateStock(card.rarity)
      });

      console.log(` Carta ${card.name} insertada`);
      console.log(card.name, card.set?.id);

      await new Promise(r => setTimeout(r, 200)); 
    }

    console.log("Cartas de primera generación importadas correctamente");
  } catch (err) {
    console.error("Error al importar cartas:", err.message);
  }
}

function generatePrice(rarity) {
  switch (rarity) {
    case "Rare Holo": return Math.floor(Math.random() * 50) + 50;
    case "Rare": return Math.floor(Math.random() * 30) + 20;
    case "Uncommon": return Math.floor(Math.random() * 10) + 10;
    default: return Math.floor(Math.random() * 5) + 5;
  }
}

function generateStock(rarity) {
  return rarity.includes("Rare") ? 3 : 10;
}

module.exports = { fetchAndInsertCards, featuredPokemon };


