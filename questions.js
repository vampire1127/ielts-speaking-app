/**
 * IELTS Speaking Question Bank
 * Part 1: Introduction & Interview
 * Part 2: Individual Long Turn (Cue Cards)
 * Part 3: Two-way Discussion
 */
const IELTS_QUESTIONS = {
  part1: [
    {
      id: "p1-001",
      topic: "Work / Study",
      question: "Do you work or are you a student?",
      followUp: "What do you study / What is your job?",
      sampleAnswer:
        "I'm currently a university student majoring in business administration. I'm in my third year, and I really enjoy learning about marketing and entrepreneurship. Outside of lectures, I also work part-time at a café, which helps me practice communication skills.",
    },
    {
      id: "p1-002",
      topic: "Hometown",
      question: "Where are you from?",
      followUp: "What do you like most about your hometown?",
      sampleAnswer:
        "I'm from Hangzhou, a picturesque city in eastern China. What I love most is West Lake — it's incredibly peaceful, especially early in the morning. The city also has a rich cultural heritage and a thriving tech industry, so it offers both tradition and modernity.",
    },
    {
      id: "p1-003",
      topic: "Hometown",
      question: "Has your hometown changed much in recent years?",
      followUp: "Would you like to live there in the future?",
      sampleAnswer:
        "Absolutely. Over the past decade, my hometown has undergone tremendous development. New subway lines have been built, and the downtown area is much more vibrant. However, some old neighborhoods have been replaced, which is a mixed blessing.",
    },
    {
      id: "p1-004",
      topic: "Accommodation",
      question: "Do you live in a house or an apartment?",
      followUp: "What do you like about where you live?",
      sampleAnswer:
        "I live in a modern apartment in the city centre. I particularly appreciate the convenience — shops, restaurants, and public transport are all within walking distance. The view from my balcony is also quite pleasant.",
    },
    {
      id: "p1-005",
      topic: "Daily Routine",
      question: "What time do you usually get up?",
      followUp: "Do you think you're a morning person?",
      sampleAnswer:
        "I typically wake up around 7 a.m. on weekdays. I'd say I'm more of a night owl than a morning person, but I've trained myself to be productive in the early hours by going for a short jog before breakfast.",
    },
    {
      id: "p1-006",
      topic: "Music",
      question: "What kind of music do you like?",
      followUp: "Has your taste in music changed over the years?",
      sampleAnswer:
        "I'm quite fond of indie pop and acoustic music — artists like Ed Sheeran and Norah Jones. When I was younger, I listened mostly to pop, but nowadays I prefer something more mellow that I can study or relax to.",
    },
    {
      id: "p1-007",
      topic: "Reading",
      question: "Do you enjoy reading?",
      followUp: "What kind of books do you read?",
      sampleAnswer:
        "Yes, reading is one of my favourite pastimes. I mostly read non-fiction, especially biographies and books about psychology. I find them both entertaining and thought-provoking. I try to read for at least thirty minutes before bed.",
    },
    {
      id: "p1-008",
      topic: "Weather",
      question: "What's the weather like in your country?",
      followUp: "Does weather affect your mood?",
      sampleAnswer:
        "China has diverse climates, but where I live, we experience four distinct seasons. Summers can be hot and humid, while winters are relatively mild. Sunny weather definitely lifts my spirits — I feel much more energetic on bright days.",
    },
    {
      id: "p1-009",
      topic: "Transport",
      question: "How do you usually travel to work or school?",
      followUp: "What's the most popular means of transport in your city?",
      sampleAnswer:
        "I usually take the subway because it's fast and reliable, even during rush hour. The metro system in my city is quite extensive, and it's also environmentally friendly compared to driving.",
    },
    {
      id: "p1-010",
      topic: "Technology",
      question: "How often do you use your mobile phone?",
      followUp: "What do you use it for most?",
      sampleAnswer:
        "Honestly, I use my phone quite frequently — probably more than I'd like to admit. Besides messaging and social media, I rely on it for navigation, online payments, and language learning apps. I'm trying to reduce screen time though.",
    },
    {
      id: "p1-011",
      topic: "Food",
      question: "What's your favourite food?",
      followUp: "Do you like cooking?",
      sampleAnswer:
        "I'm a big fan of Sichuan cuisine, especially mapo tofu and kung pao chicken. The bold flavours really appeal to me. I do enjoy cooking at home on weekends — it's relaxing and healthier than eating out.",
    },
    {
      id: "p1-012",
      topic: "Friends",
      question: "Do you prefer to have many friends or a few close ones?",
      followUp: "How do you usually spend time with friends?",
      sampleAnswer:
        "I definitely prefer having a small circle of close friends rather than a large group of acquaintances. Quality matters more to me than quantity. We usually grab coffee, watch films, or go hiking together on weekends.",
    },
    {
      id: "p1-013",
      topic: "Sports",
      question: "Do you play any sports?",
      followUp: "What are the most popular sports in your country?",
      sampleAnswer:
        "I play badminton twice a week at a local sports centre. It's great exercise and a fun way to socialise. In China, basketball and table tennis are hugely popular, and football is gaining more followers among young people.",
    },
    {
      id: "p1-014",
      topic: "Shopping",
      question: "Do you enjoy shopping?",
      followUp: "Do you prefer shopping online or in stores?",
      sampleAnswer:
        "I wouldn't say I love shopping, but I don't mind it when I need something specific. These days I prefer online shopping because of the convenience and wider selection, though I still visit physical stores for clothes so I can try them on.",
    },
    {
      id: "p1-015",
      topic: "Holidays",
      question: "What do you usually do on holidays?",
      followUp: "Do you prefer relaxing or active holidays?",
      sampleAnswer:
        "On short holidays, I tend to stay home and catch up on sleep or read. For longer breaks, I love travelling to new places. I prefer a mix — some days exploring and some days just relaxing by the beach.",
    },
  ],

  part2: [
    {
      id: "p2-001",
      topic: "Describe a person who has influenced you",
      cues: [
        "Who this person is",
        "How you know this person",
        "What this person has done",
        "And explain why this person has influenced you",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "I'd like to talk about my high school English teacher, Ms. Chen. I first met her when I was sixteen, and she taught me for two years. She was known for her patience and creative teaching methods — instead of just drilling grammar, she encouraged us to debate, perform skits, and even write short stories in English. What really influenced me was how she believed in every student. When I was struggling with confidence, she spent extra time after class helping me prepare for speech competitions. Thanks to her encouragement, I not only improved my English dramatically but also discovered a passion for public speaking. She taught me that language is a bridge, not a barrier, and that mindset has shaped both my academic choices and my career aspirations.",
      relatedTheme: "people",
    },
    {
      id: "p2-002",
      topic: "Describe a place you would like to visit",
      cues: [
        "Where it is",
        "How you know about this place",
        "What you would do there",
        "And explain why you would like to visit this place",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "I've always dreamed of visiting Iceland, a Nordic island nation known for its dramatic landscapes. I first learned about it through a documentary about the Northern Lights, and the images of glaciers, volcanoes, and geothermal hot springs completely captivated me. If I had the chance to go, I'd explore the Golden Circle route, soak in the Blue Lagoon, and hopefully witness the aurora borealis. I'd also love to hike on a glacier and visit the black sand beaches in Vik. The main reason I want to visit is to experience nature in its rawest form — Iceland seems like a place where you can truly disconnect from the modern world and feel humbled by the power of the natural environment.",
      relatedTheme: "travel",
    },
    {
      id: "p2-003",
      topic: "Describe a skill you would like to learn",
      cues: [
        "What the skill is",
        "How you would learn it",
        "How difficult you think it would be",
        "And explain why you would like to learn this skill",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "A skill I've been eager to learn is photography, particularly landscape photography. I've always admired how a single image can capture a moment and tell a story without words. I would start by taking an online course to understand the basics — aperture, shutter speed, and composition — and then practice regularly during my travels and weekend outings. I think it would be moderately challenging because while modern cameras are user-friendly, developing an artistic eye takes time and dedication. I want to learn this skill because I love travelling, and being able to document my experiences beautifully would add another dimension to my adventures. Plus, photography encourages you to observe the world more carefully, which I find deeply rewarding.",
      relatedTheme: "skills",
    },
    {
      id: "p2-004",
      topic: "Describe a memorable trip you took",
      cues: [
        "Where you went",
        "Who you went with",
        "What you did there",
        "And explain why this trip was memorable",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "One of the most memorable trips I've ever taken was a road trip along the coast of Yunnan province with three close friends. We rented a car in Kunming and drove to Dali, Lijiang, and Shangri-La over ten days. Each stop offered something unique — the serene Erhai Lake, the ancient architecture of Lijiang Old Town, and the breathtaking Tibetan culture in Shangri-La. We camped one night near a mountain pass and watched the sunrise together, which was absolutely magical. This trip stands out because it was the first time we planned everything ourselves, from routes to accommodation. It strengthened our friendship and gave me a sense of independence and adventure that I still cherish.",
      relatedTheme: "travel",
    },
    {
      id: "p2-005",
      topic: "Describe a book you recently read",
      cues: [
        "What the book is",
        "What it is about",
        "When you read it",
        "And explain why you enjoyed it or not",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "I recently finished reading 'Atomic Habits' by James Clear, a bestselling self-help book about building good habits and breaking bad ones. The author explains how tiny, consistent changes can lead to remarkable results over time, using scientific research and real-life examples. I read it over the course of two weeks during my commute. What I enjoyed most was how practical and actionable the advice was — concepts like 'habit stacking' and 'the two-minute rule' are easy to apply immediately. It changed the way I think about personal development, shifting my focus from goals to systems. I'd highly recommend it to anyone looking to improve their daily routines.",
      relatedTheme: "education",
    },
    {
      id: "p2-006",
      topic: "Describe an important event in your life",
      cues: [
        "What the event was",
        "When and where it happened",
        "Who was involved",
        "And explain why it was important to you",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "An important event in my life was receiving my university admission letter. It happened in the summer after my gaokao, at my home in Chengdu. My parents and I had been anxiously waiting for weeks, and when the results finally came through, we were overjoyed — I had been accepted into my dream university. This moment was significant because it represented years of hard work paying off. It also marked a turning point where I would leave home and become more independent. The experience taught me that persistence and a clear goal can overcome even the most stressful challenges.",
      relatedTheme: "life",
    },
    {
      id: "p2-007",
      topic: "Describe a piece of technology you find useful",
      cues: [
        "What it is",
        "How often you use it",
        "What you use it for",
        "And explain why you find it useful",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "The piece of technology I find most useful is my noise-cancelling headphones. I use them almost every day — during my commute, while studying, and sometimes even at work. They help me focus by blocking out background noise, which is essential in open-plan environments. I also use them for language learning podcasts and online courses. What makes them so valuable is how they create a personal bubble of concentration in any setting. They've genuinely improved my productivity and made long journeys much more enjoyable.",
      relatedTheme: "technology",
    },
    {
      id: "p2-008",
      topic: "Describe a traditional festival in your country",
      cues: [
        "What the festival is",
        "When it is celebrated",
        "What people do during this festival",
        "And explain how you feel about this festival",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "I'd like to describe the Spring Festival, also known as Chinese New Year, which is the most important traditional festival in China. It usually falls in late January or February, depending on the lunar calendar. During this festival, families reunite for a lavish dinner on New Year's Eve, exchange red envelopes, and set off fireworks. People also clean their homes thoroughly to sweep away bad luck and decorate with red lanterns and couplets. I feel a deep sense of warmth and belonging during Spring Festival. Despite the commercialisation in recent years, the core values of family reunion and fresh beginnings remain incredibly meaningful to me.",
      relatedTheme: "culture",
    },
    {
      id: "p2-009",
      topic: "Describe a time when you helped someone",
      cues: [
        "Who you helped",
        "How you helped them",
        "Why they needed help",
        "And explain how you felt about helping them",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "I remember helping a classmate prepare for an important presentation last semester. She was struggling with anxiety and lacked confidence speaking in English. I offered to practice with her every evening for a week, giving feedback on her pronunciation and body language. She needed help because English wasn't her strongest subject and the presentation counted for thirty percent of her grade. After the presentation, she received one of the highest marks in the class. I felt incredibly proud and fulfilled — there's something deeply satisfying about seeing someone overcome their fears with a little support.",
      relatedTheme: "people",
    },
    {
      id: "p2-010",
      topic: "Describe a goal you want to achieve in the future",
      cues: [
        "What the goal is",
        "When you want to achieve it",
        "What you need to do to achieve it",
        "And explain why this goal is important to you",
      ],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer:
        "My goal is to achieve an IELTS score of 7.5 or above within the next six months. I need this score to apply for a master's programme abroad. To reach this target, I plan to practice speaking daily, expand my vocabulary systematically, and take at least two mock tests per month. This goal is important because studying overseas has been a dream of mine since university. It's not just about the qualification — I want to experience a different culture, broaden my perspective, and challenge myself in a new environment.",
      relatedTheme: "education",
    },
  ],

  part3: [
    {
      id: "p3-001",
      theme: "people",
      question: "What qualities make a good role model for young people?",
      sampleAnswer:
        "I think integrity and resilience are essential qualities in a role model. Young people need someone who demonstrates honesty and the ability to bounce back from failure. Additionally, empathy is crucial — a good role model should understand the challenges that the younger generation faces and offer guidance without being judgmental.",
    },
    {
      id: "p3-002",
      theme: "people",
      question: "Do you think celebrities are good role models?",
      sampleAnswer:
        "It depends on the individual. Some celebrities use their platform responsibly to advocate for social causes, which can be inspiring. However, many others promote unrealistic lifestyles or questionable behaviour. I believe teachers, family members, and community leaders often make more reliable role models because their influence is more personal and grounded.",
    },
    {
      id: "p3-003",
      theme: "travel",
      question: "Why do you think tourism is so popular nowadays?",
      sampleAnswer:
        "Tourism has surged largely because travel has become more affordable and accessible. Budget airlines and online booking platforms have lowered barriers significantly. Social media also plays a huge role — people see stunning photos from friends and influencers and feel motivated to experience those destinations themselves. Additionally, a growing middle class in many countries has more disposable income for leisure.",
    },
    {
      id: "p3-004",
      theme: "travel",
      question: "What are the negative effects of tourism on local communities?",
      sampleAnswer:
        "Overtourism can strain local infrastructure, inflate housing prices, and erode cultural authenticity. Popular destinations sometimes become commercialised, with traditional crafts replaced by souvenir shops. Environmental damage is another concern — fragile ecosystems can suffer from pollution and overcrowding. Sustainable tourism practices are essential to mitigate these effects.",
    },
    {
      id: "p3-005",
      theme: "skills",
      question: "What skills are most important for success in the modern workplace?",
      sampleAnswer:
        "Adaptability is arguably the most critical skill today, given how rapidly industries evolve. Digital literacy is also essential across virtually every sector. Soft skills like communication, teamwork, and emotional intelligence remain highly valued because they can't easily be replaced by automation. Lifelong learning mindset is equally important.",
    },
    {
      id: "p3-006",
      theme: "skills",
      question: "Is it better to learn a skill online or in a traditional classroom?",
      sampleAnswer:
        "Both have merits. Online learning offers flexibility and access to global experts, which suits self-motivated learners. Classroom settings provide structured interaction, immediate feedback, and accountability. For practical skills like surgery or mechanics, hands-on training is irreplaceable. Ideally, a blended approach combines the best of both worlds.",
    },
    {
      id: "p3-007",
      theme: "education",
      question: "How has technology changed the way people learn?",
      sampleAnswer:
        "Technology has democratised education — anyone with an internet connection can access courses from top universities. Interactive apps, video tutorials, and AI-powered tutors make learning more engaging and personalised. However, the abundance of information also makes it harder to distinguish reliable sources, so critical thinking has become more important than ever.",
    },
    {
      id: "p3-008",
      theme: "education",
      question: "Do you think formal education is still necessary in the age of the internet?",
      sampleAnswer:
        "Formal education still provides structured curricula, accredited qualifications, and networking opportunities that self-study can't fully replicate. Employers often use degrees as a screening mechanism. That said, the value of traditional degrees may diminish for certain fields where portfolios and practical skills matter more. Education systems need to evolve rather than disappear.",
    },
    {
      id: "p3-009",
      theme: "technology",
      question: "What are the advantages and disadvantages of children using technology?",
      sampleAnswer:
        "On the positive side, technology exposes children to educational content and helps them develop digital skills early. However, excessive screen time can affect attention spans, physical health, and social development. The key is moderation and parental guidance — technology should complement, not replace, real-world experiences and face-to-face interaction.",
    },
    {
      id: "p3-010",
      theme: "technology",
      question: "Do you think artificial intelligence will replace many jobs?",
      sampleAnswer:
        "AI will undoubtedly automate routine and repetitive tasks, particularly in manufacturing, data entry, and basic customer service. However, it will also create new roles in AI development, ethics, and human-AI collaboration. Jobs requiring creativity, emotional intelligence, and complex problem-solving are less vulnerable. The challenge is ensuring workers can reskill quickly enough.",
    },
    {
      id: "p3-011",
      theme: "culture",
      question: "Why is it important to preserve traditional cultures?",
      sampleAnswer:
        "Traditional cultures embody the wisdom, values, and identity of communities across generations. Losing them would mean losing diversity in how humans understand the world. Preservation also supports tourism and local economies. However, culture isn't static — it should be preserved thoughtfully, allowing for natural evolution rather than museum-like fossilisation.",
    },
    {
      id: "p3-012",
      theme: "culture",
      question: "How does globalisation affect local traditions?",
      sampleAnswer:
        "Globalisation introduces new ideas, products, and lifestyles that can enrich local culture but also threaten to homogenise it. Young people may prefer global brands over traditional crafts. On the other hand, global platforms can help local artists reach international audiences. The balance lies in embracing global connectivity while actively supporting local heritage.",
    },
    {
      id: "p3-013",
      theme: "life",
      question: "What events do people in your country celebrate?",
      sampleAnswer:
        "Apart from the Spring Festival, people celebrate the Mid-Autumn Festival, National Day, and various ethnic minority festivals. Weddings and birthdays are also widely celebrated, often with elaborate gatherings. In recent years, Western holidays like Valentine's Day and Christmas have gained popularity among younger generations, though they're celebrated in a more commercial way.",
    },
    {
      id: "p3-014",
      theme: "life",
      question: "Do you think people's values have changed compared to the past?",
      sampleAnswer:
        "Yes, significantly. Previous generations often prioritised stability, family duty, and collective wellbeing. Today's younger people tend to value personal fulfilment, work-life balance, and individual expression more highly. This shift reflects economic development and exposure to global ideas, though core values like respect for elders and education remain deeply rooted.",
    },
    {
      id: "p3-015",
      theme: "education",
      question: "What are the benefits of studying abroad?",
      sampleAnswer:
        "Studying abroad broadens one's cultural perspective and fosters independence. Students gain exposure to different teaching methods and can build an international network. Language immersion accelerates fluency naturally. Perhaps most importantly, navigating life in a foreign country builds resilience and adaptability — qualities highly valued by employers worldwide.",
    },
  ],
};
