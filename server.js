import http from 'http';

let users = [
  { id: 1, email: "user@test.com", password: "user123", name: "User", role: "user" },
  { id: 2, email: "admin@test.com", password: "admin123", name: "Admin", role: "admin" }
];

// ============ ФУНКЦИЯ ДЛЯ СОЗДАНИЯ ВОПРОСОВ ============
function createQuestions(level, baseId) {
  const questions = [];
  let id = baseId;
  
  // 1-10: Multiple Choice
  const multipleQuestions = {
    beginner: [
      { text: "I ___ a student", options: ["am", "is", "are", "be"], correct: "am", explanation: "'I' всегда с 'am'" },
      { text: "___ you like coffee?", options: ["Do", "Does", "Is", "Are"], correct: "Do", explanation: "С you используем Do" },
      { text: "She ___ to school every day", options: ["go", "goes", "going", "went"], correct: "goes", explanation: "She - 3 лицо, добавляем -es" },
      { text: "They ___ playing football now", options: ["is", "am", "are", "be"], correct: "are", explanation: "They - are" },
      { text: "What ___ your name?", options: ["is", "am", "are", "be"], correct: "is", explanation: "What is your name?" },
      { text: "Where ___ you from?", options: ["is", "am", "are", "be"], correct: "are", explanation: "Where are you from?" },
      { text: "I ___ a teacher", options: ["am", "is", "are", "be"], correct: "am", explanation: "I am" },
      { text: "She ___ my sister", options: ["is", "am", "are"], correct: "is", explanation: "She is" },
      { text: "We ___ happy", options: ["is", "am", "are"], correct: "are", explanation: "We are" },
      { text: "They ___ students", options: ["is", "am", "are"], correct: "are", explanation: "They are" }
    ],
    elementary: [
      { text: "What ___ you doing yesterday?", options: ["was", "were", "is", "are"], correct: "were", explanation: "You - were" },
      { text: "She has ___ to London", options: ["been", "gone", "went", "go"], correct: "been", explanation: "Has been - был" },
      { text: "I ___ like coffee", options: ["don't", "doesn't", "isn't", "aren't"], correct: "don't", explanation: "I don't like" },
      { text: "___ you ever been to Paris?", options: ["Did", "Have", "Has", "Was"], correct: "Have", explanation: "Have you ever" },
      { text: "This is the ___ day of my life", options: ["good", "better", "best", "well"], correct: "best", explanation: "Superlative - best" },
      { text: "She ___ reading a book now", options: ["is", "am", "are"], correct: "is", explanation: "Present Continuous" },
      { text: "They ___ to the cinema yesterday", options: ["go", "went", "gone"], correct: "went", explanation: "Past Simple" },
      { text: "I ___ breakfast at 7am every day", options: ["have", "has", "had"], correct: "have", explanation: "Present Simple" },
      { text: "We ___ to the party last night", options: ["go", "went", "gone"], correct: "went", explanation: "Past Simple" },
      { text: "He ___ his homework already", options: ["did", "has done", "do"], correct: "has done", explanation: "Present Perfect" }
    ],
    preintermediate: [
      { text: "If I ___ you, I would study harder", options: ["was", "were", "am", "is"], correct: "were", explanation: "Second conditional - were" },
      { text: "She ___ already finished her homework", options: ["has", "have", "is", "are"], correct: "has", explanation: "Present Perfect - has" },
      { text: "By 2030, I ___ here for 10 years", options: ["will work", "will have worked", "work", "worked"], correct: "will have worked", explanation: "Future Perfect" },
      { text: "The movie was ___ than I expected", options: ["good", "better", "best", "well"], correct: "better", explanation: "Comparative - better than" },
      { text: "She suggested ___ to the cinema", options: ["go", "to go", "going", "went"], correct: "going", explanation: "Suggest + ing" },
      { text: "I'm used to ___ up early", options: ["get", "getting", "got"], correct: "getting", explanation: "Used to + ing" },
      { text: "He apologized ___ being late", options: ["for", "about", "of"], correct: "for", explanation: "Apologize for" },
      { text: "They look forward to ___ you", options: ["see", "seeing", "saw"], correct: "seeing", explanation: "Look forward to + ing" },
      { text: "She's keen ___ learning French", options: ["on", "at", "in"], correct: "on", explanation: "Keen on" },
      { text: "I'm interested ___ art", options: ["in", "at", "on"], correct: "in", explanation: "Interested in" }
    ],
    intermediate: [
      { text: "Had I known, I ___ come earlier", options: ["would", "would have", "will", "have"], correct: "would have", explanation: "Third conditional" },
      { text: "Not only ___ he late, but also forgot his homework", options: ["was", "did", "had", "were"], correct: "was", explanation: "Инверсия" },
      { text: "She ___ to be a genius", options: ["said", "is said", "says", "was said"], correct: "is said", explanation: "Passive reporting" },
      { text: "I wish I ___ more time", options: ["have", "had", "have had", "having"], correct: "had", explanation: "Wish + past" },
      { text: "The more you practice, ___ you get", options: ["better", "the better", "best", "the best"], correct: "the better", explanation: "Comparative correlative" },
      { text: "It's time we ___ home", options: ["go", "went", "to go"], correct: "went", explanation: "It's time + past" },
      { text: "She can't ___ being ignored", options: ["stand", "to stand", "standing"], correct: "stand", explanation: "Can't stand" },
      { text: "I'd rather you ___ quiet", options: ["keep", "kept", "to keep"], correct: "kept", explanation: "Would rather + past" },
      { text: "He insisted on ___ to the manager", options: ["speak", "speaking", "spoke"], correct: "speaking", explanation: "Insist on + ing" },
      { text: "The car needs ___", options: ["wash", "washing", "to wash"], correct: "washing", explanation: "Need + ing" }
    ],
    upperintermediate: [
      { text: "The committee ___ agreed on the proposal", options: ["has", "have", "is", "are"], correct: "has", explanation: "Collective noun - singular" },
      { text: "Scarcely ___ I arrived when it started raining", options: ["had", "did", "was", "have"], correct: "had", explanation: "Inversion with scarcely" },
      { text: "On no account ___ you leave the room", options: ["should", "must", "can", "will"], correct: "should", explanation: "Inversion" },
      { text: "Were she ___ earlier, she would have seen him", options: ["arrive", "arrived", "to arrive", "arriving"], correct: "to arrive", explanation: "Inversion with were" },
      { text: "Little ___ they know about the situation", options: ["did", "had", "were", "have"], correct: "did", explanation: "Inversion with little" },
      { text: "Had it not been for you, I ___ failed", options: ["would have", "have", "had"], correct: "would have", explanation: "Mixed conditional" },
      { text: "No sooner ___ I left than it started raining", options: ["had", "did", "was"], correct: "had", explanation: "No sooner... than" },
      { text: "Only after ___ the letter did I understand", options: ["reading", "read", "to read"], correct: "reading", explanation: "Only after + ing" },
      { text: "Such ___ the beauty that we stopped", options: ["was", "were", "is"], correct: "was", explanation: "Inversion with such" },
      { text: "So beautiful ___ the sunset that we cried", options: ["was", "were", "is"], correct: "was", explanation: "So + adjective + inversion" }
    ],
    ielts: [
      { text: "The synonym of 'significant' is?", options: ["trivial", "meaningful", "minor", "negligible"], correct: "meaningful", explanation: "Significant = meaningful" },
      { text: "'Mitigate' means to ___", options: ["increase", "reduce", "ignore", "create"], correct: "reduce", explanation: "Mitigate - reduce severity" },
      { text: "The opposite of 'temporary' is ___", options: ["permanent", "brief", "short-term", "momentary"], correct: "permanent", explanation: "Temporary vs permanent" },
      { text: "Correct collocation: '___ attention to detail'", options: ["Make", "Do", "Pay", "Take"], correct: "Pay", explanation: "Pay attention to" },
      { text: "'Ubiquitous' means ___", options: ["rare", "widespread", "unique", "limited"], correct: "widespread", explanation: "Ubiquitous - everywhere" },
      { text: "Choose the correct word: 'She gave a ___ speech'", options: ["compelling", "compelled", "compel"], correct: "compelling", explanation: "Compelling - убедительный" },
      { text: "The data ___ collected over 10 years", options: ["was", "were", "have"], correct: "was", explanation: "Data as singular" },
      { text: "He's ___ in the art world", options: ["notorious", "famous", "known"], correct: "notorious", explanation: "Notorious - печально известный" },
      { text: "The ___ of the study were surprising", options: ["findings", "found", "finds"], correct: "findings", explanation: "Findings - результаты" },
      { text: "She has a ___ for languages", options: ["knack", "knock", "knick"], correct: "knack", explanation: "Knack - способность" }
    ]
  };

  // Добавляем Multiple Choice вопросы
  for (let i = 0; i < 10; i++) {
    const q = multipleQuestions[level][i % multipleQuestions[level].length];
    questions.push({
      id: id++,
      level: level,
      type: "multiple",
      text: q.text,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      image: null
    });
  }

  // 11-20: Spelling (правописание)
  const spellingWords = {
    beginner: ["cat", "dog", "house", "car", "book", "pen", "table", "chair", "door", "window"],
    elementary: ["teacher", "student", "computer", "telephone", "beautiful", "dangerous", "important", "different", "education", "information"],
    preintermediate: ["achievement", "responsible", "opportunity", "experience", "knowledge", "necessary", "therefore", "although", "immediately", "recommend"],
    intermediate: ["sophisticated", "elusive", "unpredictable", "accommodation", "embarrassment", "entrepreneur", "conscientious", "idiosyncrasy", "magnificent", "questionnaire"],
    upperintermediate: ["indisputable", "multifaceted", "overwhelming", "unprecedented", "counterintuitive", "inconsequential", "misunderstood", "straightforward", "unquestionably", "characteristically"],
    ielts: ["indefatigable", "incontrovertible", "unsubstantiated", "circumnavigation", "mispronunciation", "incomprehensibility", "counterrevolution", "disproportionately", "interdenominational", "institutionalization"]
  };

  for (let i = 0; i < 10; i++) {
    const word = spellingWords[level][i % spellingWords[level].length];
    const russianMeaning = {
      cat: "кошка", dog: "собака", house: "дом", car: "машина", book: "книга", pen: "ручка", table: "стол", chair: "стул", door: "дверь", window: "окно",
      teacher: "учитель", student: "студент", computer: "компьютер", telephone: "телефон", beautiful: "красивый", dangerous: "опасный", important: "важный", different: "разный", education: "образование", information: "информация"
    }[word] || word;
    
    questions.push({
      id: id++,
      level: level,
      type: "spelling",
      text: `Напишите слово по-английски: ${russianMeaning}`,
      correct: word,
      explanation: `Правильное написание: ${word}`,
      image: null
    });
  }

  // 21-30: Definition (описание на английском)
  const definitions = {
    beginner: [
      { word: "cat", definition: "An animal that says 'meow'", russian: "кошка" },
      { word: "dog", definition: "An animal that says 'woof'", russian: "собака" },
      { word: "water", definition: "You drink it when thirsty", russian: "вода" },
      { word: "food", definition: "You eat it when hungry", russian: "еда" },
      { word: "house", definition: "A place where you live", russian: "дом" },
      { word: "car", definition: "A vehicle you drive", russian: "машина" },
      { word: "book", definition: "You read it", russian: "книга" },
      { word: "pen", definition: "You use it to write", russian: "ручка" },
      { word: "sun", definition: "It shines during the day", russian: "солнце" },
      { word: "moon", definition: "It shines at night", russian: "луна" }
    ],
    elementary: [
      { word: "library", definition: "A place where you borrow books", russian: "библиотека" },
      { word: "hospital", definition: "A place where sick people go", russian: "больница" },
      { word: "restaurant", definition: "A place where you eat out", russian: "ресторан" },
      { word: "teacher", definition: "A person who teaches", russian: "учитель" },
      { word: "doctor", definition: "A person who treats patients", russian: "врач" },
      { word: "happy", definition: "Feeling joy", russian: "счастливый" },
      { word: "sad", definition: "Feeling unhappy", russian: "грустный" },
      { word: "big", definition: "Large in size", russian: "большой" },
      { word: "small", definition: "Little in size", russian: "маленький" },
      { word: "fast", definition: "Moving quickly", russian: "быстрый" }
    ],
    preintermediate: [
      { word: "ambition", definition: "Strong desire to achieve something", russian: "амбиция" },
      { word: "patience", definition: "Ability to wait without getting angry", russian: "терпение" },
      { word: "courage", definition: "Bravery in difficult situations", russian: "храбрость" },
      { word: "honesty", definition: "Telling the truth", russian: "честность" },
      { word: "loyalty", definition: "Being faithful to someone", russian: "верность" },
      { word: "generous", definition: "Willing to give more than expected", russian: "щедрый" },
      { word: "reliable", definition: "Can be trusted", russian: "надежный" },
      { word: "flexible", definition: "Able to change easily", russian: "гибкий" },
      { word: "efficient", definition: "Working well without waste", russian: "эффективный" },
      { word: "innovative", definition: "Introducing new ideas", russian: "инновационный" }
    ],
    intermediate: [
      { word: "expert", definition: "A person with special knowledge", russian: "эксперт" },
      { word: "dilemma", definition: "A difficult choice", russian: "дилемма" },
      { word: "consequence", definition: "A result of an action", russian: "последствие" },
      { word: "compromise", definition: "A mutual agreement", russian: "компромисс" },
      { word: "controversy", definition: "Public disagreement", russian: "спор" },
      { word: "skeptical", definition: "Doubtful about something", russian: "скептический" },
      { word: "optimistic", definition: "Hopeful about future", russian: "оптимистичный" },
      { word: "pessimistic", definition: "Expecting the worst", russian: "пессимистичный" },
      { word: "ambiguous", definition: "Having double meaning", russian: "неоднозначный" },
      { word: "comprehensive", definition: "Complete and thorough", russian: "всесторонний" }
    ],
    upperintermediate: [
      { word: "perseverance", definition: "Persistent determination", russian: "настойчивость" },
      { word: "nuance", definition: "Subtle difference in meaning", russian: "нюанс" },
      { word: "paradox", definition: "Seemingly contradictory statement", russian: "парадокс" },
      { word: "resilience", definition: "Ability to recover quickly", russian: "устойчивость" },
      { word: "synergy", definition: "Combined effect greater than sum", russian: "синергия" },
      { word: "meticulous", definition: "Very careful about details", russian: "дотошный" },
      { word: "profound", definition: "Very deep or intense", russian: "глубокий" },
      { word: "ubiquitous", definition: "Present everywhere", russian: "вездесущий" },
      { word: "ephemeral", definition: "Lasting for short time", russian: "эфемерный" },
      { word: "quintessential", definition: "Perfect example", russian: "квинтэссенция" }
    ],
    ielts: [
      { word: "indisputable", definition: "Impossible to deny", russian: "неоспоримый" },
      { word: "incontrovertible", definition: "Not able to be denied", russian: "бесспорный" },
      { word: "unprecedented", definition: "Never done or known before", russian: "беспрецедентный" },
      { word: "counterintuitive", definition: "Opposite to common sense", russian: "противоречивый" },
      { word: "marginalize", definition: "Treat as insignificant", russian: "маргинализировать" },
      { word: "disenfranchise", definition: "Deprive of rights", russian: "лишать прав" },
      { word: "synonymous", definition: "Meaning the same", russian: "синонимичный" },
      { word: "antithetical", definition: "Directly opposed", russian: "противоположный" },
      { word: "homogeneous", definition: "Of the same kind", russian: "однородный" },
      { word: "heterogeneous", definition: "Diverse in character", russian: "разнородный" }
    ]
  };

  for (let i = 0; i < 10; i++) {
    const def = definitions[level][i % definitions[level].length];
    questions.push({
      id: id++,
      level: level,
      type: "definition",
      text: `What word is this? "${def.definition}"`,
      correct: def.word,
      explanation: `Это слово означает "${def.russian}" - ${def.word}`,
      image: null
    });
  }

  // 31-40: Grammar (5 вопросов) + 5 повторений
  const grammarQuestions = {
    beginner: [
      { text: "She ___ to school every day. (go/goes)", correct: "goes", explanation: "She - 3 лицо, добавляем -es" },
      { text: "They ___ playing football now. (is/are)", correct: "are", explanation: "They - are" },
      { text: "I ___ to the cinema yesterday. (go/went)", correct: "went", explanation: "Past Simple" },
      { text: "We ___ happy yesterday. (was/were)", correct: "were", explanation: "We - were" },
      { text: "He ___ breakfast at 7am. (have/has)", correct: "has", explanation: "He - has" }
    ],
    elementary: [
      { text: "If it ___ (rain) tomorrow, we ___ (stay) home", correct: "rains,will stay", explanation: "First conditional" },
      { text: "She ___ (already/finish) her homework", correct: "has already finished", explanation: "Present Perfect" },
      { text: "I ___ (never/be) to Paris", correct: "have never been", explanation: "Present Perfect" },
      { text: "While I ___ (walk) home, I ___ (see) an accident", correct: "was walking,saw", explanation: "Past Continuous + Past Simple" },
      { text: "They ___ (live) here since 2010", correct: "have lived", explanation: "Present Perfect" }
    ],
    preintermediate: [
      { text: "If I ___ (have) more money, I ___ (buy) a car", correct: "had,would buy", explanation: "Second conditional" },
      { text: "By the time we arrived, they ___ (leave)", correct: "had left", explanation: "Past Perfect" },
      { text: "This time next week, I ___ (fly) to London", correct: "will be flying", explanation: "Future Continuous" },
      { text: "She ___ (work) here for 5 years", correct: "has been working", explanation: "Present Perfect Continuous" },
      { text: "The film ___ (already/start) when we arrived", correct: "had already started", explanation: "Past Perfect" }
    ],
    intermediate: [
      { text: "Had I known, I ___ (come) earlier", correct: "would have come", explanation: "Third conditional" },
      { text: "I wish I ___ (speak) French fluently", correct: "spoke", explanation: "Wish + past simple" },
      { text: "It's time we ___ (go) home", correct: "went", explanation: "It's time + past" },
      { text: "She ___ (say) to be a genius", correct: "is said", explanation: "Passive reporting" },
      { text: "Not only ___ (be) he late, but also forgot his homework", correct: "was", explanation: "Inversion" }
    ],
    upperintermediate: [
      { text: "Had it not been for you, I ___ (fail)", correct: "would have failed", explanation: "Mixed conditional" },
      { text: "Scarcely ___ (arrive) I when it started raining", correct: "had", explanation: "Inversion" },
      { text: "Were she ___ (arrive) earlier, she would have seen him", correct: "to arrive", explanation: "Inversion" },
      { text: "Little ___ (know) they about the situation", correct: "did", explanation: "Inversion" },
      { text: "On no account ___ (leave) you the room", correct: "should", explanation: "Inversion" }
    ],
    ielts: [
      { text: "Not only ___ (pass) he the exam, but also got the highest score", correct: "did he pass", explanation: "Inversion" },
      { text: "The data, which ___ (collect) over 10 years, ___ (reveal) a trend", correct: "was collected,reveals", explanation: "Passive + present" },
      { text: "Had the government ___ (invest) more, the economy ___ (grow) faster", correct: "invested,would have grown", explanation: "Third conditional" },
      { text: "Only after ___ (read) the book did I understand", correct: "reading", explanation: "Only after + ing" },
      { text: "So beautiful ___ (be) the view that we stopped", correct: "was", explanation: "Inversion" }
    ]
  };

  const grammars = grammarQuestions[level];
  for (let i = 0; i < 10; i++) {
    const g = grammars[i % grammars.length];
    questions.push({
      id: id++,
      level: level,
      type: "grammar",
      text: `Fill in the blanks: ${g.text}`,
      correct: g.correct,
      explanation: g.explanation,
      image: null
    });
  }

  // 41-45: Cloze with options
  const clozeOptions = {
    beginner: [
      { text: "I usually ___ (wake up/woke up) at 6 AM. Then I ___ (have/had) breakfast.", correct: "wake up,have", explanation: "Present Simple" },
      { text: "Yesterday I ___ (go/went) to the park. I ___ (see/saw) many birds.", correct: "went,saw", explanation: "Past Simple" },
      { text: "Tomorrow we ___ (go/will go) to the museum.", correct: "will go", explanation: "Future Simple" },
      { text: "She ___ (is/are) a doctor. She ___ (work/works) in a hospital.", correct: "is,works", explanation: "Present Simple" },
      { text: "Right now, I ___ (study/am studying) English.", correct: "am studying", explanation: "Present Continuous" }
    ],
    elementary: [
      { text: "Last weekend I ___ (went/have gone) to the cinema. The movie ___ (was/is) amazing.", correct: "went,was", explanation: "Past Simple" },
      { text: "I ___ (have/has) been learning English for 5 years. I ___ (can/could) speak well.", correct: "have,can", explanation: "Present Perfect" },
      { text: "She ___ (was/were) sleeping when I ___ (come/came) home.", correct: "was,came", explanation: "Past Continuous + Past Simple" },
      { text: "If you ___ (heat/heat) water, it ___ (boil/boils).", correct: "heat,boils", explanation: "Zero conditional" },
      { text: "He ___ (use to/used to) smoke, but now he doesn't.", correct: "used to", explanation: "Used to" }
    ],
    preintermediate: [
      { text: "If I ___ (had/would have) more money, I ___ (bought/would buy) a car.", correct: "had,would buy", explanation: "Second conditional" },
      { text: "She ___ (has been/was) working here since 2015.", correct: "has been", explanation: "Present Perfect Continuous" },
      { text: "By the time we ___ (arrive/arrived), the party ___ (already start/had already started).", correct: "arrived,had already started", explanation: "Past Perfect" },
      { text: "He ___ (used to/would) play football every Sunday.", correct: "used to", explanation: "Used to" },
      { text: "I ___ (wish/hope) I could speak French.", correct: "wish", explanation: "Wish" }
    ],
    intermediate: [
      { text: "Had I ___ (known/know) about the party, I ___ (would/would have) come.", correct: "known,would have", explanation: "Third conditional inversion" },
      { text: "She ___ (is said/said) to be the best doctor.", correct: "is said", explanation: "Passive reporting" },
      { text: "I'd rather you ___ (stay/stayed) at home tonight.", correct: "stayed", explanation: "Would rather + past" },
      { text: "The car needs ___ (wash/washing).", correct: "washing", explanation: "Need + ing" },
      { text: "She can't ___ (stand/to stand) being ignored.", correct: "stand", explanation: "Can't stand" }
    ],
    upperintermediate: [
      { text: "Scarcely ___ (did/had) I arrived when it started raining.", correct: "had", explanation: "Inversion" },
      { text: "Were she ___ (arrive/to arrive) earlier, she would have seen him.", correct: "to arrive", explanation: "Inversion" },
      { text: "No sooner ___ (did/had) I left than it started raining.", correct: "had", explanation: "No sooner... than" },
      { text: "Little ___ (did/had) they know about the situation.", correct: "did", explanation: "Inversion" },
      { text: "On no account ___ (should/must) you leave the room.", correct: "should", explanation: "Inversion" }
    ],
    ielts: [
      { text: "Not only ___ (did/had) he pass, but he got the highest score.", correct: "did", explanation: "Inversion" },
      { text: "The data, which ___ (was/were) collected over 10 years, ___ (reveal/reveals) a trend.", correct: "was,reveals", explanation: "Data singular" },
      { text: "Had the government ___ (invest/invested) more, the economy ___ (grow/would have grown).", correct: "invested,would have grown", explanation: "Third conditional" },
      { text: "Only after ___ (read/reading) the book did I understand.", correct: "reading", explanation: "Only after + ing" },
      { text: "So beautiful ___ (was/were) the view that we stopped.", correct: "was", explanation: "Inversion" }
    ]
  };

  const clozeOpts = clozeOptions[level];
  for (let i = 0; i < 5; i++) {
    const c = clozeOpts[i % clozeOpts.length];
    questions.push({
      id: id++,
      level: level,
      type: "cloze_options",
      text: c.text,
      correct: c.correct,
      explanation: c.explanation,
      image: null
    });
  }

  // 46-50: Cloze without options
  const clozeNoOptions = {
    beginner: [
      { text: "Every morning I ___ (wake) up at 7 o'clock. Then I ___ (take) a shower.", correct: "wake,take", explanation: "Present Simple" },
      { text: "Last Sunday we ___ (go) to the beach. The weather ___ (be) perfect.", correct: "went,was", explanation: "Past Simple" },
      { text: "My sister ___ (like) to read. She ___ (read) every evening.", correct: "likes,reads", explanation: "Present Simple" },
      { text: "Look! It ___ (rain) outside. We ___ (need) an umbrella.", correct: "is raining,need", explanation: "Present Continuous" },
      { text: "When I ___ (be) a child, I ___ (want) to be a pilot.", correct: "was,wanted", explanation: "Past Simple" }
    ],
    elementary: [
      { text: "Yesterday was a busy day. I ___ (wake) up early, ___ (clean) my room.", correct: "woke,cleaned", explanation: "Past Simple" },
      { text: "In the future, people ___ (live) on Mars. They ___ (travel) by flying cars.", correct: "will live,will travel", explanation: "Future Simple" },
      { text: "She ___ (not/like) coffee. She ___ (prefer) tea.", correct: "doesn't like,prefers", explanation: "Present Simple" },
      { text: "While I ___ (walk) home, I ___ (meet) my friend.", correct: "was walking,met", explanation: "Past Continuous + Past Simple" },
      { text: "I ___ (never/visit) Japan. I ___ (want) to go someday.", correct: "have never visited,want", explanation: "Present Perfect" }
    ],
    preintermediate: [
      { text: "I wish I ___ (can) speak French. It ___ (be) very useful.", correct: "could,would be", explanation: "Wish + could" },
      { text: "If I ___ (be) you, I ___ (not/do) that.", correct: "were,wouldn't do", explanation: "Second conditional" },
      { text: "She ___ (work) here for 10 years before she ___ (get) promoted.", correct: "had worked,got", explanation: "Past Perfect" },
      { text: "This time tomorrow, I ___ (fly) to New York.", correct: "will be flying", explanation: "Future Continuous" },
      { text: "He ___ (use to) smoke, but he ___ (quit) last year.", correct: "used to,quit", explanation: "Used to" }
    ],
    intermediate: [
      { text: "Had she ___ (arrive) earlier, she ___ (meet) the president.", correct: "arrived,would have met", explanation: "Third conditional inversion" },
      { text: "I'd rather you ___ (not/smoke) in here.", correct: "didn't smoke", explanation: "Would rather + past" },
      { text: "It's high time we ___ (do) something about it.", correct: "did", explanation: "It's high time + past" },
      { text: "She ___ (say) to be the richest woman in the world.", correct: "is said", explanation: "Passive reporting" },
      { text: "The more I learn, the less I ___ (understand).", correct: "understand", explanation: "Comparative correlative" }
    ],
    upperintermediate: [
      { text: "Were the government ___ (invest) more, the economy ___ (improve).", correct: "to invest,would improve", explanation: "Inversion" },
      { text: "Had it not ___ (be) for you, I would have failed.", correct: "been", explanation: "Mixed conditional" },
      { text: "Only after ___ (finish) the work did I leave.", correct: "finishing", explanation: "Only after + ing" },
      { text: "Such ___ (be) the demand that prices increased.", correct: "was", explanation: "Inversion with such" },
      { text: "So quickly ___ (does/did) he run that no one could catch him.", correct: "did", explanation: "Inversion" }
    ],
    ielts: [
      { text: "The findings, which ___ (publish) last year, ___ (challenge) previous theories.", correct: "were published,challenge", explanation: "Passive + present" },
      { text: "Were the government ___ (implement) stricter laws, crime ___ (reduce).", correct: "to implement,would reduce", explanation: "Second conditional inversion" },
      { text: "Not until I ___ (read) the book ___ (realize) I the truth.", correct: "read,did", explanation: "Inversion" },
      { text: "The phenomenon, first ___ (observe) in 1990, ___ (remain) unexplained.", correct: "observed,remains", explanation: "Participle + present" },
      { text: "Had the experiment ___ (conduct) properly, the results ___ (be) different.", correct: "been conducted,would have been", explanation: "Passive third conditional" }
    ]
  };

  const clozeNos = clozeNoOptions[level];
  for (let i = 0; i < 5; i++) {
    const c = clozeNos[i % clozeNos.length];
    questions.push({
      id: id++,
      level: level,
      type: "cloze_no_options",
      text: c.text,
      correct: c.correct,
      explanation: c.explanation,
      image: null
    });
  }

  return questions;
}

// Создаем вопросы для всех уровней
const allQuestions = [
  ...createQuestions("beginner", 1),
  ...createQuestions("elementary", 100),
  ...createQuestions("preintermediate", 200),
  ...createQuestions("intermediate", 300),
  ...createQuestions("upperintermediate", 400),
  ...createQuestions("ielts", 500)
];

console.log(`✅ Всего создано вопросов: ${allQuestions.length}`);
console.log(`📊 Beginner: ${allQuestions.filter(q => q.level === "beginner").length}`);
console.log(`📊 Elementary: ${allQuestions.filter(q => q.level === "elementary").length}`);
console.log(`📊 Pre-Intermediate: ${allQuestions.filter(q => q.level === "preintermediate").length}`);
console.log(`📊 Intermediate: ${allQuestions.filter(q => q.level === "intermediate").length}`);
console.log(`📊 Upper-Intermediate: ${allQuestions.filter(q => q.level === "upperintermediate").length}`);
console.log(`📊 IELTS/TOEFL: ${allQuestions.filter(q => q.level === "ielts").length}`);

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (url === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }
  
  if (url === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newUser = JSON.parse(body);
      const exists = users.find(u => u.email === newUser.email);
      if (exists) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User exists' }));
      } else {
        newUser.id = Date.now();
        newUser.role = "user";
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      }
    });
    return;
  }
  
  if (url === '/api/questions' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allQuestions));
    return;
  }
  
  if (url === '/api/questions' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newQuestion = JSON.parse(body);
      newQuestion.id = Date.now();
      allQuestions.push(newQuestion);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newQuestion));
    });
    return;
  }
  
  if (url.startsWith('/api/questions/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[3]);
    const index = allQuestions.findIndex(q => q.id === id);
    if (index !== -1) {
      allQuestions.splice(index, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } else {
      res.writeHead(404);
      res.end();
    }
    return;
  }
  
  res.writeHead(404);
  res.end();
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`\n✨ ENGLISH MASTER PRO Сервер запущен на http://localhost:${PORT}`);
  console.log(`📚 Всего вопросов: ${allQuestions.length}`);
  console.log(`🎯 Уровни:`);
  console.log(`   🌱 Beginner: 50 вопросов`);
  console.log(`   📘 Elementary: 50 вопросов`);
  console.log(`   ⭐ Pre-Intermediate: 50 вопросов`);
  console.log(`   🏆 Intermediate: 50 вопросов`);
  console.log(`   🎓 Upper-Intermediate: 50 вопросов`);
  console.log(`   🌍 IELTS/TOEFL: 50 вопросов`);
  console.log(`\n👤 Обычный пользователь: user@test.com / user123`);
  console.log(`👑 Администратор: admin@test.com / admin123\n`);
});