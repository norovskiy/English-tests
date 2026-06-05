import http from 'http';

let users = [
  { id: 1, email: "user@test.com", password: "user123", name: "User", role: "user" },
  { id: 2, email: "admin@test.com", password: "admin123", name: "Admin", role: "admin" }
];

// Массивы с реальными вопросами для каждого уровня
const beginnerQuestions = [
  { id: 1, level: "beginner", type: "multiple", text: "I ___ a student", options: ["am", "is", "are", "be"], correct: "am", explanation: "'I' всегда используется с 'am'", image: null },
  { id: 2, level: "beginner", type: "translate", text: "Переведите: 'книга'", correct: "book", explanation: "Book - это книга", image: null },
  { id: 3, level: "beginner", type: "fill", text: "She ___ to school (go/goes)", correct: "goes", explanation: "She - 3 лицо, нужно добавить -es", image: null },
  { id: 4, level: "beginner", type: "meaning", text: "Что значит 'Hello'?", correct: "Привет", explanation: "Hello - это приветствие", image: null },
  { id: 5, level: "beginner", type: "writing", text: "Напишите: Меня зовут...", correct: "My name is", explanation: "My name is... - правильное представление", image: null },
  { id: 6, level: "beginner", type: "multiple", text: "The sky is ___", options: ["red", "blue", "green", "yellow"], correct: "blue", explanation: "Небо обычно голубое", image: null },
  { id: 7, level: "beginner", type: "translate", text: "Переведите: 'собака'", correct: "dog", explanation: "Dog - это собака", image: null },
  { id: 8, level: "beginner", type: "fill", text: "They ___ playing football (is/are)", correct: "are", explanation: "They (они) требует 'are'", image: null },
  { id: 9, level: "beginner", type: "multiple", text: "What ___ your name?", options: ["is", "am", "are", "be"], correct: "is", explanation: "Вопрос о имени - What is your name?", image: null },
  { id: 10, level: "beginner", type: "translate", text: "Переведите: 'машина'", correct: "car", explanation: "Car - это машина", image: null }
];

const elementaryQuestions = [
  { id: 11, level: "elementary", type: "multiple", text: "They ___ to the cinema yesterday", options: ["go", "went", "gone", "going"], correct: "went", explanation: "Yesterday - прошедшее время", image: null },
  { id: 12, level: "elementary", type: "translate", text: "Переведите: 'яблоко'", correct: "apple", explanation: "Apple - это яблоко", image: null },
  { id: 13, level: "elementary", type: "fill", text: "I ___ eating an apple now (am/is/are)", correct: "am", explanation: "Present Continuous с I использует 'am'", image: null },
  { id: 14, level: "elementary", type: "writing", text: "Напишите: Что вы делаете?", correct: "What are you doing", explanation: "Present Continuous вопрос", image: null },
  { id: 15, level: "elementary", type: "multiple", text: "She ___ reading a book", options: ["is", "am", "are"], correct: "is", explanation: "She - 3 лицо, нужен 'is'", image: null },
  { id: 16, level: "elementary", type: "translate", text: "Переведите: 'красивый'", correct: "beautiful", explanation: "Beautiful - красивый", image: null },
  { id: 17, level: "elementary", type: "fill", text: "We ___ to Paris last year (go/went)", correct: "went", explanation: "Last year - прошедшее время", image: null },
  { id: 18, level: "elementary", type: "multiple", text: "___ you watch TV yesterday?", options: ["Do", "Did", "Does", "Is"], correct: "Did", explanation: "Вопрос в прошедшем времени - Did", image: null },
  { id: 19, level: "elementary", type: "meaning", text: "Что значит 'delicious'?", correct: "вкусный", explanation: "Delicious - очень вкусный", image: null },
  { id: 20, level: "elementary", type: "writing", text: "Напишите: Я хочу пить", correct: "I want to drink", explanation: "Want to drink - хотеть пить", image: null }
];

const preIntermediateQuestions = [
  { id: 21, level: "preintermediate", type: "multiple", text: "If I ___ you, I would study more", options: ["was", "were", "am", "is"], correct: "were", explanation: "Условные предложения - используем were", image: null },
  { id: 22, level: "preintermediate", type: "translate", text: "Переведите: 'достижение'", correct: "achievement", explanation: "Achievement - достижение", image: null },
  { id: 23, level: "preintermediate", type: "fill", text: "She ___ already finished her homework (has/have)", correct: "has", explanation: "She - 3 лицо, нужен has", image: null },
  { id: 24, level: "preintermediate", type: "writing", text: "Напишите: Я никогда не был в Лондоне", correct: "I have never been to London", explanation: "Present Perfect - опыт", image: null },
  { id: 25, level: "preintermediate", type: "multiple", text: "By 2025, I ___ here for 10 years", options: ["work", "will work", "will have worked", "worked"], correct: "will have worked", explanation: "Future Perfect - действие к определенному времени", image: null },
  { id: 26, level: "preintermediate", type: "meaning", text: "Что значит 'challenge'?", correct: "вызов", explanation: "Challenge - сложная задача, вызов", image: null },
  { id: 27, level: "preintermediate", type: "fill", text: "The movie was ___ (interest/interesting)", correct: "interesting", explanation: "Описание фильма - interesting", image: null },
  { id: 28, level: "preintermediate", type: "multiple", text: "She suggested ___ to the cinema", options: ["go", "to go", "going", "went"], correct: "going", explanation: "После suggest - ing форма", image: null },
  { id: 29, level: "preintermediate", type: "writing", text: "Напишите: Я привык вставать рано", correct: "I am used to getting up early", explanation: "Be used to + ing - привыкнуть", image: null },
  { id: 30, level: "preintermediate", type: "translate", text: "Переведите: 'очевидный'", correct: "obvious", explanation: "Obvious - очевидный", image: null }
];

const intermediateQuestions = [
  { id: 31, level: "intermediate", type: "multiple", text: "Had I known, I ___ come earlier", options: ["would", "would have", "will", "have"], correct: "would have", explanation: "Third conditional - сожаление о прошлом", image: null },
  { id: 32, level: "intermediate", type: "translate", text: "Переведите: 'улучшать'", correct: "improve", explanation: "Improve - становиться лучше", image: null },
  { id: 33, level: "intermediate", type: "fill", text: "Not only ___ he late, but also forgot his homework (was/did)", correct: "was", explanation: "Инверсия с Not only", image: null },
  { id: 34, level: "intermediate", type: "writing", text: "Напишите: Ей приписывают изобретение", correct: "She is credited with the invention", explanation: "Passive with reporting verbs", image: null },
  { id: 35, level: "intermediate", type: "multiple", text: "I wish I ___ more time", options: ["have", "had", "have had", "having"], correct: "had", explanation: "Wish about present - Past Simple", image: null },
  { id: 36, level: "intermediate", type: "meaning", text: "Что значит 'sophisticated'?", correct: "сложный", explanation: "Sophisticated - сложный, утонченный", image: null },
  { id: 37, level: "intermediate", type: "fill", text: "The more you practice, ___ you get (better/the better)", correct: "the better", explanation: "Сравнительные конструкции", image: null },
  { id: 38, level: "intermediate", type: "multiple", text: "She ___ to be a genius", options: ["said", "is said", "says", "was said"], correct: "is said", explanation: "Пассивная конструкция - считается", image: null },
  { id: 39, level: "intermediate", type: "writing", text: "Напишите: Вам следовало бы обратиться к врачу", correct: "You should have seen a doctor", explanation: "Should have - совет о прошлом", image: null },
  { id: 40, level: "intermediate", type: "translate", text: "Переведите: 'оценивать'", correct: "evaluate", explanation: "Evaluate - определять ценность", image: null }
];

const upperIntermediateQuestions = [
  { id: 41, level: "upperintermediate", type: "multiple", text: "The committee ___ agreed on the proposal", options: ["has", "have", "is", "are"], correct: "has", explanation: "Committee - коллективное существительное, использует has", image: null },
  { id: 42, level: "upperintermediate", type: "translate", text: "Переведите: 'безусловно'", correct: "undoubtedly", explanation: "Undoubtedly - без сомнения", image: null },
  { id: 43, level: "upperintermediate", type: "fill", text: "Scarcely ___ I arrived when it started raining (had/did)", correct: "had", explanation: "Инверсия с scarcely - had I arrived", image: null },
  { id: 44, level: "upperintermediate", type: "writing", text: "Напишите: Принимая во внимание обстоятельства", correct: "Given the circumstances", explanation: "Given - принимая во внимание", image: null },
  { id: 45, level: "upperintermediate", type: "multiple", text: "Were she ___ earlier, she would have seen him", options: ["arrive", "arrived", "to arrive", "arriving"], correct: "to arrive", explanation: "Инверсия с were - were she to arrive", image: null },
  { id: 46, level: "upperintermediate", type: "meaning", text: "Что значит 'meticulous'?", correct: "дотошный", explanation: "Meticulous - очень внимательный к деталям", image: null },
  { id: 47, level: "upperintermediate", type: "fill", text: "Little ___ they know about the situation (did/had)", correct: "did", explanation: "Little did they know - инверсия", image: null },
  { id: 48, level: "upperintermediate", type: "multiple", text: "On no account ___ you leave the room", options: ["should", "must", "can", "will"], correct: "should", explanation: "On no account should you - инверсия", image: null },
  { id: 49, level: "upperintermediate", type: "writing", text: "Напишите: Вопреки ожиданиям", correct: "Contrary to expectations", explanation: "Contrary to - вопреки", image: null },
  { id: 50, level: "upperintermediate", type: "translate", text: "Переведите: 'неуловимый'", correct: "elusive", explanation: "Elusive - трудно достижимый", image: null }
];

const ieltsQuestions = [
  { id: 51, level: "ielts", type: "writing", text: "Write a complex sentence about climate change", correct: "Climate change, which is caused by human activities, poses a significant threat to our planet", explanation: "IELTS writing task 2 practice", image: null },
  { id: 52, level: "ielts", type: "multiple", text: "What is the synonym of 'significant'?", options: ["unimportant", "trivial", "meaningful", "minor"], correct: "meaningful", explanation: "Significant = meaningful = important", image: null },
  { id: 53, level: "ielts", type: "fill", text: "The data ___ been processed yet (hasn't/haven't)", correct: "hasn't", explanation: "Data - может быть единственным числом", image: null },
  { id: 54, level: "ielts", type: "writing", text: "Paraphrase: Many people believe that education is important", correct: "It is widely believed that education plays a crucial role", explanation: "Paraphrasing for IELTS", image: null },
  { id: 55, level: "ielts", type: "multiple", text: "What does 'mitigate' mean?", options: ["increase", "reduce", "ignore", "create"], correct: "reduce", explanation: "Mitigate - уменьшать, смягчать", image: null },
  { id: 56, level: "ielts", type: "translate", text: "Переведите: 'неоспоримый'", correct: "indisputable", explanation: "Indisputable - не вызывающий сомнений", image: null },
  { id: 57, level: "ielts", type: "fill", text: "___ the rain, the event continued (Despite/Although)", correct: "Despite", explanation: "Despite + noun, Although + clause", image: null },
  { id: 58, level: "ielts", type: "writing", text: "Write a topic sentence for an essay about technology", correct: "Technology has revolutionized the way we communicate and access information", explanation: "IELTS writing task 2 topic sentence", image: null },
  { id: 59, level: "ielts", type: "meaning", text: "What does 'ubiquitous' mean?", correct: "вездесущий", explanation: "Ubiquitous - присутствующий везде", image: null },
  { id: 60, level: "ielts", type: "multiple", text: "Choose the correct collocation: '___ attention to detail'", options: ["Make", "Do", "Pay", "Take"], correct: "Pay", explanation: "Pay attention to - правильная коллокация", image: null }
];

// Собираем все вопросы
let questions = [
  ...beginnerQuestions,
  ...elementaryQuestions,
  ...preIntermediateQuestions,
  ...intermediateQuestions,
  ...upperIntermediateQuestions,
  ...ieltsQuestions
];

// Дублируем вопросы до 40 для каждого уровня (если нужно)
function expandQuestions(level, targetCount = 40) {
  const levelQuestions = questions.filter(q => q.level === level);
  const expanded = [];
  for (let i = 0; i < targetCount; i++) {
    const original = levelQuestions[i % levelQuestions.length];
    expanded.push({
      ...original,
      id: `${level}_${i + 1}`,
      text: `${original.text} ${Math.floor(i / levelQuestions.length) > 0 ? `(вариант ${Math.floor(i / levelQuestions.length) + 1})` : ''}`
    });
  }
  return expanded;
}

// Создаем полные наборы по 40 вопросов для каждого уровня
const allQuestions = [
  ...expandQuestions('beginner', 40),
  ...expandQuestions('elementary', 40),
  ...expandQuestions('preintermediate', 40),
  ...expandQuestions('intermediate', 40),
  ...expandQuestions('upperintermediate', 40),
  ...expandQuestions('ielts', 40)
];

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
      questions.push(newQuestion);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newQuestion));
    });
    return;
  }
  
  if (url.startsWith('/api/questions/') && method === 'PUT') {
    const id = url.split('/')[3];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updated = JSON.parse(body);
      const index = allQuestions.findIndex(q => q.id == id);
      if (index !== -1) {
        allQuestions[index] = { ...allQuestions[index], ...updated };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allQuestions[index]));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    return;
  }
  
  if (url.startsWith('/api/questions/') && method === 'DELETE') {
    const id = url.split('/')[3];
    const index = allQuestions.findIndex(q => q.id == id);
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
  console.log(`✨ PREMIUM PRO Сервер запущен на http://localhost:${PORT}`);
  console.log(`📚 Всего вопросов: ${allQuestions.length}`);
  console.log(`🎯 Уровни: Beginner, Elementary, Pre-Intermediate, Intermediate, Upper Intermediate, IELTS/TOEFL`);
  console.log(`👤 Логин: user@test.com / user123`);
  console.log(`✅ Каждый уровень содержит 40 вопросов`);
});