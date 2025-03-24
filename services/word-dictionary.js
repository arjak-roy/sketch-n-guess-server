exports.giveRandomWord = (()=>{
    const wordDict = [
        "Apple", "Banana", "Orange", "Grape", "Watermelon", "Strawberry", "Kiwi", "Pineapple", "Mango", "Peach",
        "Dog", "Cat", "Bird", "Fish", "Horse", "Cow", "Sheep", "Pig", "Chicken", "Duck",
        "Tree", "Flower", "Sun", "Moon", "Star", "Cloud", "Rain", "Snow", "Wind", "Rainbow",
        "Car", "Bus", "Train", "Bicycle", "Motorcycle", "Airplane", "Boat", "Ship", "Truck", "Taxi",
        "House", "School", "Hospital", "Office", "Store", "Park", "Restaurant", "Library", "Museum", "Church",
        "Table", "Chair", "Bed", "Sofa", "Door", "Window", "Floor", "Roof", "Wall", "Stairs",
        "Head", "Hand", "Foot", "Leg", "Arm", "Eye", "Ear", "Nose", "Mouth", "Hair",
        "Happy", "Sad", "Angry", "Tired", "Excited", "Scared", "Bored", "Confused", "Surprised", "Shy",
        "Run", "Walk", "Jump", "Swim", "Fly", "Sing", "Dance", "Eat", "Drink", "Sleep",
        "Red", "Blue", "Green", "Yellow", "Black", "White", "Pink", "Purple", "Brown", "Gray",
        "Circle", "Square", "Triangle", "Rectangle", "Oval", "Line", "Point", "Angle", "Cube", "Sphere",
        "Ball", "Book", "Pen", "Pencil", "Paper", "Computer", "Phone", "TV", "Radio", "Camera",
        "Pizza", "Burger", "Salad", "Pasta", "Soup", "Rice", "Bread", "Cheese", "Meat", "Fish",
        "Music", "Art", "Sport", "Movie", "Game", "Story", "Poem", "Song", "Play", "Dance",
        "Love", "Hate", "Fear", "Joy", "Peace", "War", "Life", "Death", "Time", "Space",
        "Money", "Gold", "Silver", "Diamond", "Ruby", "Pearl", "Coin", "Bank", "Rich", "Poor",
        "King", "Queen", "Prince", "Princess", "Doctor", "Teacher", "Police", "Fireman", "Soldier", "Chef",
        "Mountain", "River", "Ocean", "Forest", "Desert", "Island", "Lake", "Valley", "Cave", "Hill",
        "Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Galaxy",
        "America", "Canada", "England", "France", "Germany", "Italy", "Spain", "Japan", "China", "India",
        "Football", "Basketball", "Baseball", "Soccer", "Tennis", "Golf", "Hockey", "Cricket", "Rugby", "Boxing",
        "Guitar", "Piano", "Violin", "Drums", "Trumpet", "Flute", "Harp", "Cello", "Saxophone", "Xylophone",
        "Elephant", "Lion", "Tiger", "Monkey", "Panda", "Zebra", "Giraffe", "Kangaroo", "Penguin", "Dolphin",
        "Chocolate", "Candy", "Cake", "IceCream", "Cookie", "Brownie", "Donut", "Pie", "Pudding", "Jelly",
        "Camera", "Photograph", "Microscope", "Telescope", "Binoculars", "Stethoscope", "Thermometer", "Barometer", "Compass", "Sextant",
        "Symphony", "Orchestra", "Concerto", "Sonata", "Opera", "Ballet", "Jazz", "Blues", "Rock", "Pop",
        "Democracy", "Republic", "Monarchy", "Dictatorship", "Communism", "Socialism", "Anarchy", "Theocracy", "Oligarchy", "Plutocracy",
        "Gravity", "Velocity", "Acceleration", "Momentum", "Energy", "Force", "Magnetism", "Electricity", "Radiation", "Quantum"
      ];
      const randomIndex = Math.floor(Math.random() * wordDict.length);
      return wordDict[randomIndex];
      
});