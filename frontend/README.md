# Next Life - Interactive Personality Game

A fun, web-based personality game that predicts your "next life" based on your answers to thought-provoking questions.

## 🎮 Concept

Next Life is an engaging personality-based game where players answer 10 carefully crafted questions to discover what their next life might be. Will you be a space explorer, a Himalayan monk, or perhaps something even more mysterious?

## ✨ Features

- **10 Engaging Questions** covering personality, values, creativity, risk-taking, and helping nature
- **12 Unique Results** ranging from Space Explorer to Wildlife Photographer
- **Hidden Trait System** that analyzes your personality
- **Progress Tracking** with visual progress bar
- **Secret Results** with a 10% chance of getting rare, special outcomes
- **Play Again** feature to explore different paths
- **Mobile-Responsive** design that works beautifully on all devices
- **Smooth Animations** for an engaging user experience

## 🏗️ Architecture

### Component Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main game orchestrator (state management)
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── Landing.tsx         # Landing page with intro and start button
│   ├── QuestionFlow.tsx    # Question display with progress indicator
│   └── Result.tsx          # Result page with reasoning and replay
├── lib/
│   ├── gameData.ts         # Questions, results, and trait definitions
│   └── gameLogic.ts        # Scoring and result calculation logic
└── package.json            # Dependencies and scripts
```

### State Management

The game uses React hooks (`useState`) for simple, effective state management:

- **gameState**: Tracks current view (landing | questions | result)
- **currentQuestionIndex**: Tracks progress through questions
- **answers**: Array of trait arrays from each answer
- **result**: Final calculated NextLife result

### Data Flow

1. User starts game → State transitions to 'questions'
2. For each answer → Traits are collected in answers array
3. After final question → `determineNextLife()` calculates result
4. Result displayed → User can play again

## 🧠 Game Logic

### Trait System

Each question maps to multiple traits:
- `adventurous`, `calm`, `intellectual`, `artistic`
- `helping`, `independent`, `logical`, `creative`
- `risktaker`, `safe`

### Scoring Algorithm

```typescript
// 1. Collect all traits from answers
// 2. Calculate trait scores (count occurrences)
// 3. Find top 3 dominant traits
// 4. Match against each result's required traits
// 5. Select best matching result
// 6. 10% chance for secret result override
```

### Question Data Structure

```typescript
interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    traits: Trait[];  // Traits this answer contributes to
  }[];
}
```

### Result Data Structure

```typescript
interface NextLife {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  emoji: string;
  requiredTraits: Trait[];
  isSecret?: boolean;  // For rare results
}
```

## 🎨 UI/UX Highlights

- **Gradient Backgrounds** - Beautiful purple-to-pink gradients throughout
- **Progress Indicator** - Visual bar showing question completion percentage
- **Smooth Transitions** - Fade-in and slide-up animations
- **Hover Effects** - Interactive button states for better feedback
- **Mobile-First** - Responsive design that works on all screen sizes
- **Accessible** - Semantic HTML and clear visual hierarchy

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks (useState)
- **No Backend Required** - All logic runs client-side

## 📝 How to Extend

### Adding New Questions

Edit `lib/gameData.ts`:

```typescript
{
  id: 11,
  question: "Your new question here?",
  options: [
    { text: "Option 1", traits: ['trait1', 'trait2'] },
    { text: "Option 2", traits: ['trait3', 'trait4'] },
    // ... more options
  ],
}
```

### Adding New Results

Edit `lib/gameData.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Your Next Life Title',
  description: 'What this life entails...',
  reasoning: 'Why the user got this result...',
  emoji: '🚀',
  requiredTraits: ['trait1', 'trait2', 'trait3'],
  isSecret: false,  // Set to true for rare results
}
```

### Adding New Traits

1. Update the `Trait` type in `lib/gameData.ts`
2. Add the trait to relevant question options
3. Create or update results that use this trait

## 🎯 Key Features Explained

### Secret Results (10% Chance)

The game includes special rare results that can appear randomly:
- Time Traveler and Guardian of History ⏰
- Cosmic Artist Painting with Nebulas ✨

These bypass normal trait matching and add an element of surprise!

### Trait Matching Algorithm

The algorithm prioritizes dominant traits (appearing most frequently in answers) and weighs earlier traits more heavily when matching against results.

### Play Again Functionality

Users can replay the game unlimited times. Each playthrough resets state and can yield different results based on different answer patterns.

## 📱 Mobile Optimization

- Responsive text sizing (text-2xl → md:text-3xl)
- Touch-friendly button sizes (minimum 44px tap targets)
- Flexible layouts that adapt to screen width
- Readable font sizes on small screens

## 🎨 Design Philosophy

- **Fun & Engaging**: Playful copy and emojis
- **Clear & Simple**: One question at a time, clear progress
- **Beautiful**: Gradient colors and smooth animations
- **Professional**: Clean code, proper TypeScript typing

## 📄 License

This is a demo project for educational and portfolio purposes.

## 🤝 Contributing

To modify this game:
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

Built with ❤️ using Next.js and TypeScript
