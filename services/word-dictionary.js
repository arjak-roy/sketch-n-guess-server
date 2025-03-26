exports.giveRandomWord = (()=>{
    const wordDict = [
      "Apple", "Dog", "House", "Sun", "Tree", "Star", "Fish", "Book", "Cat", "Cloud", "Car", "Balloon", 
      "Chair", "Cup", "Moon", "Hat", "Key", "Boat", "Pen", "Cake", "Bicycle", "Pumpkin", "Rocket", 
      "Ladder", "Window", "Bridge", "Sword", "Clock", "Airplane", "Umbrella", "Bench", "Guitar", "Bag", 
      "Robot", "Toothbrush", "Kite", "Castle", "Pillow", "Door", "Scissors", "Crown", "Anchor", "Violin", 
      "Telescope", "Fence", "Lighthouse", "Dinosaur", "Helicopter", "Compass", "Igloo", "Backpack", 
      "Horse", "Jellyfish", "Snail", "Volcano", "Piano", "Pyramid", "Magnet", "Feather", "Trampoline", 
      "Bell", "Rocket", "Helmet", "Bowling", "Koala", "Ferris wheel", "Shovel", "Lantern", "Spring", 
      "Scooter", "Tent", "Fence", "Waterfall", "Dragon", "Surfboard", "Helmet", "Iceberg", "Penguin", 
      "Lighthouse", "Crayon", "Zebra", "Ladder", "Maze", "Boomerang", "Statue", "Oven", "Mask", "Telescope", 
      "Wheelbarrow", "Windmill", "Anchor", "Bear", "Fox", "Crocodile", "Fireplace", "Arrow", "Swing", "Broom", 
      "Chest", "Necklace", "Bell", "Fountain", "Saddle", "Scooter", "Microscope", "Plank", "Brush", "Rope", 
      "Caravan", "Starfish", "Hammock", "Cannon", "Wig", "Trap", "Globe", "Rack", "Parachute", "Beehive", 
      "Tent", "Ant", "Hedgehog", "Comb", "Cricket", "Barrel", "Flip-flop", "Skateboard", "Hammock", "Skate", 
      "Cactus",  "Spoon", "Envelope", "Trophy", "Camera", "Stapler", "Helmet", "Whistle", "Dolphin", "Penguin", 
      "Scarf", "Helmet", "Wagon", "Sandcastle", "Giraffe", "Chain", "Dragonfly", "Crane", "Syringe", 
      "Glider", "Lantern", "Telescope", "Keyboard", "Satellite", "Compass", "Chimney", "Wheel", "Binoculars", 
      "Shark", "Glove", "Robot", "Glider", "Lighthouse", "Microphone", "Pencil", "Statue", "Swing", 
      "Puzzle", "Cannon", "Firetruck", "Owl", "Plank", "Microscope", "Bell", "Backpack", "Telescope", 
      "Parachute", "Beaver", "Swing", "Hive", "Ladder", "Spacecraft", "Rubberband", "Cabin", "Crane", 
      "Jellyfish", "Yacht", "Ferris wheel", "Brush", "Anchor", "Glove", "Axe", "Scooter", "Map", 
      "Volcano", "Shovel", "Drill", "Windmill", "Compass", "Lock", "Toothpaste", "Iceberg", "Dagger", 
      "Piano", "Bridge", "Spiral", "Feather", "Parrot", "Stool", "Shell", "Knitting", "Bathtub", 
      "Skates", "Butterfly", "Helmet", "Planet", "Cupboard", "Coconut", "Goldfish", "Bee", "Lasso", 
      "Teddy", "Swing", "Wheelchair", "Log", "Drum", "Bin", "Fortress", "Fossil", "Saddle", "Cave"
    
          ];
      const randomIndex = Math.floor(Math.random() * wordDict.length);
      return wordDict[randomIndex];
      
});