// Configuration
const GIVE_UP_PASSWORD = "treasure123"; // Password to reveal answers
const ACCEPTABLE_RADIUS = 100; // Radius in meters for correct answer

// Riddles data
// Each riddle has:
// - text: The riddle question
// - answer: Description of the location
// - lat/lng: Coordinates of the correct location
// - funnyText: (optional) Inside joke or funny message to display
// - imageUrl: (optional) URL to a funny image to display
// You can edit these or add more riddles as needed

const riddles = [ 
    {
        text: "Where time stands still and bells ring out, historic hands point the way. A tower of old, stories untold.",
        answer: "The Old Clock Tower in the city center",
        lat: 48.8566,
        lng: 2.3522,
        funnyText: "Remember when Steve tried to climb this and got stuck? 😂",
        imageUrl: ""// Add image URL here: "https://example.com/image.jpg"
    },
    {
        text: "Green sanctuary in the urban maze, where children play and lovers gaze. Water flows and flowers bloom.",
        answer: "Central Park Fountain",
        lat: 48.8606,
        lng: 2.3376,
        funnyText: "The legendary spot where Sarah fell into the fountain taking a selfie! 📸💦",
        imageUrl: "" // Add image URL here
    },
    {
        text: "Steps lead down to tracks below, where metal serpents come and go. Tiled walls and rushing air.",
        answer: "Main Metro Station entrance",
        lat: 48.8738,
        lng: 2.2950,
        funnyText: "Mike: 'I definitely know where this is!' *proceeds to get lost for 2 hours* 🗺️",
        imageUrl: "" // Add image URL here
    },
    {
        text: "Painted faces on the wall, artists' dreams standing tall. Colors bright in urban night.",
        answer: "The Famous Street Art Mural",
        lat: 48.8534,
        lng: 2.3488,
        funnyText: "This is where Jenny said 'I could totally do that' and then couldn't draw a stick figure! 🎨",
        imageUrl: "" // Add image URL here
    },
    {
        text: "Aromas rise from morning bread, golden crusts and butter spread. A place where locals start their day.",
        answer: "The Historic Bakery on Main Street",
        lat: 48.8584,
        lng: 2.2945,
        funnyText: "Tom ate 7 croissants here in one sitting. Never forget. 🥐🥐🥐🥐🥐🥐🥐",
        imageUrl: "" // Add image URL here
    }
];

// Default map center (you can change this to your city)
const DEFAULT_MAP_CENTER = {
    lat: 48.8566,
    lng: 2.3522,
    zoom: 13
};

