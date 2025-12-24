# Gemini Prompts Extension

A Chrome extension that adds a navigation toolbar to Gemini AI chat interface, displaying all your prompts in a sidebar for easy navigation.

## Features

- **Prompt Navigation**: View all your prompts in a fixed sidebar
- **Quick Jump**: Click any prompt to scroll to it instantly
- **Toggle Visibility**: Show/hide the toolbar with a floating button
- **Responsive Design**: Text wraps properly without horizontal scrolling
- **Auto-Detection**: Automatically finds and displays prompts as you chat

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will be installed and ready to use

## Usage

1. Navigate to [Gemini AI](https://gemini.google.com)
2. Start a conversation - the toolbar will appear on the right side
3. Use the floating menu button to toggle the toolbar visibility
4. Click any prompt in the sidebar to jump to that part of the conversation

## Development

### Prerequisites
- Node.js and npm
- Chrome browser

### Setup
```bash
npm install
npm run build
```

### File Structure
- `src/content.ts` - Main extension logic
- `src/styles.css` - Styling for the toolbar
- `manifest.json` - Extension configuration
- `webpack.config.js` - Build configuration

## Technical Details

- Uses content script injection to modify Gemini's interface
- Detects prompts using multiple CSS selectors for reliability
- Implements smooth scrolling and responsive design
- Auto-refreshes prompt list every 3 seconds
