# Valentine's Memory Game Proposal 💝

A romantic and interactive way to ask your special someone to be your Valentine! This web application features a memory card game in a heart shape, where matching all pairs reveals a special Valentine's proposal with cute animations and effects.

![Demo Preview](public/github-demo.gif)

## Demo 🎮

You can see the live demo of the game [here](https://valentines-proposal-visibait.vercel.app).

## Features ✨

- Interactive memory card game in a heart shape layout
- Love letter story: each matched pair reveals a line of a romantic message
- Background music and match sounds (add your own audio files)
- Beautiful animations and transitions using Framer Motion
- Customizable with your own photos
- Romantic proposal screen with:
  - Fireworks animation on acceptance
  - Floating hearts particle effect
  - Playful "No" button that moves away when hovered
  - Cute hamster GIFs and images
- Shareable "She said yes!" card (save as image or share)
- Personalization config for names, messages, and audio
- Elegant design with Playfair Display font
- Fully responsive layout
- Built with Next.js and Tailwind CSS

## Prerequisites 📋

- Node.js (v18.18.0 or higher)
- npm or yarn
- Git

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/visibait/valentines.git
cd valentines
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Replace the photos:
   - Navigate to the `public/game-photos` directory
   - Replace the existing images (1.avif through 36.avif) with your own photos
   - Make sure to keep the same naming convention
   - Use photos of you and your partner together!

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization 🎨

### Personalization Config
All customizable content (names, love letter, share card, audio paths) is in **`src/config/personalization.ts`**:

- **Names**: Set `proposer` and `recipient` (e.g., "Cam" and "Pea")
- **Love letter**: Edit the 18 `loveLetterLines` shown as each pair is matched
- **Share card**: Customize `headline` for the "She said yes!" card
- **Audio paths**: Point to your audio files in `public/`

### Audio Files
Add these files to the `public/` folder for full audio support:

- **`background-music.mp3`** – Soft romantic music (plays on first interaction, loops)
- **`match-sound.mp3`** – Short chime or sound when a pair is matched

Paths are configured in `src/config/personalization.ts`. If files are missing, the app still works without audio. For match sounds, you can use free resources like [Mixkit](https://mixkit.co/free-sound-effects/) or [Freesound](https://freesound.org/).

### Changing Photos
- Add your photos to `public/game-photos/`
- Supports `.avif`, `.jpg`, `.jpeg`, `.png`, `.webp`
- For best results, use square images of the same size

### Modifying Text
- Edit proposal messages in `components/ValentinesProposal.tsx`
- Edit love letter lines in `src/config/personalization.ts`
- Change game instructions in `components/TextFooter.tsx`

### Styling
- The project uses Tailwind CSS for styling
- Modify colors, fonts, and other styles in the respective component files
- Main color schemes can be adjusted in `tailwind.config.js`

## Tech Stack 💻

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Fireworks.js](https://fireworks.js.org/)
- [html2canvas](https://html2canvas.hertzen.com/) (shareable card)

## Contributing 🤝

Contributions are welcome! Feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙏

- Inspired by love and creativity
- Built with Next.js 15 App Router

## Author ✍️

visibait - [https://visibait.com]

## Donate
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/visibait)

---

Made with ❤️ for my Valentine

*Note: This project is meant for romantic purposes. Please use responsibly and spread love!*