# Portfolio AI Assistant Setup

## Features Implemented

✅ **Modern Glassmorphism Design** - Beautiful blur effects, transparency, and soft shadows
✅ **Responsive Layout** - Works on desktop, tablet, and mobile
✅ **iOS Safari & Android Compatible** - Proper touch interactions and mobile optimizations
✅ **Fixed Positioning** - Always appears above content with proper z-index
✅ **Smooth Animations** - Open/close transitions and hover effects
✅ **Typing Animation** - Shows "AI is typing..." indicator during responses
✅ **OpenAI GPT Integration** - Real AI responses using GPT-3.5-turbo
✅ **Voice Response** - Automatic text-to-speech for AI responses
✅ **Smart Close Behavior** - Stops speech and typing when chat is closed
✅ **Mobile Improvements** - Optimized for small screens and touch interactions
✅ **Clean Code** - Modular JavaScript wrapped in DOMContentLoaded

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key

### 2. Configure the API Key
1. Open `js/assistant.js`
2. Find this line: `const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';`
3. Replace `'YOUR_OPENAI_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Test the Assistant
1. Open `index.html` in your browser
2. Click the floating AI assistant button
3. Try asking questions about Milan
4. The assistant should respond with AI-generated answers

## File Structure
```
portfolio-main/
├── index.html          # Main HTML with AI assistant markup
├── styles.css          # Main portfolio styles
├── script.js           # Main portfolio JavaScript
├── css/
│   └── assistant.css   # AI assistant styles
└── js/
    └── assistant.js    # AI assistant logic
```

## Features Overview

### AI Chat UI
- Glassmorphism design with backdrop blur
- Floating avatar button with animations
- Smooth open/close transitions
- Responsive chat window

### GPT Integration
- Uses OpenAI GPT-3.5-turbo
- Context-aware responses about Milan
- Error handling for API failures
- Fallback to knowledge base if API fails

### Voice Features
- Automatic text-to-speech for responses
- Stops when chat is closed
- English voice selection
- Graceful fallback if speech synthesis unavailable

### Mobile Optimization
- Touch-friendly interface
- Responsive design for all screen sizes
- iOS Safari compatibility
- Android browser support

## Customization

### Changing the AI Personality
Edit the `SYSTEM_PROMPT` in `js/assistant.js` to change how the AI responds.

### Modifying the Design
Update `css/assistant.css` to change colors, sizes, or animations.

### Adding More Features
The modular JavaScript structure makes it easy to add new features like:
- Message history persistence
- File upload capabilities
- Voice input
- Multiple conversation threads

## Troubleshooting

### API Key Issues
- Make sure your OpenAI API key is valid and has credits
- Check that the key is properly pasted without extra spaces
- Verify your OpenAI account has API access enabled

### Voice Not Working
- Voice synthesis may not be available in all browsers
- Check browser permissions for speech synthesis
- Some mobile browsers have limited voice support

### Chat Not Opening
- Check browser console for JavaScript errors
- Ensure all files are properly loaded
- Verify the HTML structure matches the JavaScript selectors

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)