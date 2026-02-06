# AskYourValentine 💕

A cute, viral Valentine's Day website generator. Create personalized "Endless Pop-Up Hell" Valentine pages that your loved one can't say no to!

## Features

- 🎨 Beautiful pastel pink aesthetic
- 💝 Personalized Valentine pages with custom names and messages
- 😈 "No" button that refuses to cooperate
- 🎉 Celebration screen with confetti when they say YES
- 📱 Mobile-first, responsive design
- 🔗 Shareable short links

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Firebase Firestore
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore enabled

### Setup

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up Firebase:**

   - Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Go to Project Settings > General > Your apps > Add web app
   - Copy the config values

3. **Configure environment variables:**

   ```bash
   cp env.example .env.local
   ```

   Fill in your Firebase credentials in `.env.local`

4. **Set up Firebase Admin SDK:**

   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Copy the JSON content and paste it as a single line in `FIREBASE_ADMIN_CREDENTIALS`

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Firestore Schema

**Collection:** `valentines`

| Field | Type | Description |
|-------|------|-------------|
| slug | string | 6-char alphanumeric ID (document ID) |
| fromName | string | Sender's name (max 30 chars) |
| toName | string | Recipient's name (max 30 chars) |
| finalMessage | string? | Optional celebration message (max 280 chars) |
| createdAt | timestamp | Creation timestamp |

## Deployment (Vercel)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables from `.env.local`
4. Deploy!

## License

Made with 💖 for lovers everywhere.
