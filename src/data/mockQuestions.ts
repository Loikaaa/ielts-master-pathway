import { Question } from '@/types/questions';

export const mockQuestions: Question[] = [
  // Reading Questions - Academic Format
  {
    id: 'reading-1',
    skillType: 'reading',
    difficulty: 'medium',
    points: 10,
    timeLimit: 3600, // 60 minutes for reading section
    passageTitle: 'The Impact of Climate Change on Biodiversity',
    passageText: `Climate change poses one of the most significant threats to biodiversity in the 21st century. As global temperatures rise, ecosystems worldwide are experiencing profound alterations in their structure and function. These changes are occurring at an unprecedented rate, forcing species to either adapt, migrate, or face extinction.

The Intergovernmental Panel on Climate Change (IPCC) has documented extensive evidence of ecological impacts across terrestrial, freshwater, and marine environments. In terrestrial ecosystems, rising temperatures have triggered shifts in phenology—the timing of seasonal activities such as flowering, breeding, and migration. Many plant species are flowering earlier in spring, while migratory birds are adjusting their departure and arrival times. However, not all species can respond at the same rate, leading to mismatches in ecological interactions, such as between plants and their pollinators or between predators and prey.

Mountain ecosystems are particularly vulnerable to climate change. As temperatures rise, species adapted to cooler environments move upslope, effectively reducing their available habitat. Species already occupying the highest elevations face what ecologists call the "summit trap"—they have nowhere higher to go and may ultimately disappear from these regions. The Alpine ibex, for instance, has shown clear upward shifts in its distribution over recent decades.

Marine biodiversity faces multiple climate-related stressors, including ocean warming, acidification, and deoxygenation. Coral reefs, often called the "rainforests of the sea" due to their remarkable biodiversity, are among the most severely affected ecosystems. When water temperatures exceed corals' thermal tolerance, they expel their symbiotic algae in a process known as bleaching, which can lead to widespread mortality if conditions do not improve quickly enough. The Great Barrier Reef has experienced multiple mass bleaching events since 1998, with the frequency increasing in recent years.

Polar regions are warming faster than the global average, with dramatic consequences for biodiversity. The Arctic has lost approximately 40% of its summer sea ice extent since satellite measurements began in 1979. This loss directly impacts species such as polar bears, which depend on sea ice for hunting, resting, and breeding. In Antarctica, changing sea ice conditions affect krill populations, a cornerstone species in the Southern Ocean food web that supports penguins, seals, and whales.

Conservation strategies must now account for both current and projected climate impacts. Traditional approaches focused on protecting static habitat reserves may be insufficient as species' ranges shift. Instead, preserving connectivity between habitats and identifying and protecting climate refugia—areas relatively buffered from climate change—have become priorities. Additionally, some researchers advocate for more interventionist approaches, such as assisted migration, which involves deliberately moving species to areas where they might thrive under future climate conditions.

Despite these challenges, certain ecosystems and species exhibit resilience to climate change. Areas with high topographic diversity may provide microrefugia where species can persist despite regional climate shifts. Similarly, species with high genetic diversity or phenotypic plasticity—the ability to modify their development, physiology, or behavior in response to environmental changes—may adapt more successfully.

Understanding and addressing the impacts of climate change on biodiversity requires interdisciplinary collaboration among climatologists, ecologists, conservation biologists, and policymakers. It also necessitates robust monitoring programs to track changes across ecosystems and evaluate the effectiveness of conservation interventions. While the challenges are substantial, integrated conservation approaches that combine reducing greenhouse gas emissions with strategies to help species adapt offer the best hope for preserving Earth's remarkable biodiversity in a changing climate.`,
    questions: [
      {
        id: 'reading-1-q1',
        questionText: 'According to the passage, phenology refers to:',
        questionType: 'multiple-choice',
        options: ['The study of climate impacts on ecosystems', 'The timing of seasonal activities in species', 'The movement of species to higher elevations', 'The interaction between different species'],
        correctAnswer: 'The timing of seasonal activities in species'
      },
      {
        id: 'reading-1-q2',
        questionText: 'The "summit trap" mentioned in the passage describes:',
        questionType: 'multiple-choice',
        options: [
          'A conservation strategy for mountain species',
          'The popular climbing routes in mountain ecosystems',
          'The situation where mountain species have nowhere higher to migrate',
          'A method to capture and relocate endangered mountain species'
        ],
        correctAnswer: 'The situation where mountain species have nowhere higher to migrate'
      },
      {
        id: 'reading-1-q3',
        questionText: 'According to the passage, coral bleaching occurs when:',
        questionType: 'multiple-choice',
        options: [
          'Corals are exposed to excessive sunlight',
          'Water temperatures exceed corals\' thermal tolerance',
          'Ocean acidification dissolves coral structures',
          'Pollutants in the water affect coral pigmentation'
        ],
        correctAnswer: 'Water temperatures exceed corals\' thermal tolerance'
      },
      {
        id: 'reading-1-q4',
        questionText: 'The passage states that Arctic summer sea ice has decreased by approximately:',
        questionType: 'multiple-choice',
        options: ['20%', '30%', '40%', '50%'],
        correctAnswer: '40%'
      },
      {
        id: 'reading-1-q5',
        questionText: 'The passage suggests that traditional conservation approaches may be insufficient because:',
        questionType: 'multiple-choice',
        options: [
          'They focus too much on genetic diversity',
          'They are too expensive to implement',
          'They cannot protect against ocean acidification',
          'They focus on protecting static habitat reserves as species\' ranges shift'
        ],
        correctAnswer: 'They focus on protecting static habitat reserves as species\' ranges shift'
      },
      {
        id: 'reading-1-q6',
        questionText: 'Climate refugia are described in the passage as:',
        questionType: 'multiple-choice',
        options: [
          'Areas where endangered species are relocated',
          'Regions with the highest biodiversity',
          'Areas relatively buffered from climate change',
          'Locations where conservation policies are strictly enforced'
        ],
        correctAnswer: 'Areas relatively buffered from climate change'
      },
      {
        id: 'reading-1-q7',
        questionText: 'According to the passage, mountain ecosystems are particularly vulnerable to climate change.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      },
      {
        id: 'reading-1-q8',
        questionText: 'The passage suggests that all marine species are equally affected by climate change.',
        questionType: 'true-false-not-given',
        correctAnswer: 'False'
      },
      {
        id: 'reading-1-q9',
        questionText: 'The passage indicates that assisted migration is universally accepted as the best conservation strategy.',
        questionType: 'true-false-not-given',
        correctAnswer: 'False'
      },
      {
        id: 'reading-1-q10',
        questionText: 'The Great Barrier Reef has experienced multiple mass bleaching events since 1998.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      },
      {
        id: 'reading-1-q11',
        questionText: 'The passage mentions that polar bears depend on sea ice for:',
        questionType: 'summary-completion',
        correctAnswer: 'hunting, resting, and breeding'
      },
      {
        id: 'reading-1-q12',
        questionText: 'Krill are described in the passage as a _____ species in the Southern Ocean food web.',
        questionType: 'summary-completion',
        correctAnswer: 'cornerstone'
      },
      // Additional questions to make a total of 40
      {
        id: 'reading-1-q13',
        questionText: 'Which of the following is NOT mentioned as a climate-related stressor affecting marine biodiversity?',
        questionType: 'multiple-choice',
        options: [
          'Ocean warming',
          'Acidification',
          'Deoxygenation',
          'Eutrophication'
        ],
        correctAnswer: 'Eutrophication'
      },
      {
        id: 'reading-1-q14',
        questionText: 'According to the passage, what percentage of Earth\'s species is expected to go extinct due to climate change?',
        questionType: 'true-false-not-given',
        correctAnswer: 'Not Given'
      },
      {
        id: 'reading-1-q15',
        questionText: 'The passage suggests that species with high genetic diversity may adapt more successfully to climate change.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      },
      {
        id: 'reading-1-q16',
        questionText: 'According to the passage, the frequency of mass bleaching events at the Great Barrier Reef has:',
        questionType: 'multiple-choice',
        options: [
          'Remained stable since 1998',
          'Decreased over the past decade',
          'Increased in recent years',
          'Disappeared entirely'
        ],
        correctAnswer: 'Increased in recent years'
      },
      {
        id: 'reading-1-q17',
        questionText: 'Phenotypic plasticity is defined in the passage as:',
        questionType: 'summary-completion',
        correctAnswer: 'the ability to modify their development, physiology, or behavior in response to environmental changes'
      },
      {
        id: 'reading-1-q18',
        questionText: 'The passage mentions that areas with high _____ diversity may provide microrefugia where species can persist.',
        questionType: 'summary-completion',
        correctAnswer: 'topographic'
      },
      {
        id: 'reading-1-q19',
        questionText: 'According to the passage, which species is specifically mentioned as showing upward shifts in distribution?',
        questionType: 'multiple-choice',
        options: [
          'Polar bears',
          'Krill',
          'Alpine ibex',
          'Migratory birds'
        ],
        correctAnswer: 'Alpine ibex'
      },
      {
        id: 'reading-1-q20',
        questionText: 'The passage states that understanding climate change impacts requires collaboration among:',
        questionType: 'summary-completion',
        correctAnswer: 'climatologists, ecologists, conservation biologists, and policymakers'
      },
      {
        id: 'reading-1-q21',
        questionText: 'According to the passage, coral reefs are often referred to as:',
        questionType: 'multiple-choice',
        options: [
          'Ocean gardens',
          'Rainforests of the sea',
          'Marine sanctuaries',
          'Biodiversity hotspots'
        ],
        correctAnswer: 'Rainforests of the sea'
      },
      {
        id: 'reading-1-q22',
        questionText: 'The passage states that preserving connectivity between habitats has become a priority in conservation.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      },
      {
        id: 'reading-1-q23',
        questionText: 'The passage mentions that shifting phenology can lead to:',
        questionType: 'multiple-choice',
        options: [
          'Increased species diversity',
          'Enhanced ecosystem resilience',
          'Mismatches in ecological interactions',
          'Greater genetic diversity'
        ],
        correctAnswer: 'Mismatches in ecological interactions'
      },
      {
        id: 'reading-1-q24',
        questionText: 'According to the passage, coral symbionts expelled during bleaching are:',
        questionType: 'summary-completion',
        correctAnswer: 'algae'
      },
      {
        id: 'reading-1-q25',
        questionText: 'The passage claims that the only way to preserve biodiversity is to reduce greenhouse gas emissions.',
        questionType: 'true-false-not-given',
        correctAnswer: 'False'
      },
      {
        id: 'reading-1-q26',
        questionText: 'According to the passage, which of the following is NOT mentioned as a response of species to climate change?',
        questionType: 'multiple-choice',
        options: [
          'Adaptation',
          'Migration',
          'Extinction',
          'Hibernation'
        ],
        correctAnswer: 'Hibernation'
      },
      {
        id: 'reading-1-q27',
        questionText: 'The passage suggests that robust _____ programs are necessary to track ecosystem changes.',
        questionType: 'summary-completion',
        correctAnswer: 'monitoring'
      },
      {
        id: 'reading-1-q28',
        questionText: 'The passage states that the Intergovernmental Panel on Climate Change has documented evidence of ecological impacts across:',
        questionType: 'summary-completion',
        correctAnswer: 'terrestrial, freshwater, and marine environments'
      },
      {
        id: 'reading-1-q29',
        questionText: 'According to the passage, polar regions are warming:',
        questionType: 'multiple-choice',
        options: [
          'At the same rate as the global average',
          'Slower than the global average',
          'Faster than the global average',
          'Only in summer months'
        ],
        correctAnswer: 'Faster than the global average'
      },
      {
        id: 'reading-1-q30',
        questionText: 'The passage suggests that satellite measurements of Arctic sea ice began in:',
        questionType: 'summary-completion',
        correctAnswer: '1979'
      },
      {
        id: 'reading-1-q31',
        questionText: 'According to the passage, assisted migration involves:',
        questionType: 'multiple-choice',
        options: [
          'Helping species adapt in their current habitat',
          'Creating artificial environments for endangered species',
          'Deliberately moving species to potentially suitable areas',
          'Training species to migrate naturally'
        ],
        correctAnswer: 'Deliberately moving species to potentially suitable areas'
      },
      {
        id: 'reading-1-q32',
        questionText: 'The passage explicitly states that integrated conservation approaches should combine reducing greenhouse gas emissions with:',
        questionType: 'summary-completion',
        correctAnswer: 'strategies to help species adapt'
      },
      {
        id: 'reading-1-q33',
        questionText: 'According to the passage, migratory birds are:',
        questionType: 'multiple-choice',
        options: [
          'Unaffected by climate change',
          'Becoming completely extinct',
          'Adjusting their departure and arrival times',
          'Abandoning migration entirely'
        ],
        correctAnswer: 'Adjusting their departure and arrival times'
      },
      {
        id: 'reading-1-q34',
        questionText: 'The passage claims that climate change is causing many plant species to flower:',
        questionType: 'summary-completion',
        correctAnswer: 'earlier in spring'
      },
      {
        id: 'reading-1-q35',
        questionText: 'According to the passage, the Alpine ibex has shown clear _____ shifts in its distribution over recent decades.',
        questionType: 'summary-completion',
        correctAnswer: 'upward'
      },
      {
        id: 'reading-1-q36',
        questionText: 'The passage states that Antarctica\'s changing sea ice conditions affect:',
        questionType: 'multiple-choice',
        options: [
          'Coral reef formation',
          'Krill populations',
          'Carbon sequestration',
          'Mountain species migration'
        ],
        correctAnswer: 'Krill populations'
      },
      {
        id: 'reading-1-q37',
        questionText: 'The passage mentions that climate change is causing ecosystem changes at a(n) _____ rate.',
        questionType: 'summary-completion',
        correctAnswer: 'unprecedented'
      },
      {
        id: 'reading-1-q38',
        questionText: 'According to the passage, which of these species depends on krill in the Southern Ocean food web?',
        questionType: 'multiple-choice',
        options: [
          'Alpine ibex',
          'Corals',
          'Penguins',
          'Migratory birds'
        ],
        correctAnswer: 'Penguins'
      },
      {
        id: 'reading-1-q39',
        questionText: 'The passage suggests that the future of Earth\'s biodiversity depends on:',
        questionType: 'multiple-choice',
        options: [
          'Completely stopping climate change',
          'Integrated conservation approaches',
          'Exclusive focus on greenhouse gas emissions',
          'Abandoning traditional conservation methods entirely'
        ],
        correctAnswer: 'Integrated conservation approaches'
      },
      {
        id: 'reading-1-q40',
        questionText: 'The passage concludes by suggesting that preservation of Earth\'s biodiversity in a changing climate is:',
        questionType: 'multiple-choice',
        options: [
          'Impossible given current trends',
          'Only possible through assisted migration',
          'Guaranteed if emissions are reduced',
          'Possible with integrated approaches'
        ],
        correctAnswer: 'Possible with integrated approaches'
      }
    ]
  },
  
  // Writing Questions
  {
    id: 'writing-1',
    skillType: 'writing',
    difficulty: 'hard',
    points: 15,
    timeLimit: 1200, // 20 minutes for Task 1
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
    timeLimit: 2400, // 40 minutes for Task 2
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
    promptText: "Let's talk about your home town or city. Where is it located and what is it known for?",
    followUpQuestions: [
      'How long have you lived there?',
      'What do you like most about living there?',
      'Would you recommend it as a place for tourists to visit?',
      'Are there any aspects of your hometown that could be improved?'
    ],
    preparationTime: 0, // No preparation time for Part 1
    responseTime: 60 // 1 minute per question typically
  },
  {
    id: 'speaking-2',
    skillType: 'speaking',
    difficulty: 'medium',
    points: 15,
    partNumber: 2,
    promptText: "Describe a skill you would like to learn. You should say:\n- what this skill is\n- how you would learn it\n- how difficult it would be to learn\n- and explain why you want to learn this skill.",
    preparationTime: 60, // 1 minute prep
    responseTime: 120 // 2 minutes speaking
  },
  {
    id: 'speaking-3',
    skillType: 'speaking',
    difficulty: 'hard',
    points: 15,
    partNumber: 3,
    promptText: "Let's consider skills and learning more generally.",
    followUpQuestions: [
      "Do you think certain skills are more important than others in today's society?",
      'How has technology changed the way people learn new skills?',
      'Do you think schools should focus more on practical skills or academic knowledge?',
      'How important is it for people to continue learning new skills throughout their lives?'
    ],
    preparationTime: 0, // No preparation time for Part 3
    responseTime: 120 // Generally 2 minutes per question
  },
  
  // Listening Questions
  {
    id: 'listening-1',
    skillType: 'listening',
    difficulty: 'easy',
    points: 10,
    timeLimit: 2400, // 40 minutes total (30 listening + 10 transfer)
    sectionNumber: 1,
    audioUrl: 'https://example.com/listening-section1.mp3', // This would be a real audio file in a production app
    transcript: "Woman: Good morning. Welcome to Greenfield Community Center. How can I help you?\n\nMan: Hi, I'd like to book a room for a community meeting next week.\n\nWoman: Sure. We have several rooms available. What size room do you need?\n\nMan: We'll have about 20 people, so nothing too large.\n\nWoman: The Cedar Room would be perfect then. It fits up to 25 people comfortably. When would you like to book it?\n\nMan: We're looking at next Thursday evening, from 7 to 9 PM.\n\nWoman: Let me check availability... Yes, that's available. Can I take your details?\n\nMan: Of course. My name is Robert Chen. That's C-H-E-N.\n\nWoman: And do you have a phone number where we can reach you?\n\nMan: Yes, it's 0845 789 6240.\n\nWoman: Great. And what type of meeting will you be holding?\n\nMan: It's for a neighborhood watch group. We meet monthly to discuss local safety issues.\n\nWoman: I see. The standard rate for the Cedar Room is £45 for two hours, but we offer a 20% discount for community safety groups, so that would be £36 in total.\n\nMan: That sounds reasonable. How do I pay?\n\nWoman: You can pay now by card or cash, or you can pay on the day. We do ask for a £10 deposit if you're paying later.\n\nMan: I'll pay the full amount now by card if that's okay.\n\nWoman: Perfect. And just to let you know, we have a projector and screen available if you need it, at no extra charge. Would you like to reserve that as well?\n\nMan: Yes, that would be very useful, thank you.",
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
        questionText: 'The meeting is scheduled for next:',
        questionType: 'form-completion',
        correctAnswer: 'Thursday'
      },
      {
        id: 'listening-1-q4',
        questionText: 'The meeting will start at:',
        questionType: 'form-completion',
        correctAnswer: '7 PM'
      },
      {
        id: 'listening-1-q5',
        questionText: 'The man\'s phone number is:',
        questionType: 'form-completion',
        correctAnswer: '0845 789 6240'
      },
      {
        id: 'listening-1-q6',
        questionText: 'What type of group is holding the meeting?',
        questionType: 'multiple-choice',
        options: ['Environmental activists', 'Neighborhood watch', 'Local business owners', 'Community gardening'],
        correctAnswer: 'Neighborhood watch'
      },
      {
        id: 'listening-1-q7',
        questionText: 'The standard rate for the room is £45 for:',
        questionType: 'form-completion',
        correctAnswer: 'two hours'
      },
      {
        id: 'listening-1-q8',
        questionText: 'The group receives a discount of:',
        questionType: 'form-completion',
        correctAnswer: '20%'
      },
      {
        id: 'listening-1-q9',
        questionText: 'The total amount to pay after discount is:',
        questionType: 'form-completion',
        correctAnswer: '£36'
      },
      {
        id: 'listening-1-q10',
        questionText: 'What equipment is available at no extra charge?',
        questionType: 'multiple-choice',
        options: ['Microphone system', 'Video conferencing', 'Projector and screen', 'Coffee machine'],
        correctAnswer: 'Projector and screen'
      }
    ]
  },
  {
    id: 'listening-2',
    skillType: 'listening',
    difficulty: 'medium',
    points: 10,
    timeLimit: 2400, // 40 minutes total (30 listening + 10 transfer)
    sectionNumber: 2,
    audioUrl: 'https://example.com/listening-section2.mp3',
    transcript: "Good morning everyone. Today I'll be giving you an overview of our company's new office recycling program. As you know, sustainability is one of our core values, and this initiative will help us significantly reduce our environmental footprint.\n\nStarting from next Monday, that's May 15th, you'll notice some changes around the office. First, we're removing individual waste bins from desks. Instead, we're installing central recycling stations on each floor. Each station will have four clearly labeled bins: one for paper, one for plastics, one for glass and metal, and one for general waste.\n\nThe paper bin is for office paper, newspapers, magazines, and cardboard. Please remove any plastic windows from envelopes before placing them in this bin. The plastics bin is for clean plastic containers, bottles, and packaging. Please make sure to rinse any food containers before recycling them. The glass and metal bin is for glass bottles, jars, and metal cans. Again, these should be rinsed. Finally, the general waste bin is for anything that cannot be recycled, such as food waste and certain types of packaging.\n\nWe're also making changes to our kitchen areas. We're replacing disposable cups with ceramic mugs, and plastic cutlery with metal alternatives. Each employee will receive a reusable water bottle next week as part of our campaign to eliminate single-use plastics.\n\nTo help everyone adjust to these changes, we'll be holding information sessions this Thursday and Friday in Conference Room B. The sessions will run at 10 AM and 2 PM on both days, and will last approximately 30 minutes. We'll go through the recycling program in more detail and answer any questions you might have.\n\nWe're also looking for volunteers to act as \"Green Champions\" for each department. These individuals will help promote the program and assist colleagues with any recycling questions. If you're interested in becoming a Green Champion, please email Sarah in HR by this Wednesday.\n\nFinally, we'll be tracking our progress with monthly reports on waste reduction. Our initial goal is to reduce our general waste by 40% in the first three months, and to increase our recycling rate to 75% of all waste generated. Long-term, we aim to become a zero-waste office by 2025.\n\nThank you for your attention, and for your support in making our workplace more environmentally friendly.",
    questions: [
      {
        id: 'listening-2-q1',
        questionText: 'When will the new recycling program start?',
        questionType: 'form-completion',
        correctAnswer: 'May 15th'
      },
      {
        id: 'listening-2-q2',
        questionText: 'How many different bins will be at each recycling station?',
        questionType: 'form-completion',
        correctAnswer: '4'
      }
    ]
  }
];
