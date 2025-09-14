import { createStore } from 'vuex';

const initialState = {
    // --- Game State ---
    money: 0,
    commonFishCount: 0,
    exoticFishCount: 0,
    trashCount: 0,
    treasuresCount: 0,
    energy: 100,
    gameTime: 360, // In-game minutes
    currentDay: 1,
    currentPartOfDay: 'dawn', // dawn, noon, afternoon, night
    currentSeason: 'spring', // spring, summer, autumn, winter
    temperature: 15,
    isNight: false,
    isFishing: false,
    fishingDepth: null, // 'normal', 'deep'
    boatPosition: 50,
    boatPositionY: 45,
    currentRod: 0,
    currentBoat: 0,
    unlockedRods: [true, false, false],
    unlockedBoats: [true, false, false, false, false],
    caughtFishInventory: [],
    caughtTrashInventory: [],
    caughtTreasuresInventory: [],
    fishCaughtSinceSleep: 0,
    consumableInventory: {
      coffee: 0,
      energyDrink: 0,
    },
    fishingStats: {
    totalCaught: 0,
    totalValue: 0,
    fishByType: {}
    },
    recycledObjects: {
    totalRecycled: 0,
    totalRecycledValue: 0,
    },
    messages: [],
    fishFighting: false,
    fishToCatch: null,
    fishFightProgress: 0,
    fishFightRequiredTaps: 0,
    fishFightTimer: 0,
    fishFightActive: false,
    currentEvent: null,
    eventActive: false,
    modals: {
    market: false,
    stats: false,
    goals: false,
    recycle: false,
    treasures: false,
    instructions: false,
    equipment: false,
    settings: false,
    map: false,
    credits: false,
    },
    musicMuted: false,
    currentZone: 1,
    zones: [
    { id: 1, name: "Lago Clemente", cost: 0, unlocked: true, color: "#4a90e2" },
    { id: 2, name: "Lago Mafalda", cost: 15000, unlocked: false, color: "#50e3c2" },
    { id: 3, name: "Mar Diogenes", cost: 30000, unlocked: false, color: "#bd10e0" },
    { id: 4, name: "Mar Profundo de Boogie el aceitoso", cost: 100000, unlocked: false, color: "#9013fe" },
    { id: 5, name: "Laguna Tía Vicenta", cost: 650000, unlocked: false, color: "#f5a623" },
    { id: 6, name: "Laguna Patoruzú", cost: 1250000, unlocked: false, color: "#d0021b" },
    ],
    currentGoals: [],
    completedGoals: [],
    goalDefinitions: {
        // Tutorial/Early Game Goals
        'goal_catch_50_common_fish': { id: 'goal_catch_50_common_fish', description: "Pesca 50 peces comunes", type: "catchCommonFish", target: 50, reward: 15000, category: "tutorial" },
        'goal_earn_10000_money': { id: 'goal_earn_10000_money', description: "Gana $10,000", type: "earnMoney", target: 10000, reward: 5000, category: "tutorial" },
        'goal_buy_pro_rod': { id: 'goal_buy_pro_rod', description: "Compra la Caña Profesional", type: "buyRod", target: 1, reward: 7500, category: "equipment" },
        'goal_buy_adv_boat': { id: 'goal_buy_adv_boat', description: "Compra el Barco Avanzado", type: "buyBoat", target: 1, reward: 15000, category: "equipment" },
        'goal_one_year_fishing': { id: 'goal_one_year_fishing', description: "Cumple un año pescando (Día 13)", type: "reachDay", target: 13, reward: 12000, category: "time" },
        'goal_two_years_fishing': { id: 'goal_two_years_fishing', description: "Cumple 2 años pescando (Día 25)", type: "reachDay", target: 25, reward: 24000, category: "time" },
        'goal_five_years_fishing': { id: 'goal_five_years_fishing', description: "Cumple 5 años pescando (Día 61)", type: "reachDay", target: 61, reward: 60000, category: "time" },
        'goal_ten_years_fishing': { id: 'goal_ten_years_fishing', description: "Cumple 10 años pescando (Día 121)", type: "reachDay", target: 121, reward: 120000, category: "time" },
    
        // Incremental Fishing Goals (Common)
        'goal_catch_200_common_fish': { id: 'goal_catch_200_common_fish', description: "Pesca 200 peces comunes", type: "catchCommonFish", target: 200, reward: 30000, category: "fishing" },
        'goal_catch_500_common_fish': { id: 'goal_catch_500_common_fish', description: "Pesca 500 peces comunes", type: "catchCommonFish", target: 500, reward: 75000, category: "fishing" },
        'goal_catch_1000_common_fish': { id: 'goal_catch_1000_common_fish', description: "Pesca 1000 peces comunes", type: "catchCommonFish", target: 1000, reward: 150000, category: "fishing" },
    
        // Incremental Fishing Goals (Exotic)
        'goal_catch_10_exotic_fish': { id: 'goal_catch_10_exotic_fish', description: "Pesca 10 peces exóticos", type: "catchExoticFish", target: 10, reward: 25000, category: "fishing" },
        'goal_catch_50_exotic_fish': { id: 'goal_catch_50_exotic_fish', description: "Pesca 50 peces exóticos", type: "catchExoticFish", target: 50, reward: 125000, category: "fishing" },
        'goal_catch_100_exotic_fish': { id: 'goal_catch_100_exotic_fish', description: "Pesca 100 peces exóticos", type: "catchExoticFish", target: 100, reward: 250000, category: "fishing" },
    
        // Incremental Fishing Goals (Legendary)
        'goal_catch_1_legendary_fish': { id: 'goal_catch_1_legendary_fish', description: "Pesca 1 pez legendario", type: "catchLegendaryFish", target: 1, reward: 50000, category: "fishing" },
        'goal_catch_5_legendary_fish': { id: 'goal_catch_5_legendary_fish', description: "Pesca 5 peces legendarios", type: "catchLegendaryFish", target: 5, reward: 250000, category: "fishing" },
        'goal_catch_10_legendary_fish': { id: 'goal_catch_10_legendary_fish', description: "Pesca 10 peces legendarios", type: "catchLegendaryFish", target: 10, reward: 500000, category: "fishing" },
    
        // Money Goals
        'goal_earn_50000_money': { id: 'goal_earn_50000_money', description: "Gana $50,000", type: "earnMoney", target: 50000, reward: 10000, category: "money" },
        'goal_earn_250000_money': { id: 'goal_earn_250000_money', description: "Gana $250,000", type: "earnMoney", target: 250000, reward: 50000, category: "money" },
        'goal_earn_1000000_money': { id: 'goal_earn_1000000_money', description: "Gana $1,000,000", type: "earnMoney", target: 1000000, reward: 200000, category: "money" },
        'goal_earn_5000000_money': { id: 'goal_earn_5000000_money', description: "Gana $5,000,000", type: "earnMoney", target: 5000000, reward: 1000000, category: "money" },
    
        // Recycling Goals
        'goal_recycle_50_items': { id: 'goal_recycle_50_items', description: "Recicla 50 objetos", type: "recycleItems", target: 50, reward: 10000, category: "recycling" },
        'goal_recycle_200_items': { id: 'goal_recycle_200_items', description: "Recicla 200 objetos", type: "recycleItems", target: 200, reward: 40000, category: "recycling" },
        'goal_recycle_1000_items': { id: 'goal_recycle_1000_items', description: "Recicla 1000 objetos", type: "recycleItems", target: 1000, reward: 200000, category: "recycling" },
    
        // Treasure Goals
        'goal_find_5_treasures': { id: 'goal_find_5_treasures', description: "Encuentra 5 tesoros", type: "findTreasure", target: 5, reward: 25000, category: "treasure" },
        'goal_find_15_treasures': { id: 'goal_find_15_treasures', description: "Encuentra 15 tesoros", type: "findTreasure", target: 15, reward: 75000, category: "treasure" },
        'goal_find_all_unique_treasures': { id: 'goal_find_all_unique_treasures', description: "Encuentra todos los tesoros únicos", type: "findAllUniqueTreasures", target: 28, reward: 500000, category: "treasure" },
    
        // Equipment Goals
        'goal_buy_master_rod': { id: 'goal_buy_master_rod', description: "Compra la Caña Maestra", type: "buyRod", target: 2, reward: 50000, category: "equipment" },
        'goal_buy_pro_boat': { id: 'goal_buy_pro_boat', description: "Compra el Barco Profesional", type: "buyBoat", target: 2, reward: 100000, category: "equipment" },
        'goal_buy_pesquero_boat': { id: 'goal_buy_pesquero_boat', description: "Compra el Barco Pesquero", type: "buyBoat", target: 3, reward: 200000, category: "equipment" },
        'goal_buy_crucero_boat': { id: 'goal_buy_crucero_boat', description: "Compra el Crucero", type: "buyBoat", target: 4, reward: 500000, category: "equipment" },
    
        // Zone Goals
        'goal_unlock_zone_2': { id: 'goal_unlock_zone_2', description: "Desbloquea el Lago Mafalda", type: "unlockZone", target: 2, reward: 10000, category: "zone" },
        'goal_unlock_zone_3': { id: 'goal_unlock_zone_3', description: "Desbloquea el Mar Diogenes", type: "unlockZone", target: 3, reward: 20000, category: "zone" },
        'goal_unlock_zone_4': { id: 'goal_unlock_zone_4', description: "Desbloquea el Mar Profundo de Boogie el aceitoso", type: "unlockZone", target: 4, reward: 30000, category: "zone" },
        'goal_unlock_zone_5': { id: 'goal_unlock_zone_5', description: "Desbloquea la Laguna Tía Vicenta", type: "unlockZone", target: 5, reward: 40000, category: "zone" },
        'goal_unlock_zone_6': { id: 'goal_unlock_zone_6', description: "Desbloquea la Laguna Patoruzú", type: "unlockZone", target: 6, reward: 50000, category: "zone" },
    
        // Specific Fish Goals
        'goal_catch_shark': { id: 'goal_catch_shark', description: "Pesca un Tiburón", type: "catchSpecificFish", fishName: "Tiburón", target: 1, reward: 30000, category: "fishing" },
        'goal_catch_golden_fish': { id: 'goal_catch_golden_fish', description: "Pesca un Pez Dorado", type: "catchSpecificFish", fishName: "Pez Dorado", target: 1, reward: 25000, category: "fishing" },
        'goal_catch_celestial_dragon_fish': { id: 'goal_catch_celestial_dragon_fish', description: "Pesca un Pez Dragón Celestial", type: "catchSpecificFish", fishName: "Pez Dragón Celestial", target: 1, reward: 100000, category: "fishing" },
    
        // Specific Treasure Goals
        'goal_find_nokia_1100': { id: 'goal_find_nokia_1100', description: "Encuentra un Nokia 1100", type: "findSpecificTreasure", treasureName: "Nokia 1100", target: 1, reward: 15000, category: "treasure" },
        'goal_find_diamond': { id: 'goal_find_diamond', description: "Encuentra un Diamante", type: "findSpecificTreasure", treasureName: "Diamante", target: 1, reward: 100000, category: "treasure" },
    
        // Category Completion Goals
        'goal_complete_all_fishing_goals': { id: 'goal_complete_all_fishing_goals', description: "Completa todos los objetivos de pesca", type: "completeAllCategoryGoals", category: "fishing", reward: 100000, category: "completionist" },
        'goal_complete_all_treasure_goals': { id: 'goal_complete_all_treasure_goals', description: "Completa todos los objetivos de tesoros", type: "completeAllCategoryGoals", category: "treasure", reward: 100000, category: "completionist" },
        'goal_complete_all_equipment_goals': { id: 'goal_complete_all_equipment_goals', description: "Completa todos los objetivos de equipamiento", type: "completeAllCategoryGoals", category: "equipment", reward: 100000, category: "completionist" },
        'goal_complete_all_money_goals': { id: 'goal_complete_all_money_goals', description: "Completa todos los objetivos de dinero", type: "completeAllCategoryGoals", category: "money", reward: 100000, category: "completionist" },
        'goal_complete_all_recycling_goals': { id: 'goal_complete_all_recycling_goals', description: "Completa todos los objetivos de reciclaje", type: "completeAllCategoryGoals", category: "recycling", reward: 100000, category: "completionist" },
        'goal_complete_all_zone_goals': { id: 'goal_complete_all_zone_goals', description: "Completa todos los objetivos de zonas", type: "completeAllCategoryGoals", category: "zone", reward: 100000, category: "completionist" },
        },
    tips: [
    "Los tiburones son criaturas nocturnas. Intenta pescar de noche para tener la oportunidad de atrapar uno.",
    "Los tesoros más valiosos se esconden en las profundidades. Necesitarás el Barco Profesional para llegar a ellos.",
    "La pesca en aguas profundas consume más energía, pero las recompensas valen la pena el esfuerzo.",
    "El mercado es tu mejor amigo. Vende tu pescado allí para ganar dinero y mejorar tu equipo.",
    "No subestimes el valor de la basura. Reciclarla te dará un ingreso extra constante.",
    "Una mejor caña y un barco más resistente te permitirán atrapar peces más raros y valiosos.",
    "El tiempo es clave. Algunos peces solo aparecen en momentos específicos del día.",
    "Descansar es esencial. Dormir restaurará toda tu energía para un nuevo día de pesca.",
    "La música le da un toque especial a la vida, pero puedes silenciarla si prefieres la tranquilidad del mar.",
    "Conviértete en una leyenda de la pesca completando todos los logros del juego.",
    "Explora el mapa. Hay muchos lugares para pescar, pero algunos son más fructíferos que otros.",
    "La paciencia es la clave del éxito en la pesca. No te rindas, y serás recompensado.",
    "No pierdas de vista tus objetivos. Completarlos te dará recompensas adicionales y te guiará en tu aventura.",
    "Los peces exóticos son una fuente de ingresos mucho mayor que los comunes. ¡Ve por ellos!",
    "Al principio es normal pescar basura. No te desanimes, ¡la práctica hace al maestro!",
    "Invierte en tu equipo. Ahorra dinero para comprar las mejores herramientas y verás la diferencia.",
    "Los peces legendarios son el mayor desafío. Atrapa uno y tu nombre será recordado para siempre.",
    "El amanecer y el atardecer son momentos mágicos para pescar. ¡Aprovéchalos!",
    "Disfruta del viaje. La pesca es una oportunidad para relajarse y conectar con la naturaleza.",
    "Compite con tus amigos. Comparte tus logros y demuestra quién es el mejor pescador.",
    "Algunos peces prefieren el calor del verano, mientras que otros solo aparecen en el frío invierno. ¡Presta atención a la temperatura!",
    "Las estaciones cambian cada 4 días. ¡Aprovecha los cambios para encontrar peces especiales!",
    "Si buscas un pez específico, consulta su hábitat estacional y de temperatura. ¡La paciencia y la estrategia son clave!"
    ],
    // --- Game Configuration ---
    fishingRods: [
    { name: "Caña Básica", power: 1, speed: 1, catchRate: 0.6, price: 0 },
    { name: "Caña Profesional", power: 1.5, speed: 1.3, catchRate: 0.75, price: 5000 },
    { name: "Caña Maestra", power: 2, speed: 1.6, catchRate: 0.9, price: 23000 }
    ],
    boats: [
    { name: "Barco Básico", speedMultiplier: 1, catchBonus: 1, price: 0, image: 'https://moroarte.com/games/boat.png' },
    { name: "Barco Avanzado", speedMultiplier: 1.5, catchBonus: 1.2, price: 25000, image: 'https://moroarte.com/games/botelvl1.png' },
    { name: "Barco Profesional", speedMultiplier: 2, catchBonus: 1.5, price: 100000, image: 'https://moroarte.com/games/botelvl2.png' },
    { name: "Barco Pesquero", speedMultiplier: 2.5, catchBonus: 2, price: 500000, image: 'https://moroarte.com/games/botelvl3.png' },
    { name: "Crucero", speedMultiplier: 3, catchBonus: 2.5, price: 1000000, image: 'https://moroarte.com/games/botelvl4.png' }
    ],
    trashTypes: [
    { name: "Botella de Plástico", recycleValue: 133 },
    { name: "Red Vieja", recycleValue: 546 },
    { name: "Lata de Conserva", recycleValue: 511 },
    { name: "Botella de Vidrio", recycleValue: 334 },
    { name: "Neumático de Goma", recycleValue: 1534 },
    { name: "Sedal de Pesca", recycleValue: 104 },
    { name: "Chatarra de Metal", recycleValue: 350 },
    { name: "Bolsa de Plástico", recycleValue: 56 },
    { name: "Caña Rota", recycleValue: 1444 },
    { name: "Contenedor de Aceite", recycleValue: 2406 },
    { name: "Bebida Energizante", recycleValue: 10, consumable: { name: 'energyDrink', energy: 20 } },
    { name: "Café", recycleValue: 5, consumable: { name: 'coffee', energy: 10 } },
    { name: "Bebida Energizante", recycleValue: 10, consumable: { name: 'energyDrink', energy: 20 } },
    { name: "Café", recycleValue: 5, consumable: { name: 'coffee', energy: 10 } },
    { name: "Bebida Energizante", recycleValue: 10, consumable: { name: 'energyDrink', energy: 20 } },
    { name: "Café", recycleValue: 5, consumable: { name: 'coffee', energy: 10 } },
    { name: "Bebida Energizante", recycleValue: 10, consumable: { name: 'energyDrink', energy: 20 } },
    { name: "Café", recycleValue: 5, consumable: { name: 'coffee', energy: 10 } },
    { name: "Bebida Energizante", recycleValue: 10, consumable: { name: 'energyDrink', energy: 20 } },
    { name: "Café", recycleValue: 5, consumable: { name: 'coffee', energy: 10 } },
    ],
    fishTypes: [
    // Zone 1: Lago Clemente
    { name: "Sardina", value: 58, color: "silver", speed: 1, rarity: 0.4, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 1, seasonalBonus: { summer: 1.5, autumn: 1.2 }, temperatureRange: [15, 30] },
    { name: "Pez Payaso", value: 83, color: "orange", speed: 1.4, rarity: 0.3, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon'], zone: 1, seasonalBonus: { spring: 1.5, summer: 1.2 }, temperatureRange: [10, 25] },
    { name: "Lenguado", value: 153, color: "tan", speed: 1.3, rarity: 0.2, isExotic: false, partOfDay: ['noon', 'afternoon'], zone: 1 },
    { name: "Atún", value: 105, color: "darkblue", speed: 1.2, rarity: 0.15, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 1 },
    { name: "Salmón", value: 578, color: "salmon", speed: 1.5, rarity: 0.1, isExotic: false, partOfDay: ['dawn', 'afternoon'], zone: 1, seasonalBonus: { spring: 1.3, winter: 1.1 }, temperatureRange: [5, 15] },

    // Zone 2: Lago Mafalda
    { name: "Pez Globo", value: 2304, color: "yellow", speed: 1.8, rarity: 0.08, isExotic: false, partOfDay: ['noon'], zone: 2 },
    { name: "Pez Espada", value: 2933, color: "gray", speed: 2.2, rarity: 0.05, isExotic: false, partOfDay: ['afternoon', 'night'], zone: 2 },
    { name: "Lubina", value: 3550, color: "silver", speed: 1.6, rarity: 0.03, isExotic: false, partOfDay: ['dawn', 'night'], zone: 2 },

    // Zone 3: Mar Diogenes
    { name: "Pez Dorado", value: 4400, color: "gold", speed: 2, rarity: 0.02, isExotic: true, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 3 },
    { name: "Tiburón", value: 5500, color: "darkgray", speed: 2.5, rarity: 0.01, isExotic: true, partOfDay: ['night'], zone: 3, seasonalBonus: { winter: 1.5 }, temperatureRange: [-5, 5] },

    // Zone 4: Mar Profundo de Boogie el aceitoso
    { name: "Guardián del Coral", value: 15004, color: "#FF7F50", speed: 2.5, rarity: 0.008, requirements: { boat: 1, rod: 1 }, isExotic: true, partOfDay: ['noon'], zone: 4 },
    { name: "Cazador Nocturno", value: 22000, color: "#4682B4", speed: 2.6, rarity: 0.007, requirements: { boat: 2, rod: 1 }, isExotic: true, partOfDay: ['night'], zone: 4 },

    // Zone 5: Laguna Tía Vicenta
    { name: "Pez Arcoíris", value: 35000, color: "#FF1493", speed: 2.8, rarity: 0.006, requirements: { boat: 1, rod: 2 }, isExotic: true, partOfDay: ['dawn'], zone: 5 },
    { name: "Pez Espectral", value: 8500, color: "#f8f8f2", speed: 2.2, rarity: 0.005, isExotic: true, partOfDay: ['night'], zone: 5 },
    { name: "Serpiente Marina", value: 8503, color: "#50fa7b", speed: 2.3, rarity: 0.004, isExotic: true, partOfDay: ['afternoon'], zone: 5 },

    // Zone 6: Laguna Patoruzú
    { name: "Medusa de Cristal", value: 19033, color: "#8be9fd", speed: 2.4, rarity: 0.003, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Unicornio", value: 12345, color: "#bd93f9", speed: 2.5, rarity: 0.002, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Sirena Escamada", value: 45000, color: "#ff79c6", speed: 2.6, rarity: 0.001, isExotic: true, partOfDay: ['noon'], zone: 6 },
    { name: "Mini Kraken", value: 38500, color: "#8b0000", speed: 2.7, rarity: 0.0008, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Fénix", value: 42000, color: "#ff5555", speed: 2.8, rarity: 0.0006, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Quimera Luminosa", value: 75000, color: "#50fa7b", speed: 3.0, rarity: 0.0004, isExotic: true, partOfDay: ['afternoon'], zone: 6 },
    { name: "Leviatán Abisal", value: 58000, color: "#1e0f3d", speed: 3.2, rarity: 0.0002, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Dragón Celestial", value: 74500, color: "#4a90e2", speed: 3.5, rarity: 0.0001, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Emperador del Océano", value: 130000, color: "#00008B", speed: 3.7, rarity: 0.00008, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['noon'], zone: 6 },
    { name: "Pez Ancestral", value: 720333, color: "#4B0082", speed: 3.8, rarity: 0.00006, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['afternoon'], zone: 6 },
    { name: "Leviatán de las Profundidades", value: 455000, color: "#800080", speed: 4.0, rarity: 0.00004, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['night'], zone: 6 },
    ],
    treasureTypes: [
    // Zone 1
    { name: "Piedra pomez", value: 10, isCollectible: true, rarity: 0.2, zone: 1, zoneName: "Lago Clemente" },
    { name: "Piedra azul", value: 50, isCollectible: true, rarity: 0.15, zone: 1, zoneName: "Lago Clemente" },
    { name: "Piedra naranja brillante", value: 75, isCollectible: true, rarity: 0.1, zone: 1, zoneName: "Lago Clemente" },
    { name: "Cofre del tesoro vacío", value: 100, isCollectible: true, rarity: 0.1, zone: 1, zoneName: "Lago Clemente" },
    { name: "Reloj de cuco", value: 100, isCollectible: true, rarity: 0.08, zone: 1, zoneName: "Lago Clemente" },

    // Zone 2
    { name: "Botella de ron añejo", value: 500, isCollectible: false, rarity: 0.07, zone: 2, zoneName: "Lago Mafalda" },
    { name: "Nokia 1100", value: 1100, isCollectible: true, rarity: 0.07, zone: 2, zoneName: "Lago Mafalda" },
    { name: "Motorola", value: 2009, isCollectible: true, rarity: 0.06, zone: 2, zoneName: "Lago Mafalda" },
    { name: "Casco normando", value: 1500, isCollectible: true, rarity: 0.04, zone: 2, zoneName: "Lago Mafalda" },

    // Zone 3
    { name: "iPhone 7", value: 5090, isCollectible: true, rarity: 0.05, zone: 3, zoneName: "Mar Diogenes" },
    { name: "Reloj de plata", value: 8500, isCollectible: false, rarity: 0.03, zone: 3, zoneName: "Mar Diogenes" },
    { name: "Anillo de compromiso", value: 3000, isCollectible: false, rarity: 0.025, zone: 3, zoneName: "Mar Diogenes" },
    { name: "Daga ceremonial", value: 2000, isCollectible: true, rarity: 0.035, zone: 3, zoneName: "Mar Diogenes" },

    // Zone 4
    { name: "Perla", value: 10000, isCollectible: false, rarity: 0.1, zone: 4, zoneName: "Mar Profundo de Boogie el aceitoso" },
    { name: "Reloj de oro", value: 15000, isCollectible: false, rarity: 0.02, zone: 4, zoneName: "Mar Profundo de Boogie el aceitoso" },
    { name: "Collar de oro", value: 17500, isCollectible: false, rarity: 0.015, zone: 4, zoneName: "Mar Profundo de Boogie el aceitoso" },
    { name: "Cáliz de plata", value: 4000, isCollectible: false, rarity: 0.02, zone: 4, zoneName: "Mar Profundo de Boogie el aceitoso" },

    // Zone 5
    { name: "Corona de oro", value: 40000, isCollectible: false, rarity: 0.005, zone: 5, zoneName: "Laguna Tía Vicenta" },
    { name: "Moneda de oro antigua", value: 51500, isCollectible: false, rarity: 0.05, zone: 5, zoneName: "Laguna Tía Vicenta" },
    { name: "Esmeralda", value: 7500, isCollectible: false, rarity: 0.015, zone: 5, zoneName: "Laguna Tía Vicenta" },
    { name: "Lingote de plata", value: 6000, isCollectible: false, rarity: 0.01, zone: 5, zoneName: "Laguna Tía Vicenta" },

    // Zone 6
    { name: "Diamante", value: 190000, isCollectible: false, rarity: 0.01, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Rubí", value: 65000, isCollectible: false, rarity: 0.018, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Zafiro", value: 55500, isCollectible: false, rarity: 0.019, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Lingote de oro", value: 15000, isCollectible: false, rarity: 0.008, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Estatuilla de jade", value: 55000, isCollectible: true, rarity: 0.02, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Máscara de oro inca", value: 15000, isCollectible: true, rarity: 0.007, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Sarcófago egipcio en miniatura", value: 10000, isCollectible: true, rarity: 0.01, zone: 6, zoneName: "Laguna Patoruzú" },
    { name: "Jarrón griego antiguo", value: 58000, isCollectible: true, rarity: 0.012, zone: 6, zoneName: "Laguna Patoruzú" },
    ],
};

const store = createStore({
    state() {
        return JSON.parse(JSON.stringify(initialState));
    },
    mutations: {
        RESTART_GAME(state) {
            const s = JSON.parse(JSON.stringify(initialState));
            Object.keys(s).forEach(key => {
                state[key] = s[key];
            });
        },
        setMoney(state, amount) { state.money = amount; },
        addMoney(state, amount) { 
            let finalAmount = amount;
            if (state.eventActive && state.currentEvent.type === 'storm') {
                if (state.currentEvent.effect === 'double_rewards') {
                    finalAmount *= 2;
                } else if (state.currentEvent.effect === 'halve_rewards') {
                    finalAmount *= 0.5;
                }
            }
            state.money += finalAmount; 
        },
        spendMoney(state, amount) { state.money -= amount; },
        addEnergy(state, amount) {
          state.energy = Math.min(100, state.energy + amount);
        },
        setEnergy(state, amount) { state.energy = amount; },
        setGameTime(state, time) { state.gameTime = time; },
        setCurrentDay(state, day) { state.currentDay = day; },
        setIsNight(state, isNight) { state.isNight = isNight; },
        setIsFishing(state, isFishing) { state.isFishing = isFishing; },
        setCurrentPartOfDay(state, part) { state.currentPartOfDay = part; },
        setCurrentSeason(state, season) { state.currentSeason = season; },
        setTemperature(state, temp) { state.temperature = temp; },
        setFishingDepth(state, depth) { state.fishingDepth = depth; },
        setBoatPosition(state, { x, y }) {
        if (x !== undefined) state.boatPosition = x;
        if (y !== undefined) state.boatPositionY = y;
        },
        setCurrentRod(state, index) { state.currentRod = index; },
        setCurrentBoat(state, index) { state.currentBoat = index; },
        unlockRod(state, index) { state.unlockedRods[index] = true; },
        unlockBoat(state, index) { state.unlockedBoats[index] = true; },
        addMessage(state, message) {
        const id = Date.now() + Math.random();
        state.messages.push({ ...message, id });
        setTimeout(() => {
            const index = state.messages.findIndex(m => m.id === id);
            if (index !== -1) {
            state.messages.splice(index, 1);
            }
        }, 3000); // Remove message after 3 seconds
        },
        addCaughtTrash(state, trash) { state.caughtTrashInventory.push(trash); },
        setCaughtTrashInventory(state, inventory) { state.caughtTrashInventory = inventory; },
        addCaughtFish(state, fish) { state.caughtFishInventory.push(fish); },
        setCaughtFishInventory(state, inventory) { state.caughtFishInventory = inventory; },
        incrementCommonFishCount(state) {
        state.commonFishCount++;
        state.fishCaughtSinceSleep++;
        },
        incrementExoticFishCount(state) {
        state.exoticFishCount++;
        state.fishCaughtSinceSleep++;
        },
        incrementTrashCount(state) { state.trashCount++; },
        incrementTreasuresCount(state) { state.treasuresCount++; },
        addCaughtTreasure(state, treasure) { state.caughtTreasuresInventory.push(treasure); },
        resetFishCaughtSinceSleep(state) { state.fishCaughtSinceSleep = 0; },
        updateFishingStats(state, { fish, value }) {
            if (!state.fishingStats.fishByType[fish.name]) {
                state.fishingStats.fishByType[fish.name] = { count: 0, totalValue: 0 };
            }
            state.fishingStats.fishByType[fish.name].count++;
            state.fishingStats.fishByType[fish.name].totalValue += value;
            state.fishingStats.totalCaught++;
            state.fishingStats.totalValue += value;
        },
        toggleModal(state, modal) { state.modals[modal] = !state.modals[modal]; },
        recycle(state, { count, value }) {
        state.recycledObjects.totalRecycled += count;
        state.recycledObjects.totalRecycledValue += value;
        },
        addGoal(state, goalId) {
        const goalDefinition = state.goalDefinitions[goalId];
        if (goalDefinition && !state.currentGoals.some(g => g.id === goalId) && !state.completedGoals.some(g => g.id === goalId)) {
            state.currentGoals.push({ ...goalDefinition, current: 0, completed: false });
        }
        },
        updateGoalProgress(state, { type, amount, id = null, day = null }) {
        state.currentGoals.forEach(goal => {
            // If an ID is provided, only update that specific goal
            if (id && goal.id !== id) {
            return;
            }
            if (goal.type === type && !goal.completed) {
                if (type === 'reachDay') {
                    goal.current = day;
                } else {
                    goal.current += amount;
                }
                if (goal.current >= goal.target) {
                    goal.current = goal.target; // Cap current at target
                }
            }
        });
        },
        completeGoal(state, goalId) {
        const index = state.currentGoals.findIndex(g => g.id === goalId);
        if (index !== -1) {
            const goal = state.currentGoals[index];
            goal.completed = true;
            state.completedGoals.push(goal);
            state.currentGoals.splice(index, 1); // Remove from current goals
        }
        },
        setFishFighting(state, value) {
        state.fishFighting = value;
        },
        setFishToCatch(state, fish) {
        state.fishToCatch = fish;
        },
        setFishFightProgress(state, progress) { state.fishFightProgress = progress; },
        setFishFightRequiredTaps(state, taps) { state.fishFightRequiredTaps = taps; },
        setFishFightTimer(state, time) { state.fishFightTimer = time; },
        setFishFightActive(state, active) { state.fishFightActive = active; },
        incrementFishFightProgress(state) { state.fishFightProgress++; },
        unlockZone(state, zoneId) {
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone) {
            zone.unlocked = true;
        }
        },
        setCurrentZone(state, zoneId) {
        state.currentZone = zoneId;
        },
        updateUniqueTreasureGoal(state) {
        const uniqueTreasures = new Set(state.caughtTreasuresInventory.map(t => t.name));
        const goal = state.currentGoals.find(g => g.type === 'findAllUniqueTreasures');
        if (goal) {
            goal.current = uniqueTreasures.size;
        }
        },
        addConsumable(state, { consumable, quantity }) {
            state.consumableInventory[consumable] += quantity;
        },
        useConsumable(state, consumable) {
            state.consumableInventory[consumable]--;
        },
        toggleMusic(state) { state.musicMuted = !state.musicMuted; },
        updateZoneGoal(state, zoneId) {
            const goal = state.currentGoals.find(g => g.type === 'unlockZone' && g.target === zoneId);
            if (goal) {
                goal.current = zoneId;
            }
        },
        updateSpecificGoal(state, { type, name }) {
            const goal = state.currentGoals.find(g => g.type === type && g.fishName === name);
            if (goal) {
                goal.current++;
            }
        },
        setEvent(state, event) {
            state.currentEvent = event;
            state.eventActive = !!event;
        },
    },
    actions: {
        restartGame({ commit }) {
            commit('RESTART_GAME');
            commit('addMessage', { text: 'El juego se ha reiniciado.', type: 'system' });
            dispatch('initializeGame');
        },
        initializeGame({ commit, dispatch }) {
        commit('toggleModal', 'instructions');
        commit('addMessage', { text: '¡Bienvenido a Fisherboy! Lanzá tu caña y que comience la aventura.', type: 'system' });
        // Add initial goals
        commit('addGoal', 'goal_catch_50_common_fish');
        commit('addGoal', 'goal_earn_10000_money');
        commit('addGoal', 'goal_one_year_fishing');
        commit('addGoal', 'goal_buy_pro_rod');
        commit('addGoal', 'goal_buy_adv_boat');
        commit('addGoal', 'goal_buy_pesquero_boat');
        commit('addGoal', 'goal_buy_crucero_boat');
        commit('addGoal', 'goal_catch_10_exotic_fish');
        commit('addGoal', 'goal_catch_1_legendary_fish');
        commit('addGoal', 'goal_find_5_treasures');
        commit('addGoal', 'goal_earn_1000000_money');
        commit('addGoal', 'goal_earn_5000000_money');
        commit('addGoal', 'goal_two_years_fishing');
        commit('addGoal', 'goal_five_years_fishing');
        commit('addGoal', 'goal_ten_years_fishing');
        },
        showRandomTip({ commit, state }) {
        if (state.messages.length === 0) {
            const randomIndex = Math.floor(Math.random() * state.tips.length);
            const tip = state.tips[randomIndex];
            commit('addMessage', { text: `Consejo: ${tip}`, type: 'tip' });
        }
        },
        updateClimate({ commit, state }) {
            const isNight = state.gameTime < 360 || state.gameTime > 1080;
            if (isNight !== state.isNight) commit('setIsNight', isNight);

            let partOfDay = 'night';
            if (state.gameTime >= 300 && state.gameTime < 720) {
                partOfDay = 'dawn';
            } else if (state.gameTime >= 720 && state.gameTime < 1080) {
                partOfDay = 'noon';
            } else if (state.gameTime >= 1080 && state.gameTime < 1320) {
                partOfDay = 'afternoon';
            }
            if (partOfDay !== state.currentPartOfDay) {
                commit('setCurrentPartOfDay', partOfDay);
            }

            // New season logic
            const seasons = ['spring', 'summer', 'autumn', 'winter'];
            // Adjust seasonIndex so that Day 1 (currentDay = 1) is Summer (index 1)
            // (currentDay - 1) / 4 gives 0 for days 1-4, 1 for days 5-8, etc.
            // To make 0 map to index 1 (summer), we add 1 and then take modulo 4.
            const seasonIndex = (Math.floor((state.currentDay - 1) / 4) + 1) % 4;
            const season = seasons[seasonIndex];

            if (season !== state.currentSeason) {
                commit('setCurrentSeason', season);
            }

            const tempRanges = {
                winter: { dawn: 0, noon: 7, afternoon: 2, night: -5 },
                spring: { dawn: 10, noon: 19, afternoon: 12, night: 8 },
                summer: { dawn: 20, noon: 35, afternoon: 32, night: 16 },
                autumn: { dawn: 8, noon: 16, afternoon: 10, night: 5 },
            };

            const baseTemp = tempRanges[state.currentSeason][state.currentPartOfDay];
            const randomFactor = (Math.random() - 0.5) * 2;
            const temperature = Math.round(baseTemp + randomFactor);
            commit('setTemperature', temperature);
        },
        gameTick({ commit, dispatch, state }) {
        if (state.energy < 100) commit('setEnergy', state.energy + 1);
        const newTime = state.gameTime + 2.4;
        if (newTime >= 1440) {
            commit('setGameTime', 0);
            const newDay = state.currentDay + 1;
            commit('setCurrentDay', newDay);
            commit('updateGoalProgress', { type: 'reachDay', day: newDay });
            dispatch('checkAndAwardGoals');

            // Special event trigger (every 5 days)
            if (newDay % 5 === 0) {
                dispatch('triggerRandomEvent');
            } else {
                commit('setEvent', null); // Reset event
            }
        } else {
            commit('setGameTime', newTime);
        }
        dispatch('updateClimate');
        },
        handleKeyDown({ dispatch }, keyCode) {
        switch (keyCode) {
            case 'KeyM': dispatch('toggleModal', 'market'); break;
            case 'KeyS': dispatch('toggleModal', 'stats'); break;
            case 'KeyG': dispatch('toggleModal', 'goals'); break;
            case 'KeyR': dispatch('toggleModal', 'recycle'); break;
            case 'KeyT': dispatch('toggleModal', 'treasures'); break;
            case 'KeyE': dispatch('toggleModal', 'equipment'); break;
            case 'KeyP': dispatch('toggleModal', 'map'); break;
            case 'KeyV': dispatch('sellAllFish'); break; // Vender Pescado
            case 'KeyD': dispatch('goToSleep'); break; // Ir a Dormir
            case 'ArrowUp': dispatch('moveBoat', { y: -1 }); break;
            case 'ArrowDown': dispatch('moveBoat', { y: 1 }); break;
            case 'ArrowLeft': dispatch('moveBoat', { x: -1 }); break;
            case 'ArrowRight': dispatch('moveBoat', { x: 1 }); break;
        }
        },
        moveBoat({ commit, state }, { x = 0, y = 0 }) {
        const newX = state.boatPosition + x * 2;
        const newY = state.boatPositionY + y * 2;
        if (newX >= 0 && newX <= 100) {
            commit('setBoatPosition', { x: newX });
        }
        if (newY >= 0 && newY <= 100) {
            commit('setBoatPosition', { y: newY });
        }
        },
        startFishing({ commit, state, dispatch }) { // Added dispatch here
        if (state.isFishing || state.energy < 10) return;
        commit('setIsFishing', true);
        commit('setFishingDepth', 'normal');
        commit('setEnergy', state.energy - 10);
        commit('addMessage', { text: 'Lanzando la caña... ¡A ver qué pica!', type: 'system' });

        // Event: Salmon and Plastic
        if (state.eventActive && state.currentEvent.effect === 'salmon_and_plastic') {
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    const salmon = state.fishTypes.find(f => f.name === 'Salmón');
                    const value = Math.floor(salmon.value * (state.isNight ? 1.5 : 1));
                    commit('addMessage', { text: `¡Genial! Has atrapado un ${salmon.name} con un valor de ${value}$.`, type: 'catch' });
                    commit('updateFishingStats', { fish: salmon, value });
                    commit('addCaughtFish', { ...salmon, value });
                    commit('incrementCommonFishCount');
                    commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 });
                    commit('addMoney', value);
                } else {
                    const plasticBag = { name: "Bolsa de Plástico", recycleValue: 56 };
                    commit('addCaughtTrash', plasticBag);
                    commit('incrementTrashCount');
                    commit('addMessage', { text: `¡Oh, no! Has pescado ${plasticBag.name}.`, type: 'catch' });
                }
                commit('setIsFishing', false);
                commit('setFishingDepth', null);
            }, 1000);
            return;
        }

        // Event: Treasure Hunt
        if (state.eventActive && state.currentEvent.effect === 'treasures_only') {
            setTimeout(() => {
                // Treasure hunting logic
                const availableTreasures = state.treasureTypes;

                if (availableTreasures.length > 0) {
                    const totalRarity = availableTreasures.reduce((sum, treasure) => sum + treasure.rarity, 0);
                    let random = Math.random() * totalRarity;
                    let treasureToCatch = null;

                    for (const treasure of availableTreasures) {
                        random -= treasure.rarity;
                        if (random <= 0) {
                            treasureToCatch = treasure;
                            break;
                        }
                    }

                    if (treasureToCatch) {
                        commit('addMessage', { text: `¡Increíble! Has encontrado un tesoro: ${treasureToCatch.name}!`, type: 'achievement' });
                        commit('addCaughtTreasure', treasureToCatch);
                        commit('incrementTreasuresCount');
                        if (treasureToCatch.value > 0) {
                            commit('addMoney', treasureToCatch.value);
                        }
                        commit('updateGoalProgress', { type: 'findTreasure', amount: 1 });
                        commit('updateSpecificGoal', { type: 'findSpecificTreasure', name: treasureToCatch.name });
                        commit('updateUniqueTreasureGoal');
                    }
                } else {
                    commit('addMessage', { text: 'No hay tesoros en esta zona.', type: 'system' });
                }
                commit('setIsFishing', false);
                commit('setFishingDepth', null);
            }, 1000);
            return;
        }

        setTimeout(() => {
            const boat = state.boats[state.currentBoat];
            const rod = state.fishingRods[state.currentRod];

            // Helper function for adjusted rarity
            const getAdjustedRarity = (fish) => {
                let adjustedRarity = fish.rarity;

                // Apply seasonal bonus
                if (fish.seasonalBonus && fish.seasonalBonus[state.currentSeason]) {
                    adjustedRarity *= fish.seasonalBonus[state.currentSeason];
                }

                // Apply temperature bonus
                if (fish.temperatureRange) {
                    const [minTemp, maxTemp] = fish.temperatureRange;
                    if (state.temperature >= minTemp && state.temperature <= maxTemp) {
                        adjustedRarity *= 1.5; // Example bonus for being in preferred temperature range
                    }
                }
                return adjustedRarity;
            };

            if (Math.random() < 0.3) {
            const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
            if (trashItem.consumable) {
                commit('addConsumable', { consumable: trashItem.consumable.name, quantity: 1 });
                commit('addMessage', { text: `¡Vaya! Encontraste ${trashItem.name}.`, type: 'catch' });
            } else {
                commit('addCaughtTrash', trashItem);
                commit('incrementTrashCount');
                commit('addMessage', { text: `¡Oh, no! Has pescado ${trashItem.name}.`, type: 'catch' });
            }
            } else {
            if (Math.random() * boat.catchBonus < rod.catchRate) {
                const availableFish = state.fishTypes.filter(fish => {
                    const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                    const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                    const inZone = fish.zone === state.currentZone;
                    return meetsRequirements && availableAtTime && inZone;
                }).map(fish => ({
                    ...fish,
                    rarity: getAdjustedRarity(fish) // Apply adjusted rarity
                }));

                const totalRarity = availableFish.reduce((sum, fish) => sum + fish.rarity, 0);
                let random = Math.random() * totalRarity;
                let fishToCatch = null;

                for (const fish of availableFish) {
                    random -= fish.rarity;
                    if (random <= 0) {
                        fishToCatch = fish;
                        break;
                    }
                }

                if (fishToCatch) {
                    const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                    commit('addMessage', { text: `¡Genial! Has atrapado un ${fishToCatch.name} con un valor de ${value}$.`, type: 'catch' });
                    commit('updateFishingStats', { fish: fishToCatch, value });
                    commit('addCaughtFish', { ...fishToCatch, value });
                    if (fishToCatch.isExotic) {
                        commit('incrementExoticFishCount');
                        commit('updateGoalProgress', { type: 'catchExoticFish', amount: 1 }); // Added
                        if (fishToCatch.rarity <= 0.005) { // Assuming rarity <= 0.005 means legendary
                            commit('updateGoalProgress', { type: 'catchLegendaryFish', amount: 1 }); // Added
                        }
                    } else {
                        commit('incrementCommonFishCount');
                        commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 }); // Added
                    }
                    commit('addMoney', value);
                } else {
                    commit('addMessage', { text: 'Parece que hoy no pican...', type: 'system' });
                }
            } else {
                commit('addMessage', { text: '¡Rayos! El pez se ha escapado.', type: 'warning' });
            }
            }
            commit('setIsFishing', false);
            commit('setFishingDepth', null);
        }, 2000 / boat.speedMultiplier);
        },
        startDeepFishing({ commit, state, dispatch }) {
        if (state.isFishing || state.energy < 20) return; // Increased energy cost
        commit('setIsFishing', true);
        commit('setFishingDepth', 'deep');
        commit('setEnergy', state.energy - 20); // Increased energy cost
        commit('addMessage', { text: 'Lanzando la caña a las profundidades... ¿Qué misterios nos aguardan?', type: 'system' });

        // Event: Treasure Hunt
        if (state.eventActive && state.currentEvent.effect === 'treasures_only') {
            setTimeout(() => {
                // Treasure hunting logic
                const availableTreasures = state.treasureTypes;

                if (availableTreasures.length > 0) {
                    const totalRarity = availableTreasures.reduce((sum, treasure) => sum + treasure.rarity, 0);
                    let random = Math.random() * totalRarity;
                    let treasureToCatch = null;

                    for (const treasure of availableTreasures) {
                        random -= treasure.rarity;
                        if (random <= 0) {
                            treasureToCatch = treasure;
                            break;
                        }
                    }

                    if (treasureToCatch) {
                        commit('addMessage', { text: `¡Increíble! Has encontrado un tesoro: ${treasureToCatch.name}!`, type: 'achievement' });
                        commit('addCaughtTreasure', treasureToCatch);
                        commit('incrementTreasuresCount');
                        if (treasureToCatch.value > 0) {
                            commit('addMoney', treasureToCatch.value);
                        }
                        commit('updateGoalProgress', { type: 'findTreasure', amount: 1 });
                        commit('updateSpecificGoal', { type: 'findSpecificTreasure', name: treasureToCatch.name });
                        commit('updateUniqueTreasureGoal');
                    }
                } else {
                    commit('addMessage', { text: 'No hay tesoros en esta zona.', type: 'system' });
                }
                commit('setIsFishing', false);
                commit('setFishingDepth', null);
            }, 1000);
            return;
        }

        setTimeout(() => {
            // Special deep fishing event (1 in 15 chance)
            if (Math.random() < 1 / 15) {
                const availableFish = state.fishTypes.filter(fish => {
                    const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                    const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                    const inZone = fish.zone === state.currentZone;
                    const isDifficult = fish.isExotic; // Defining difficult fish as exotic
                    return meetsRequirements && availableAtTime && inZone && isDifficult;
                });

                if (availableFish.length > 0) {
                    const totalRarity = availableFish.reduce((sum, fish) => sum + fish.rarity, 0);
                    let random = Math.random() * totalRarity;
                    let fishToCatch = null;

                    for (const fish of availableFish) {
                        random -= fish.rarity;
                        if (random <= 0) {
                            fishToCatch = fish;
                            break;
                        }
                    }

                    if (fishToCatch) {
                        commit('setFishToCatch', fishToCatch);
                        commit('setFishFighting', true);
                        commit('setFishFightProgress', 0);
                        
                        const requiredTaps = 12;
                        const timeToCatch = 2; // seconds

                        commit('setFishFightRequiredTaps', requiredTaps);
                        commit('setFishFightTimer', timeToCatch);
                        commit('setFishFightActive', true);
                        commit('addMessage', { text: `¡Un pez enorme ha picado! ¡Toca repetidamente para no dejarlo escapar!`, type: 'warning' });

                        // Start the mini-game timer
                        let timer = state.fishFightTimer;
                        const interval = setInterval(() => {
                            timer--;
                            commit('setFishFightTimer', timer);
                            if (timer <= 0) {
                                clearInterval(interval);
                                if (state.fishFightProgress < state.fishFightRequiredTaps) {
                                    dispatch('fightFish', { success: false }); // Fish escapes if time runs out
                                }
                            }
                        }, 1000);
                        return; // End action here, wait for fight outcome
                    }
                }
            }

            // Treasure hunting logic (if special event doesn't happen)
            if (Math.random() < 0.05) { // 5% chance of finding a treasure
                const availableTreasures = state.treasureTypes;

                if (availableTreasures.length > 0) {
                    const totalRarity = availableTreasures.reduce((sum, treasure) => sum + treasure.rarity, 0);
                    let random = Math.random() * totalRarity;
                    let treasureToCatch = null;

                    for (const treasure of availableTreasures) {
                        random -= treasure.rarity;
                        if (random <= 0) {
                            treasureToCatch = treasure;
                            break;
                        }
                    }

                    if (treasureToCatch) {
                        commit('addMessage', { text: `¡Increíble! Has encontrado un tesoro: ${treasureToCatch.name}!`, type: 'achievement' });
                        commit('addCaughtTreasure', treasureToCatch);
                        commit('incrementTreasuresCount');
                        if (treasureToCatch.value > 0) {
                            commit('addMoney', treasureToCatch.value);
                        }
                        commit('updateGoalProgress', { type: 'findTreasure', amount: 1 });
                        commit('updateSpecificGoal', { type: 'findSpecificTreasure', name: treasureToCatch.name });
                        commit('updateUniqueTreasureGoal');
                        commit('setIsFishing', false);
                        commit('setFishingDepth', null);
                        return; // End the action here
                    }
                }
            }

            // Regular deep fishing (if no special event and no treasure)
            const availableFish = state.fishTypes.filter(fish => {
                const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                const inZone = fish.zone === state.currentZone;
                const isDifficult = fish.isExotic; // Defining difficult fish as exotic
                return meetsRequirements && availableAtTime && inZone && isDifficult;
            });

            if (availableFish.length > 0) {
                const totalRarity = availableFish.reduce((sum, fish) => sum + fish.rarity, 0);
                let random = Math.random() * totalRarity;
                let fishToCatch = null;

                for (const fish of availableFish) {
                    random -= fish.rarity;
                    if (random <= 0) {
                        fishToCatch = fish;
                        break;
                    }
                }

                if (fishToCatch) {
                    const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                    commit('addMessage', { text: `¡Genial! Has atrapado un ${fishToCatch.name} en las profundidades con un valor de ${value}$.`, type: 'catch' });
                    commit('updateFishingStats', { fish: fishToCatch, value });
                    commit('addCaughtFish', { ...fishToCatch, value });
                    if (fishToCatch.isExotic) {
                        commit('incrementExoticFishCount');
                        commit('updateGoalProgress', { type: 'catchExoticFish', amount: 1 });
                        if (fishToCatch.rarity <= 0.005) { // Assuming rarity <= 0.005 means legendary
                            commit('updateGoalProgress', { type: 'catchLegendaryFish', amount: 1 });
                        }
                    } else {
                        commit('incrementCommonFishCount');
                        commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 });
                    }
                    commit('addMoney', value);
                } else {
                    commit('addMessage', { text: 'No parece haber peces difíciles en esta zona.', type: 'system' });
                }
            } else {
                commit('addMessage', { text: 'No parece haber peces difíciles en esta zona.', type: 'system' });
            }

            commit('setIsFishing', false);
            commit('setFishingDepth', null);
        }, 1000); // Shorter timeout for deep fishing
        },
        tapToFightFish({ commit, state, dispatch }) {
            if (!state.fishFightActive) return;

            commit('incrementFishFightProgress');

            if (state.fishFightProgress >= state.fishFightRequiredTaps) {
                dispatch('fightFish', { success: true });
            }
        },
        fightFish({ commit, state }, { success }) {
            commit('setFishFightActive', false); // Deactivate mini-game
            commit('setFishFightProgress', 0);
            commit('setFishFightRequiredTaps', 0);
            commit('setFishFightTimer', 0); // Reset timer

            if (success) {
                const fish = state.fishToCatch;
                const value = Math.floor(fish.value * (state.isNight ? 1.5 : 1));
                commit('addMessage', { text: `¡Lo lograste! Has atrapado un ${fish.name} con un valor de ${value}$.`, type: 'catch' });
                commit('updateFishingStats', { fish, value });
                commit('addCaughtFish', { ...fish, value });
                if (fish.isExotic) {
                    commit('incrementExoticFishCount');
                    commit('updateGoalProgress', { type: 'catchExoticFish', amount: 1 });
                    commit('updateSpecificGoal', { type: 'catchSpecificFish', name: fish.name });
                    // Check if it's a legendary fish
                    if (fish.rarity <= 0.005) { // Assuming rarity <= 0.005 means legendary
                        commit('updateGoalProgress', { type: 'catchLegendaryFish', amount: 1 });
                    }
                } else {
                    commit('incrementCommonFishCount');
                    commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 });
                }
                commit('addMoney', value);
            } else {
                commit('addMessage', { text: `¡El ${state.fishToCatch.name} se ha escapado!`, type: 'warning' });
            }
            commit('setFishFighting', false);
            commit('setFishToCatch', null);
            commit('setIsFishing', false);
            commit('setFishingDepth', null);
        },
        sellAllFish({ commit, state, dispatch }) {
        if (state.caughtFishInventory.length === 0) {
            commit('addMessage', { text: 'No tienes ningún pez para vender. ¡A pescar!', type: 'warning' });
            return;
        }

        const totalValue = state.caughtFishInventory.reduce((sum, fish) => sum + fish.value, 0);
        const fishCount = state.caughtFishInventory.length;

        commit('addMoney', totalValue);
        commit('setCaughtFishInventory', []);
        commit('addMessage', { text: `Has vendido ${fishCount} peces por un total de ${totalValue}$. ¡Buen trabajo!`, type: 'system' });

        // Update goals
        commit('updateGoalProgress', { type: 'sellFish', amount: fishCount });
        commit('updateGoalProgress', { type: 'earnMoney', amount: totalValue });
        },
        buyRod({ commit, state, dispatch }, rodIndex) {
            const rod = state.fishingRods[rodIndex];
            if (state.money >= rod.price) {
                commit('spendMoney', rod.price);
                commit('unlockRod', rodIndex);
                commit('addMessage', { text: `¡Excelente! Compraste la ${rod.name}.`, type: 'achievement' });
                commit('updateGoalProgress', { type: 'buyRod', amount: 1, id: rodIndex });
            }
        },
        buyBoat({ commit, state, dispatch }, boatIndex) {
            const boat = state.boats[boatIndex];
            if (state.money >= boat.price) {
                commit('spendMoney', boat.price);
                commit('unlockBoat', boatIndex);
                commit('addMessage', { text: `¡Excelente! Compraste  el ${boat.name}.`, type: 'achievement' });
                commit('updateGoalProgress', { type: 'buyBoat', amount: 1, id: boatIndex });
            }
        },
        useConsumable({ commit, state }, consumableName) {
            if (state.consumableInventory[consumableName] > 0) {
                const consumable = initialState.trashTypes.find(t => t.consumable && t.consumable.name === consumableName).consumable;
                commit('useConsumable', consumableName);
                commit('addEnergy', consumable.energy);
                commit('addMessage', { text: `Usaste ${consumableName} y recuperaste ${consumable.energy} de energía.`, type: 'system' });
            } else {
                commit('addMessage', { text: `No tienes ${consumableName}.`, type: 'warning' });
            }
        },
        selectRod({ commit, state }, rodIndex) {
            if (state.unlockedRods[rodIndex]) {
                commit('setCurrentRod', rodIndex);
            }
        },
        selectBoat({ commit, state }, boatIndex) {
            if (state.unlockedBoats[boatIndex]) {
                commit('setCurrentBoat', boatIndex);
            }
        },
        checkAndAwardGoals({ commit, state, dispatch }) {
        // Iterate backwards to safely remove completed goals
        for (let i = state.currentGoals.length - 1; i >= 0; i--) {
            const goal = state.currentGoals[i];
            if (!goal.completed && goal.current >= goal.target) {
            commit('completeGoal', goal.id); // Pass only the ID
            commit('addMoney', goal.reward);
            commit('addMessage', { text: `¡Felicidades! Complestaste el objetivo: "${goal.description}" y ganas ${goal.reward}$.`, type: 'achievement' });
            dispatch('checkCategoryCompletion', goal.category);
            }
        }
        },
        checkCategoryCompletion({ commit, state }, category) {
            const goalsInCategory = Object.values(state.goalDefinitions).filter(g => g.category === category);
            const completedGoalsInCategory = state.completedGoals.filter(g => g.category === category);
            if (goalsInCategory.length === completedGoalsInCategory.length) {
                const completionGoal = Object.values(state.goalDefinitions).find(g => g.type === 'completeAllCategoryGoals' && g.category === category);
                if (completionGoal) {
                    commit('addGoal', completionGoal.id);
                }
            }
        },
        recycleItem({ commit, state, dispatch }, index) {
            const item = state.caughtTrashInventory[index];
            commit('addMoney', item.recycleValue);
            const newInventory = [...state.caughtTrashInventory];
            newInventory.splice(index, 1);
            commit('setCaughtTrashInventory', newInventory);
            commit('recycle', { count: 1, value: item.recycleValue });
            commit('addMessage', { text: `Reciclaste ${item.name} y ganaste ${item.recycleValue}$.`, type: 'system' });
            commit('updateGoalProgress', { type: 'recycleItems', amount: 1 });
        },
        recycleAllTrash({ commit, state, dispatch }) {
            const totalValue = state.caughtTrashInventory.reduce((sum, item) => sum + item.recycleValue, 0);
            if (totalValue > 0) {
                const itemCount = state.caughtTrashInventory.length;
                commit('addMoney', totalValue);
                commit('recycle', { count: itemCount, value: totalValue });
                commit('setCaughtTrashInventory', []);
                commit('addMessage', { text: `Reciclaste toda la basura y ganaste ${totalValue}$.`, type: 'system' });
                commit('updateGoalProgress', { type: 'recycleItems', amount: itemCount });
            }
        },
        goToSleep({ commit, dispatch, state }) {
            const sleepCost = 1400 + state.currentDay * 100;

            if (state.money >= sleepCost) {
                commit('spendMoney', sleepCost);
                commit('setEnergy', 100);
                commit('setCaughtFishInventory', []);
                commit('resetFishCaughtSinceSleep');
                const newTime = state.gameTime + 480; // Advance 8 hours
                if (newTime >= 1440) {
                    commit('setGameTime', newTime % 1440);
                    commit('setCurrentDay', state.currentDay + 1);
                } else {
                    commit('setGameTime', newTime);
                }
                dispatch('updateClimate');
                commit('addMessage', { text: `Descansás y recuperás tus fuerzas. El costo del descanso es de ${sleepCost}$.`, type: 'system' });
            } else {
                commit('addMessage', { text: `No tenés suficiente dinero para descansar. Necesitás ${sleepCost}$.`, type: 'warning' });
            }
        },
        toggleModal({ commit }, modal) {
        commit('toggleModal', modal);
        },
        unlockZone({ commit, state }, zoneId) {
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone && !zone.unlocked && state.money >= zone.cost) {
            commit('spendMoney', zone.cost);
            commit('unlockZone', zoneId);
            commit('updateZoneGoal', zoneId);
            commit('addMessage', { text: `¡Nueva zona desbloqueada! Ahora podés pescar en ${zone.name}.`, type: 'achievement' });
        }
        },
        travelToZone({ commit }, zoneId) {
        commit('setCurrentZone', zoneId);
        commit('addMessage', { text: `Preparando el viaje a la nueva zona...`, type: 'system' });
        commit('toggleModal', 'map');
        },
        playMusic() {
        // This action is dispatched to trigger music playback in VolumeControl.vue
        // The actual music playing logic is handled in VolumeControl.vue
        },
        toggleMusic({ commit }) {
            commit('toggleMusic');
        },
        triggerRandomEvent({ commit }) {
            const events = [
                { type: 'storm', effect: 'double_rewards', message: '¡Una tormenta ha llegado! ¡Las recompensas se duplican hoy!' },
                { type: 'storm', effect: 'halve_rewards', message: '¡Una tormenta ha llegado! ¡Las recompensas se reducen a la mitad hoy!' },
                { type: 'storm', effect: 'salmon_and_plastic', message: '¡Una extraña tormenta! Hoy solo pican salmones y bolsas de plástico.' },
                { type: 'treasure_hunt', effect: 'treasures_only', message: '¡Día de búsqueda de tesoros! Hoy solo encontrarás tesoros.' }
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            commit('setEvent', randomEvent);
            commit('addMessage', { text: randomEvent.message, type: 'event' });
        },
    },
    getters: {
        getMoney: (state) => state.money,
        getCommonFishCount: (state) => state.commonFishCount,
        getExoticFishCount: (state) => state.exoticFishCount,
        getTrashCount: (state) => state.trashCount,
        getTreasuresCount: (state) => state.treasuresCount,
        getEnergy: (state) => state.energy,
        getGameTime: (state) => state.gameTime,
        getCurrentDay: (state) => state.currentDay,
        getIsNight: (state) => state.isNight,
        getIsFishing: (state) => state.isFishing,
        getBoatPosition: (state) => state.boatPosition,
        getCurrentRod: (state) => state.currentRod,
        getCurrentBoat: (state) => state.currentBoat,
        getUnlockedRods: (state) => state.unlockedRods,
        getUnlockedBoats: (state) => state.unlockedBoats,
        getMessages: (state) => state.messages,
        getFishingRods: (state) => state.fishingRods,
        getBoats: (state) => state.boats,
        getFishingStats: (state) => state.fishingStats,
        getCaughtTrashInventory: (state) => state.caughtTrashInventory,
        getModals: (state) => state.modals,
        getRecycledObjects: (state) => state.recycledObjects,
        getGoals: (state) => {
        return {
            current: state.currentGoals,
            completed: state.completedGoals,
        };
        },
        getCaughtTreasuresInventory: (state) => state.caughtTreasuresInventory,
        getCurrentPartOfDay: (state) => state.currentPartOfDay,
        getCurrentSeason: (state) => state.currentSeason,
        getTemperature: (state) => state.temperature,
        getFishingDepth: (state) => state.fishingDepth,
        getFishFighting: (state) => state.fishFighting,
        getFishToCatch: (state) => state.fishToCatch,
        getConsumableInventory: (state) => state.consumableInventory
    }
});

export default store;