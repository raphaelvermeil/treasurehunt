# Treasure Hunt Website

A simple, interactive treasure hunt game where groups solve riddles and find locations on a map. **Optimized for mobile devices!** 📱

## 🚀 Quick Start

### Deploy to Netlify

1. Drag and drop the entire folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly!

### Test Locally

Simply open `index.html` in your web browser.

## 📝 Customization

### Change Riddles

Edit `riddles.js` to customize your treasure hunt:

```javascript
const riddles = [
    {
        text: "Your riddle here",
        answer: "Description of the location",
        lat: 48.8566,  // Latitude of correct location
        lng: 2.3522,   // Longitude of correct location
        funnyText: "Your inside joke here! 😂",  // Optional
        imageUrl: "https://i.imgur.com/yourimage.jpg"  // Optional
    },
    // Add more riddles...
];
```

**How to get coordinates:**
1. Go to [Google Maps](https://maps.google.com)
2. Right-click on a location
3. Click the coordinates to copy them
4. Paste into `lat` and `lng`

**Adding Inside Jokes & Images:**
- `funnyText`: Add any funny text or inside joke (optional)
- `imageUrl`: Add a URL to an image (upload to Imgur, Cloudinary, or any image host)
- Leave either field as an empty string `""` if you don't want to use it

### Change Password

Edit the password in `riddles.js`:

```javascript
const GIVE_UP_PASSWORD = "treasure123";  // Change this
```

### Change Map Center

Edit the default map view in `riddles.js`:

```javascript
const DEFAULT_MAP_CENTER = {
    lat: 48.8566,  // Your city center
    lng: 2.3522,
    zoom: 13
};
```

### Add/Remove Groups

Edit `index.html` and add or remove options:

```html
<option value="Group F">Group F</option>
```

### Adjust Accuracy

In `riddles.js`, change how close answers need to be:

```javascript
const ACCEPTABLE_RADIUS = 100; // Radius in meters (default: 100m)
```

## 🎮 How to Play

1. **Select Group**: Each group chooses their name from the dropdown
2. **Read Riddle**: Read the current riddle carefully (along with any funny inside jokes!)
3. **Click Map**: Click on the map to place your marker where you think the answer is
4. **Submit Answer**: Click the "Submit Answer" button to check if you're correct
5. **Try Again**: If wrong, you can move your marker and submit again
6. **Give Up Option**: Use the password to reveal the answer if stuck
7. **Next Riddle**: Once correct, move to the next riddle
8. **Complete**: Finish all riddles to win!

## 📱 Features

- ✅ **Mobile-First Design** - Optimized for smartphones and tablets
- ✅ Touch-friendly buttons and interactions
- ✅ Interactive map with tap-to-submit answer system
- ✅ Submit button before checking answers (try multiple times!)
- ✅ Random riddle order for each team (prevents cheating!)
- ✅ Inside jokes and funny images for each riddle
- ✅ Multiple groups can play independently
- ✅ Password-protected hint system
- ✅ Progress tracking
- ✅ Works offline once loaded (PWA-ready)
- ✅ No backend needed
- ✅ Free to deploy

## 🔧 Technical Details

- **Frontend Only**: Pure HTML, CSS, JavaScript
- **Map Provider**: OpenStreetMap via Leaflet.js
- **Storage**: Browser localStorage for progress
- **No API Keys Required**: Everything is free and open

## 📦 Files

- `index.html` - Main page structure
- `style.css` - Styling and layout
- `script.js` - Game logic
- `riddles.js` - Riddle data and configuration
- `README.md` - This file

## 💡 Tips

- **Mobile First**: This website is designed for mobile use - test it on your phone!
- Test all coordinates before the hunt
- Set `ACCEPTABLE_RADIUS` based on your city layout
- Share the give-up password only in case of emergencies
- Consider adding more riddles than you need
- Take screenshots of the correct locations to verify
- **Upload images to Imgur** for easy image hosting:
  1. Go to [imgur.com](https://imgur.com)
  2. Click "New post"
  3. Upload your image
  4. Right-click the image and copy the image URL
  5. Paste into the `imageUrl` field
- Each team gets riddles in a different random order!
- Users must click Submit to check their answer (they can try again if wrong)
- **For best mobile experience**: Add the site to your phone's home screen (works like a native app!)
  - **iOS**: Tap Share → Add to Home Screen
  - **Android**: Tap Menu (⋮) → Add to Home Screen

## 🐛 Troubleshooting

**Map not showing?**
- Check internet connection (CDN requires internet)
- Try a different browser

**Progress not saving?**
- Check if browser allows localStorage
- Incognito/private mode may not save progress

**Wrong location marked as correct?**
- Double-check lat/lng coordinates
- Adjust `ACCEPTABLE_RADIUS` if needed

---

Have fun with your treasure hunt! 🗺️✨

