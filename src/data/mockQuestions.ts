
import { Question } from '@/types/questions';

export const mockQuestions: Question[] = [
  // Reading Questions
  {
    id: 'reading-1',
    skillType: 'reading',
    difficulty: 'medium',
    points: 10,
    timeLimit: 300, // 5 minutes
    passageTitle: 'The Impact of Climate Change on Ecosystems',
    passageText: `Climate change has profound effects on ecosystems worldwide. The increase in global temperatures, shifting precipitation patterns, rising sea levels, and more frequent extreme weather events are altering habitats and forcing species to adapt or face extinction.\n\nOne of the most visible impacts is the disruption of phenology—the timing of seasonal activities such as flowering, breeding, and migration. As temperatures rise, many species are shifting these activities to earlier in the year. However, not all species respond at the same rate, leading to ecological mismatches. For instance, if plants flower before their pollinators emerge, both populations may decline.\n\nMarine ecosystems face particular challenges due to ocean acidification—a direct result of increased carbon dioxide absorption. This chemical change makes it difficult for coral, shellfish, and certain plankton to form their calcium carbonate structures, threatening the foundation of marine food webs.\n\nIn polar regions, the melting of sea ice reduces hunting grounds for species like polar bears while opening new territories for temperate species to expand northward. This redistribution of species creates novel interactions with unpredictable outcomes.`,
    questions: [
      {
        id: 'reading-1-q1',
        questionText: 'What term does the passage use to describe the timing of seasonal activities in species?',
        questionType: 'multiple-choice',
        options: ['Chronobiology', 'Phenology', 'Seasonal adaptation', 'Climate response'],
        correctAnswer: 'Phenology'
      },
      {
        id: 'reading-1-q2',
        questionText: 'According to the passage, why does ocean acidification threaten marine ecosystems?',
        questionType: 'multiple-choice',
        options: [
          'It causes water temperatures to rise too quickly',
          'It makes the water too salty for marine life',
          'It prevents certain organisms from forming calcium carbonate structures',
          'It reduces oxygen levels in the ocean'
        ],
        correctAnswer: 'It prevents certain organisms from forming calcium carbonate structures'
      },
      {
        id: 'reading-1-q3',
        questionText: 'The passage states that climate change is forcing species to adapt or face extinction.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      }
    ]
  },
  
  // Writing Questions
  {
    id: 'writing-1',
    skillType: 'writing',
    difficulty: 'hard',
    points: 15,
    timeLimit: 1200, // 20 minutes
    taskType: 'task1',
    prompt: 'The graph below shows electricity production (in terawatt hours) by fuel type in Country X between 1980 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: 'https://placehold.co/600x400/png?text=Electricity+Production+Graph',
    wordLimit: 150
  },
  {
    id: 'writing-2',
    skillType: 'writing',
    difficulty: 'hard',
    points: 25,
    timeLimit: 2400, // 40 minutes
    taskType: 'task2',
    prompt: 'Some people believe that universities should focus on providing academic skills rather than preparing students for employment. To what extent do you agree or disagree?',
    wordLimit: 250
  },
  
  // Speaking Questions
  {
    id: 'speaking-1',
    skillType: 'speaking',
    difficulty: 'medium',
    points: 10,
    partNumber: 1,
    promptText: 'Let\'s talk about your home town or city. Where is it located and what is it known for?',
    followUpQuestions: [
      'How long have you lived there?',
      'What do you like most about living there?',
      'Would you recommend it as a place for tourists to visit?'
    ],
    preparationTime: 0, // No preparation time for Part 1
    responseTime: 120 // 2 minutes
  },
  {
    id: 'speaking-2',
    skillType: 'speaking',
    difficulty: 'medium',
    points: 15,
    partNumber: 2,
    promptText: 'Describe a skill you would like to learn. You should say:\n- what this skill is\n- how you would learn it\n- how difficult it would be to learn\n- and explain why you want to learn this skill.',
    preparationTime: 60, // 1 minute prep
    responseTime: 120 // 2 minutes speaking
  },
  
  // Listening Questions
  {
    id: 'listening-1',
    skillType: 'listening',
    difficulty: 'easy',
    points: 10,
    timeLimit: 300, // 5 minutes
    sectionNumber: 1,
    audioUrl: 'https://example.com/listening-section1.mp3', // This would be a real audio file in a production app
    transcript: 'Woman: Good morning. Welcome to Greenfield Community Center. How can I help you?\n\nMan: Hi, I\'d like to book a room for a community meeting next week.\n\nWoman: Sure. We have several rooms available. What size room do you need?\n\nMan: We\'ll have about 20 people, so nothing too large.\n\nWoman: The Cedar Room would be perfect then. It fits up to 25 people comfortably. When would you like to book it?\n\nMan: We\'re looking at next Thursday evening, from 7 to 9 PM.\n\nWoman: Let me check availability... Yes, that\'s available. Can I take your details?',
    questions: [
      {
        id: 'listening-1-q1',
        questionText: 'How many people will attend the meeting?',
        questionType: 'form-completion',
        correctAnswer: '20'
      },
      {
        id: 'listening-1-q2',
        questionText: 'Which room does the woman suggest?',
        questionType: 'multiple-choice',
        options: ['Pine Room', 'Maple Room', 'Cedar Room', 'Oak Room'],
        correctAnswer: 'Cedar Room'
      },
      {
        id: 'listening-1-q3',
        questionText: 'What day is the room being booked for?',
        questionType: 'form-completion',
        correctAnswer: 'Thursday'
      }
    ]
  }
];
