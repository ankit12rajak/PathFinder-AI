# Quick Start - YouTube Playlist Integration

## 🚀 Get Started in 3 Steps

### Step 1: Get YouTube API Key (Optional but Recommended)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable "YouTube Data API v3"
4. Create API Key under Credentials

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API key
VITE_YOUTUBE_API_KEY=your_api_key_here
```

### Step 3: Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

## 🎯 Test the Feature

1. Navigate to **Industry Trends** page
2. Click **"Start Learning"** on "Artificial Intelligence & Machine Learning"
3. Watch the playlist load with real videos from Krish Naik's channel
4. Click any video to play it
5. Mark videos complete to track progress

## 📝 Note

- **Without API Key**: Works with mock data (15 dummy videos)
- **With API Key**: Loads real playlist videos with thumbnails and durations

## 🎓 Example Playlists Configured

- **AI & ML**: Krish Naik (15+ videos)
- **DevOps**: Abhishek Veeramala
- **Cybersecurity**: The Cyber Mentor
- **Data Science**: WS Cube Tech
- **Full-Stack**: Chai Aur Code
- And more...

## 🔧 Troubleshooting

**Videos not loading?**
- Check if `.env` file exists
- Verify API key is correct
- Ensure YouTube Data API v3 is enabled
- Check browser console for errors

**Still having issues?**
- The app works without API key (uses mock data)
- Check `YOUTUBE_INTEGRATION_GUIDE.md` for detailed setup

## 📚 Learn More

- Full documentation: `YOUTUBE_INTEGRATION_GUIDE.md`
- Premium design details: `PREMIUM_LEARNING_INTERFACE.md`

---

**Enjoy your premium learning experience! 🎉**
