// Trait types that questions will map to
export type Trait =
  | 'adventurous'
  | 'calm'
  | 'intellectual'
  | 'artistic'
  | 'helping'
  | 'independent'
  | 'logical'
  | 'creative'
  | 'risktaker'
  | 'safe';

// Question structure
export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    traits: Trait[]; // Each answer contributes to multiple traits
  }[];
}

// Result/Next Life structure
export interface NextLife {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  emoji: string;
  requiredTraits: Trait[]; // Primary traits needed for this result
  isSecret?: boolean; // For rare/secret results
}

// Game questions (10 questions covering personality, values, risk-taking, creativity, helping)
export const questions: Question[] = [
  {
    id: 1,
    question: "You're offered a mysterious door that leads to an unknown adventure. What do you do?",
    options: [
      { text: "Step through immediately - adventure awaits!", traits: ['adventurous', 'risktaker'] },
      { text: "Study the door carefully first, then decide", traits: ['logical', 'intellectual'] },
      { text: "Invite others to explore it together", traits: ['helping', 'calm'] },
      { text: "Decline - I prefer what I know", traits: ['safe', 'calm'] },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to spend your free time?",
    options: [
      { text: "Creating art, music, or writing", traits: ['artistic', 'creative'] },
      { text: "Reading, learning, solving puzzles", traits: ['intellectual', 'logical'] },
      { text: "Helping friends or volunteering", traits: ['helping', 'calm'] },
      { text: "Seeking thrills and new experiences", traits: ['adventurous', 'risktaker'] },
    ],
  },
  {
    id: 3,
    question: "A stranger asks for your help on a difficult problem. You:",
    options: [
      { text: "Drop everything to assist them", traits: ['helping', 'calm'] },
      { text: "Analyze the problem logically first", traits: ['logical', 'intellectual'] },
      { text: "Suggest a creative, unconventional solution", traits: ['creative', 'artistic'] },
      { text: "Politely decline - you have your own path", traits: ['independent', 'safe'] },
    ],
  },
  {
    id: 4,
    question: "Your ideal environment would be:",
    options: [
      { text: "A quiet library or research lab", traits: ['intellectual', 'calm', 'logical'] },
      { text: "An artist's studio filled with inspiration", traits: ['artistic', 'creative'] },
      { text: "The wilderness, mountains, or ocean", traits: ['adventurous', 'independent'] },
      { text: "A community center helping others", traits: ['helping', 'calm'] },
    ],
  },
  {
    id: 5,
    question: "When facing a major life decision, you:",
    options: [
      { text: "Trust your gut and take the leap", traits: ['risktaker', 'adventurous'] },
      { text: "Make a detailed pro/con list", traits: ['logical', 'intellectual', 'safe'] },
      { text: "Consult with loved ones first", traits: ['helping', 'calm'] },
      { text: "Look for the most creative option", traits: ['creative', 'artistic'] },
    ],
  },
  {
    id: 6,
    question: "What drives you most in life?",
    options: [
      { text: "Making a positive impact on others", traits: ['helping', 'calm'] },
      { text: "Discovering truth and knowledge", traits: ['intellectual', 'logical'] },
      { text: "Expressing yourself creatively", traits: ['artistic', 'creative'] },
      { text: "Experiencing everything the world offers", traits: ['adventurous', 'risktaker'] },
    ],
  },
  {
    id: 7,
    question: "Your approach to challenges is:",
    options: [
      { text: "Face them head-on with courage", traits: ['risktaker', 'adventurous'] },
      { text: "Analyze and strategize carefully", traits: ['logical', 'intellectual'] },
      { text: "Find an innovative, creative angle", traits: ['creative', 'artistic'] },
      { text: "Seek support and collaborate", traits: ['helping', 'calm'] },
    ],
  },
  {
    id: 8,
    question: "If you could have one superpower:",
    options: [
      { text: "Healing others and bringing peace", traits: ['helping', 'calm'] },
      { text: "Super intelligence and wisdom", traits: ['intellectual', 'logical'] },
      { text: "Ability to create anything from imagination", traits: ['creative', 'artistic'] },
      { text: "Teleportation to explore the universe", traits: ['adventurous', 'risktaker'] },
    ],
  },
  {
    id: 9,
    question: "Your biggest fear is:",
    options: [
      { text: "Never achieving anything meaningful", traits: ['adventurous', 'independent'] },
      { text: "Being trapped in routine and boredom", traits: ['creative', 'risktaker'] },
      { text: "Not understanding the world's mysteries", traits: ['intellectual', 'logical'] },
      { text: "Failing to help those in need", traits: ['helping', 'calm'] },
    ],
  },
  {
    id: 10,
    question: "The legacy you want to leave is:",
    options: [
      { text: "Beautiful art or inspiring creations", traits: ['artistic', 'creative'] },
      { text: "Revolutionary discoveries or insights", traits: ['intellectual', 'logical'] },
      { text: "A community you helped thrive", traits: ['helping', 'calm'] },
      { text: "Stories of extraordinary adventures", traits: ['adventurous', 'risktaker', 'independent'] },
    ],
  },
];

// Possible "Next Life" results
export const nextLives: NextLife[] = [
  {
    id: 'explorer',
    title: 'Space Explorer on a New Planet',
    description: 'You\'ll be among the first humans to set foot on an alien world, discovering new forms of life and pushing the boundaries of human knowledge.',
    reasoning: 'Your adventurous spirit and risk-taking nature make you perfect for venturing into the unknown cosmos.',
    emoji: '🚀',
    requiredTraits: ['adventurous', 'risktaker', 'independent'],
  },
  {
    id: 'photographer',
    title: 'Wildlife Photographer in the Amazon',
    description: 'You\'ll travel the world capturing the beauty of endangered species, raising awareness through your breathtaking imagery.',
    reasoning: 'Your artistic vision combined with your love for adventure creates the perfect wildlife storyteller.',
    emoji: '📸',
    requiredTraits: ['artistic', 'adventurous', 'independent'],
  },
  {
    id: 'monk',
    title: 'Monk in the Himalayas',
    description: 'You\'ll find peace in mountain monasteries, helping seekers find enlightenment and inner calm through ancient wisdom.',
    reasoning: 'Your calm nature and desire to help others leads you to a life of spiritual guidance and tranquility.',
    emoji: '🧘',
    requiredTraits: ['calm', 'helping', 'intellectual'],
  },
  {
    id: 'founder',
    title: 'Visionary Startup Founder',
    description: 'You\'ll build revolutionary companies that change how people live, taking bold risks to create the future.',
    reasoning: 'Your risk-taking spirit, creative thinking, and independence make you a natural entrepreneur and innovator.',
    emoji: '💡',
    requiredTraits: ['risktaker', 'creative', 'independent'],
  },
  {
    id: 'scientist',
    title: 'Quantum Physicist in 2150',
    description: 'You\'ll unlock the secrets of the universe, making breakthrough discoveries in quantum mechanics and space-time.',
    reasoning: 'Your logical mind and intellectual curiosity drive you to solve the cosmos\' greatest mysteries.',
    emoji: '⚛️',
    requiredTraits: ['intellectual', 'logical'],
  },
  {
    id: 'artist',
    title: 'Revolutionary Artist in a Future Renaissance',
    description: 'You\'ll create masterpieces that redefine art itself, inspiring millions with your innovative and emotional works.',
    reasoning: 'Your creative soul and artistic vision mark you as one of history\'s great creative minds.',
    emoji: '🎨',
    requiredTraits: ['artistic', 'creative'],
  },
  {
    id: 'healer',
    title: 'Doctor Without Borders',
    description: 'You\'ll travel to the world\'s most challenging places, bringing healing and hope to those who need it most.',
    reasoning: 'Your deep desire to help others and calm, steady nature make you a beacon of compassion.',
    emoji: '🏥',
    requiredTraits: ['helping', 'calm', 'logical'],
  },
  {
    id: 'inventor',
    title: 'Mad Inventor and Eccentric Genius',
    description: 'You\'ll create impossible machines and fantastical contraptions that blur the line between magic and science.',
    reasoning: 'Your creative, logical mind sees solutions where others see impossibilities.',
    emoji: '⚙️',
    requiredTraits: ['creative', 'logical', 'independent'],
  },
  {
    id: 'teacher',
    title: 'Beloved Teacher Shaping Young Minds',
    description: 'You\'ll inspire generations of students, helping them discover their potential and pursue their dreams.',
    reasoning: 'Your intellectual nature and passion for helping others makes you the perfect mentor and guide.',
    emoji: '📚',
    requiredTraits: ['helping', 'intellectual', 'calm'],
  },
  {
    id: 'adventurer',
    title: 'Deep Sea Explorer and Marine Biologist',
    description: 'You\'ll dive to the ocean\'s darkest depths, discovering species never seen by human eyes.',
    reasoning: 'Your adventurous spirit and intellectual curiosity draw you to Earth\'s last frontier.',
    emoji: '🌊',
    requiredTraits: ['adventurous', 'intellectual', 'risktaker'],
  },
  // Secret rare result (10% chance)
  {
    id: 'time-traveler',
    title: 'Time Traveler and Guardian of History',
    description: 'You\'ll hop through different eras, witnessing humanity\'s greatest moments and ensuring the timeline stays intact.',
    reasoning: 'Your unique combination of traits has caught the attention of the Time Council. Welcome to the most exciting job in any century!',
    emoji: '⏰',
    requiredTraits: [], // Can match anyone - it's random!
    isSecret: true,
  },
  {
    id: 'cosmic-artist',
    title: 'Cosmic Artist Painting with Nebulas',
    description: 'You\'ll create art on a universal scale, using stars and galaxies as your canvas in the void of space.',
    reasoning: 'The universe has recognized your creative spirit is too vast for just one planet. Time to paint among the stars!',
    emoji: '✨',
    requiredTraits: [], // Can match anyone - it's random!
    isSecret: true,
  },
];
