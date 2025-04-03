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
      }
    ]
  },
  {
    id: 'reading-2',
    skillType: 'reading',
    difficulty: 'medium',
    points: 10,
    timeLimit: 3600, // 60 minutes for reading section
    passageTitle: 'The Evolution of Urban Planning',
    passageText: `Urban planning has undergone significant transformations throughout history, reflecting changing societal needs, technological capabilities, and ideological frameworks. From ancient civilizations to modern metropolises, the principles and practices guiding city development have evolved in response to diverse challenges and aspirations.

Ancient urban planning often centered around religious and defensive considerations. In Mesopotamia, cities like Ur featured ziggurats at their core, with residential areas radiating outward. Egyptian cities similarly organized around temples, while Greek city-states incorporated agoras as central public spaces for civic engagement. The Romans advanced urban planning considerably, implementing grid systems, aqueducts, and public facilities in towns throughout their empire. Their planning emphasized functionality, public health, and civic pride, aspects still relevant in contemporary approaches.

The medieval period witnessed a shift toward organic urban development, with cities growing incrementally around castles, cathedrals, and marketplaces. Narrow, winding streets characterized European medieval towns, formed not through deliberate planning but in response to immediate needs and topographical constraints. This organic approach contrasted with the structured layouts found in some Islamic and Chinese cities of the same era, where geometric principles and cosmological beliefs influenced urban form.

Renaissance planners reintroduced classical ideals, emphasizing symmetry, proportion, and visual harmony. Cities like Palmanova in Italy exemplified this approach with their radial street patterns and geometric fortifications. The Baroque period further elaborated these principles, as seen in the grand boulevards and monumental squares of Paris and Rome, which facilitated both aesthetic experiences and political control.

The Industrial Revolution marked a critical juncture in urban planning history. Rapid urbanization generated unprecedented challenges—overcrowding, pollution, and inadequate infrastructure plagued industrial cities. Reformers like Ebenezer Howard proposed new models such as the Garden City, which aimed to combine urban amenities with rural environments. This period also saw the emergence of zoning regulations, separating residential, commercial, and industrial areas to mitigate conflicts between land uses.

The early 20th century witnessed the rise of modernist planning, championed by figures like Le Corbusier and the International Congress of Modern Architecture (CIAM). Modernists advocated for rational, functional cities with distinct zones, high-rise buildings set in open spaces, and comprehensive transportation networks. This approach reached its zenith in planned cities like Brasília and Chandigarh, where entire urban environments were designed from scratch according to modernist principles.

However, by the 1960s, critiques of modernist planning gained traction. Jane Jacobs's seminal work "The Death and Life of Great American Cities" challenged prevailing orthodoxies, arguing that the vitality of urban areas stemmed from diversity, mixed uses, and organic street life—precisely the elements modernist planning often eliminated. Her ideas helped spark a movement toward more participatory and context-sensitive approaches.

The late 20th century saw planning increasingly engage with environmental concerns, social equity, and cultural preservation. Concepts like sustainable development, transit-oriented design, and historic conservation gained prominence. Simultaneously, globalization intensified competition among cities, prompting many to use planning and iconic architecture as tools for economic development and branding.

Today's urban planning embraces complexity and interdisciplinary approaches. The smart city movement leverages technology to enhance urban management and services, while tactical urbanism encourages small-scale, citizen-led interventions. Planning now frequently incorporates resilience strategies to address climate change and other shocks. Additionally, there is growing recognition of planning's role in either perpetuating or remedying social inequalities, leading to greater emphasis on inclusive processes and equitable outcomes.

As urbanization continues globally, with over half the world's population now living in cities, effective urban planning becomes increasingly crucial. Contemporary planners face the challenge of creating environments that are simultaneously efficient, sustainable, resilient, and equitable—balancing immediate needs with long-term vision. While approaches vary across different cultural and political contexts, the fundamental goal of enhancing quality of life through thoughtful spatial organization remains constant, connecting today's practice with the earliest urban planning efforts thousands of years ago.`,
    questions: [
      {
        id: 'reading-2-q1',
        questionText: 'According to the passage, ancient urban planning often centered around:',
        questionType: 'multiple-choice',
        options: ['Economic considerations', 'Military strategy', 'Religious and defensive considerations', 'Entertainment venues'],
        correctAnswer: 'Religious and defensive considerations'
      },
      {
        id: 'reading-2-q2',
        questionText: 'The passage describes medieval European town development as:',
        questionType: 'multiple-choice',
        options: [
          'Highly structured and planned',
          'Organic and incremental',
          'Based on Renaissance ideals',
          'Focused on transportation networks'
        ],
        correctAnswer: 'Organic and incremental'
      },
      {
        id: 'reading-2-q3',
        questionText: 'Who proposed the Garden City model mentioned in the passage?',
        questionType: 'multiple-choice',
        options: [
          'Jane Jacobs',
          'Le Corbusier',
          'Ebenezer Howard',
          'The Romans'
        ],
        correctAnswer: 'Ebenezer Howard'
      },
      {
        id: 'reading-2-q4',
        questionText: 'According to the passage, modernist planning was characterized by:',
        questionType: 'multiple-choice',
        options: [
          'Organic street patterns',
          'Mixed-use development',
          'Distinct zones and high-rise buildings in open spaces',
          'Medieval architectural styles'
        ],
        correctAnswer: 'Distinct zones and high-rise buildings in open spaces'
      }
    ]
  },
  
  // New IELTS-style reading questions with different question types
  {
    id: 'reading-3',
    skillType: 'reading',
    difficulty: 'hard',
    points: 10,
    timeLimit: 3600, // 60 minutes for reading section
    passageTitle: 'The Origins and Impacts of Social Media',
    passageText: `The evolution of social media represents one of the most significant technological and social transformations of the early 21st century. What began as simple platforms for digital connection has evolved into complex ecosystems that profoundly influence nearly every aspect of human society, from personal relationships to global politics.

The roots of social media can be traced to the late 1990s and early 2000s with platforms like Six Degrees and Friendster, which pioneered the concept of digital social networks based on real-world connections. However, it was the launch of Facebook in 2004, initially as a Harvard-exclusive network, that marked the beginning of social media's exponential growth. The platform's expansion to other universities and eventually to the general public established a template that countless other platforms would follow. By introducing features like the News Feed in 2006, Facebook fundamentally changed how people consumed information online, shifting from active searching to passive consumption of algorithmically curated content.

During the same period, Twitter emerged with its distinctive format of short-form content, originally limited to 140 characters. This constraint, initially implemented due to SMS compatibility requirements, inadvertently created a new form of communication that valued brevity and immediacy. Twitter's simple but powerful mechanism of following others without requiring reciprocation differentiated it from Facebook's mutual friendship model and enabled it to become a powerful platform for real-time news dissemination and public discourse.

The launch of the iPhone in 2007 and the subsequent smartphone revolution dramatically accelerated social media adoption by making these platforms constantly accessible. Mobile access transformed social media from occasional desktop activities to persistent, integrated aspects of daily life. This shift enabled entirely new platforms like Instagram (2010) and Snapchat (2011) to emerge with mobile-first experiences centered around visual communication rather than text.

The business models underpinning major social media platforms have predominantly relied on advertising revenue, generated through the collection and analysis of user data. This has led to increasingly sophisticated algorithms designed to maximize engagement by personalizing content. While these algorithms have enabled more relevant content delivery, they have also contributed to what researchers call "filter bubbles" and "echo chambers," where users primarily encounter information that aligns with their existing beliefs and preferences.

The psychological and social impacts of social media have been the subject of extensive research and debate. Studies have documented correlations between social media use and issues including anxiety, depression, and diminished attention spans, particularly among younger users. However, the same platforms have also been credited with reducing isolation for marginalized groups, enabling new forms of community building, and facilitating social movements from the Arab Spring to #MeToo.

In education, social media has created both challenges and opportunities. While educators express concern about shortened attention spans and the distractions posed by constant connectivity, these platforms have also enabled collaborative learning, global classroom connections, and access to educational content for students in remote or underserved regions. Many educational institutions have embraced social media as communication and teaching tools, recognizing their potential to engage students through familiar interfaces.

The political implications of social media have perhaps been the most significant and controversial. These platforms have democratized public discourse by removing traditional gatekeepers and enabling anyone with internet access to potentially reach global audiences. This democratization has amplified previously marginalized voices and facilitated rapid information sharing during crises. However, the same features have enabled the spread of misinformation and disinformation, with documented impacts on elections worldwide and public health responses to the COVID-19 pandemic.

Regulatory approaches to social media have varied significantly across different countries and jurisdictions. The European Union has implemented some of the most comprehensive regulations through the General Data Protection Regulation (GDPR) and the Digital Services Act, focusing on data privacy, algorithmic transparency, and platform responsibility for content moderation. In contrast, the United States has relied primarily on Section 230 of the Communications Decency Act, which largely shields platforms from liability for user-generated content. Meanwhile, countries like China have implemented extensive restrictions and monitoring systems, demonstrating an entirely different approach to social media governance.

As social media continues to evolve, emerging technologies like virtual reality, augmented reality, and artificial intelligence promise to further transform these platforms. The concept of the "metaverse" represents a potential future where social interactions occur in immersive digital environments, potentially deepening both the benefits and challenges of social media. Similarly, advances in AI-generated content raise new questions about authenticity and trust in digital spaces.

Understanding the complex and multifaceted impacts of social media requires nuanced analysis beyond simplistic narratives of either utopian progress or dystopian decline. These platforms have simultaneously connected and divided, informed and misinformed, empowered and exploited. As society continues to adapt to these powerful technologies, the challenge lies in maximizing their benefits while developing effective safeguards against their most harmful effects.`,
    questions: [
      // Multiple Choice
      {
        id: 'reading-3-q1',
        questionText: 'According to the passage, Facebook's introduction of the News Feed in 2006:',
        questionType: 'multiple-choice',
        options: [
          'reduced the popularity of the platform',
          'shifted users from passive consumption to active searching',
          'changed how people consumed information online',
          'was initially restricted to Harvard students only'
        ],
        correctAnswer: 'changed how people consumed information online'
      },
      // True/False/Not Given
      {
        id: 'reading-3-q2',
        questionText: 'The passage states that Twitter's 140-character limit was originally implemented due to SMS compatibility requirements.',
        questionType: 'true-false-not-given',
        correctAnswer: 'True'
      },
      {
        id: 'reading-3-q3',
        questionText: 'According to the passage, social media has had a universally negative impact on education.',
        questionType: 'true-false-not-given',
        correctAnswer: 'False'
      },
      {
        id: 'reading-3-q4',
        questionText: 'The author believes that virtual reality will eventually replace traditional social media platforms.',
        questionType: 'true-false-not-given',
        correctAnswer: 'Not Given'
      },
      // Yes/No/Not Given
      {
        id: 'reading-3-q5',
        questionText: 'The author supports stricter government regulation of social media platforms.',
        questionType: 'yes-no-not-given',
        correctAnswer: 'Not Given'
      },
      // Matching Information
      {
        id: 'reading-3-q6',
        questionText: 'In which paragraph does the author discuss how social media has affected political discourse?',
        questionType: 'matching-information',
        paragraphRefs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
        correctAnswer: 'H'
      },
      {
        id: 'reading-3-q7',
        questionText: 'Which paragraph mentions the psychological impacts of social media use?',
        questionType: 'matching-information',
        paragraphRefs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
        correctAnswer: 'F'
      },
      // Matching Headings
      {
        id: 'reading-3-q8',
        questionText: 'Choose the most suitable heading for paragraph E:',
        questionType: 'matching-headings',
        options: [
          'Revenue Generation and Algorithmic Design',
          'The Problem of Online Privacy',
          'How Social Media Companies Make Money',
          'Filter Bubbles: A Growing Concern'
        ],
        correctAnswer: 'Revenue Generation and Algorithmic Design'
      },
      // Matching Features
      {
        id: 'reading-3-q9',
        questionText: 'Which of the following is a characteristic of Twitter mentioned in the passage?',
        questionType: 'matching-features',
        features: [
          'Required mutual friendships',
          'Initially designed for desktop use',
          'Allowed following without reciprocation',
          'Focused primarily on visual content'
        ],
        correctAnswer: 'Allowed following without reciprocation'
      },
      // Matching Sentence Endings
      {
        id: 'reading-3-q10',
        questionText: 'Complete the sentence: "The smartphone revolution transformed social media by..."',
        questionType: 'matching-sentence-endings',
        sentenceEndings: [
          'making these platforms constantly accessible.',
          'reducing the time people spent online.',
          'eliminating the need for text-based communication.',
          'creating more privacy for users.'
        ],
        correctAnswer: 'making these platforms constantly accessible.'
      },
      // Sentence Completion
      {
        id: 'reading-3-q11',
        questionText: 'According to the passage, social media platforms have simultaneously _____, _____, and _____.',
        questionType: 'sentence-completion',
        correctAnswer: 'connected and divided, informed and misinformed, empowered and exploited'
      },
      {
        id: 'reading-3-q12',
        questionText: 'The passage mentions that the concept of the _____ represents a potential future where social interactions occur in immersive digital environments.',
        questionType: 'sentence-completion',
        correctAnswer: 'metaverse'
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
    promptText: 'Let\'s talk about your home town or city. Where is it located and what is it known for?',
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
    promptText: 'Describe a skill you would like to learn. You should say:\n- what this skill is\n- how you would learn it\n- how difficult it would be to learn\n- and explain why you want to learn this skill.',
    preparationTime: 60, // 1 minute prep
    responseTime: 120 // 2 minutes speaking
  },
  {
    id: 'speaking-3',
    skillType: 'speaking',
    difficulty: 'hard',
    points: 15,
    partNumber: 3,
    promptText: 'Let\'s consider skills and learning more generally.',
    followUpQuestions: [
      'Do you think certain skills are more important than others in today\'s society?',
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
    transcript: 'Woman: Good morning. Welcome to Greenfield Community Center. How can I help you?\n\nMan: Hi, I\'d like to book a room for a community meeting next week.\n\nWoman: Sure. We have several rooms available. What size room do you need?\n\nMan: We\'ll have about 20 people, so nothing too large.\n\nWoman: The Cedar Room would be perfect then. It fits up to 25 people comfortably. When would you like to book it?\n\nMan: We\'re looking at next Thursday evening, from 7 to 9 PM.\n\nWoman: Let me check availability... Yes, that\'s available. Can I take your details?\n\nMan: Of course. My name is Robert Chen. That\'s C-H-E-N.\n\nWoman: And do you have a phone number where we can reach you?\n\nMan: Yes, it\'s 0845 789 6240.\n\nWoman: Great. And what type of meeting will you be holding?\n\nMan: It\'s for a neighborhood watch group. We meet monthly to discuss local safety issues.\n\nWoman: I see. The standard rate for the Cedar Room is £45 for two hours, but we offer a 20% discount for community safety groups, so that would be £36 in total.\n\nMan: That sounds reasonable. How do I pay?\n\nWoman: You can pay now by card or cash, or you can pay on the day. We do ask for a £10 deposit if you\'re paying later.\n\nMan: I\'ll pay the full amount now by card if that\'s okay.\n\nWoman: Perfect. And just to let you know, we have a projector and screen available if you need it, at no extra charge. Would you like to reserve that as well?\n\nMan: Yes, that would be very useful, thank you.',
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
    transcript: 'Good morning everyone. Today I\'ll be giving you an overview of our company\'s new office recycling program. As you know, sustainability is one of our core values, and this initiative will help us significantly reduce our environmental footprint.\n\nStarting from next Monday, that\'s May 15th, you\'ll notice some changes around the office. First, we\'re removing individual waste bins from desks. Instead, we\'re installing central recycling stations on each floor. Each station will have four clearly labeled bins: one for paper, one for plastics, one for glass and metal, and one for general waste.\n\nThe paper bin is for office paper, newspapers, magazines, and cardboard. Please remove any plastic windows from envelopes before placing them in this bin. The plastics bin is for clean plastic containers, bottles, and packaging. Please make sure to rinse any food containers before recycling them. The glass and metal bin is for glass bottles, jars, and metal cans. Again, these should be rinsed. Finally, the general waste bin is for anything that cannot be recycled, such as food waste and certain types of packaging.\n\nWe\'re also making changes to our kitchen areas. We\'re replacing disposable cups with ceramic mugs, and plastic cutlery with metal alternatives. Each employee will receive a reusable water bottle next week as part of our campaign to eliminate single-use plastics.\n\nTo help everyone adjust to these changes, we\'ll be holding information sessions this Thursday and Friday in Conference Room B. The sessions will run at 10 AM and 2 PM on both days, and will last approximately 30 minutes. We\'ll go through the recycling program in more detail and answer any questions you might have.\n\nWe\'re also looking for volunteers to act as "Green Champions" for each department. These individuals will help promote the program and assist colleagues with any recycling questions. If you\'re interested in becoming a Green Champion, please email Sarah in HR by this Wednesday.\n\nFinally, we\'ll be tracking our progress with monthly reports on waste reduction. Our initial goal is to reduce our general waste by 40% in the first three months, and to increase our recycling rate to 75% of all waste generated. Long-term, we aim to become a zero-waste office by 2025.\n\nThank you for your attention, and for your support in making our workplace more environmentally friendly.',
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
