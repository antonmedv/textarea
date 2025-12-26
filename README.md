# [Markdown Editor](https://danielcregg.github.io/markdownarea/)

A _minimalist_ markdown editor that lives entirely in your browser with real-time rendering and URL-based sharing.

**Try it now:** https://danielcregg.github.io/markdownarea/

## Features

- 📝 **Full Markdown Support** - Write with complete GitHub-Flavored Markdown (GFM) syntax
- 👁️ **Live Preview** - See your markdown rendered in real-time as you type
- 🔄 **Three View Modes**:
  - **Edit** - Focus on writing
  - **Preview** - See the fully rendered document
  - **Split** - Edit and preview side-by-side
- 📤 **Easy Sharing** - One-click share button uses native mobile sharing or copies URL to clipboard
- 🗜️ **Compression magic** - Your markdown gets compressed with deflate for efficient URL storage
- 🔗 **URL-based sharing** - Share your rendered documents by copying the URL
- 🌓 **Dark mode** - Respects your system's color scheme preference
- 💾 **Auto-save** - Changes are saved automatically (500ms debounce)
- 📱 **Mobile friendly** - Responsive design works on all devices
- 🎯 **No backend** - Zero servers, everything runs in your browser
- 💾 **Dual persistence** - Stored in both localStorage and URL hash

## How to use

1. Open the editor at https://danielcregg.github.io/markdownarea/
2. Write your markdown in the editor pane
3. Click **Split** to see live preview alongside your text
4. Click **Preview** to see only the rendered output
5. Click the **📤 Share** button to share your document instantly
   - On mobile: Opens native share sheet for easy sharing via apps
   - On desktop: Copies the URL to your clipboard automatically
6. Recipients see the exact same rendered content when they open the link

## Markdown Support

Full support for:

- **Headings** (# H1 through ###### H6)
- **Emphasis** (*italic*, **bold**, ***bold italic***)
- **Lists** (ordered and unordered)
- **Links** and **Images**
- **Code blocks** with syntax preservation
- **Inline code** formatting
- **Blockquotes**
- **Tables**
- **Horizontal rules**
- **Line breaks** (GFM-style)

## Pro tips

- Start your document with `# Title` to set a custom page title
- Use the **📤 Share** button for instant sharing - no need to manually copy URLs
- Use **Tab** key in the editor to insert spaces (instead of losing focus)
- Your preferred view mode (Edit/Split/Preview) is remembered
- Data lives in both localStorage AND the URL for maximum reliability

## Examples

Create beautiful documents like:

- Technical documentation
- Blog posts and articles
- Meeting notes and agendas
- Project README files
- Personal journals
- Code tutorials
- Quick notes and lists

## Technical Details

- **Markdown Engine**: Marked.js (v11.1.1)
- **Compression**: Deflate-raw with base64 URL-safe encoding
- **Styling**: GitHub-inspired markdown rendering
- **Storage**: CompressionStream API + localStorage fallback
- **Size**: Single HTML file (~465 lines)

---

*Made with ❤️ and JavaScript*
