// Global Variables
let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 300; // 5 minutes in seconds
let userScores = JSON.parse(localStorage.getItem('quizScores')) || [];

// Quiz Data for 15 subjects
const quizData = {
    mathematics: {
        title: "Mathematics",
        questions: [
            { question: "What is 25 × 4?", options: ["90", "95", "100", "105"], correct: 2 },
            { question: "What is the square root of 144?", options: ["11", "12", "13", "14"], correct: 1 },
            { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
            { question: "What is the value of π (pi) approximately?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
            { question: "What is 7³?", options: ["343", "294", "421", "392"], correct: 0 },
            { question: "What is the sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1 },
            { question: "What is 8! (8 factorial)?", options: ["40320", "5040", "720", "120"], correct: 0 },
            { question: "What is log₁₀(100)?", options: ["1", "2", "10", "100"], correct: 1 },
            { question: "What is the derivative of x²?", options: ["x", "2x", "x³", "2"], correct: 1 },
            { question: "What is 0.75 as a fraction?", options: ["3/4", "2/3", "4/5", "5/6"], correct: 0 },
            { question: "What is the area of a circle with radius 5?", options: ["25π", "10π", "50π", "15π"], correct: 0 },
            { question: "Solve: 2x + 5 = 13", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 1 },
            { question: "What is the LCM of 12 and 18?", options: ["24", "36", "48", "72"], correct: 1 },
            { question: "What is the mode of 2, 3, 3, 5, 7, 3?", options: ["2", "3", "5", "7"], correct: 1 },
            { question: "What is 2⁵?", options: ["10", "25", "32", "64"], correct: 2 },
            { question: "What is the median of 1, 2, 3, 4, 5?", options: ["1", "2", "3", "5"], correct: 2 },
            { question: "What is the HCF of 24 and 36?", options: ["6", "8", "12", "18"], correct: 2 },
            { question: "Solve: 3x - 7 = 8", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 2 },
            { question: "What is the simple interest on $1000 at 5% for 2 years?", options: ["$50", "$100", "$150", "$200"], correct: 1 },
            { question: "What is tan(45°)?", options: ["0", "1", "√2", "√3"], correct: 1 }
        ]
    },
    science: {
        title: "Science",
        questions: [
            { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "CH4"], correct: 0 },
            { question: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
            { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
            { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0 },
            { question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Cell", "Electron"], correct: 1 },
            { question: "What force keeps us on Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], correct: 1 },
            { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
            { question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What is the study of earthquakes called?", options: ["Geology", "Seismology", "Meteorology", "Astronomy"], correct: 1 },
            { question: "What type of animal is a dolphin?", options: ["Fish", "Reptile", "Mammal", "Amphibian"], correct: 2 },
            { question: "What is the chemical formula for salt?", options: ["NaHCl", "NaCl", "KCl", "CaCl"], correct: 1 },
            { question: "How many bones are in the human body?", options: ["186", "206", "226", "246"], correct: 1 },
            { question: "What is the main gas in the Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], correct: 1 },
            { question: "What is the study of living organisms called?", options: ["Chemistry", "Physics", "Biology", "Geology"], correct: 2 },
            { question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correct: 1 },
            { question: "What is the pH level of distilled water?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
            { question: "What element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], correct: 1 },
            { question: "What is the study of weather called?", options: ["Geology", "Climatology", "Meteorology", "Astronomy"], correct: 2 },
            { question: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: 1 }
        ]
    },
    history: {
        title: "History",
        questions: [
            { question: "When did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: 1 },
            { question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], correct: 2 },
            { question: "In which year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
            { question: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Egyptian", "Persian"], correct: 1 },
            { question: "When did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], correct: 2 },
            { question: "Who wrote the Declaration of Independence?", options: ["George Washington", "Benjamin Franklin", "John Adams", "Thomas Jefferson"], correct: 3 },
            { question: "Which war was fought between 1861-1865?", options: ["Revolutionary War", "Civil War", "War of 1812", "Spanish-American War"], correct: 1 },
            { question: "What year did man first land on the moon?", options: ["1967", "1968", "1969", "1970"], correct: 2 },
            { question: "Which ancient wonder was located in Alexandria?", options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"], correct: 1 },
            { question: "When did the Renaissance period begin?", options: ["13th century", "14th century", "15th century", "16th century"], correct: 1 },
            { question: "Who was the first Emperor of Rome?", options: ["Nero", "Caesar Augustus", "Tiberius", "Caligula"], correct: 1 },
            { question: "When did the French Revolution begin?", options: ["1778", "1789", "1798", "1808"], correct: 1 },
            { question: "Who discovered America?", options: ["Amerigo Vespucci", "Christopher Columbus", "Leif Erikson", "Ferdinand Magellan"], correct: 1 },
            { question: "In which year did India gain independence?", options: ["1945", "1946", "1947", "1948"], correct: 2 },
            { question: "Who was the first Prime Minister of India?", options: ["Jawaharlal Nehru", "Sardar Patel", "Mohandas Gandhi", "Lal Bahadur Shastri"], correct: 0 },
            { question: "When did the Roman Empire fall?", options: ["365 AD", "395 AD", "476 AD", "500 AD"], correct: 2 },
            { question: "Who invented the printing press?", options: ["Galileo", "Johannes Gutenberg", "Leonardo da Vinci", "Michelangelo"], correct: 1 },
            { question: "When did World War I end?", options: ["1916", "1917", "1918", "1919"], correct: 2 },
            { question: "Who was Napoleon Bonaparte?", options: ["Russian general", "French military leader", "German king", "British admiral"], correct: 1 },
            { question: "When did the American Revolution begin?", options: ["1773", "1774", "1775", "1776"], correct: 2 }
        ]
    },
    geography: {
        title: "Geography",
        questions: [
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
            { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correct: 1 },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1 },
            { question: "Which mountain range contains Mount Everest?", options: ["Andes", "Rockies", "Alps", "Himalayas"], correct: 3 },
            { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
            { question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctica", "Arabian"], correct: 2 },
            { question: "What is the capital of Brazil?", options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], correct: 2 },
            { question: "Which strait separates Europe and Africa?", options: ["Bering", "Gibraltar", "Hormuz", "Magellan"], correct: 1 },
            { question: "What is the deepest point on Earth?", options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Peru-Chile Trench"], correct: 0 },
            { question: "Which country has the most time zones?", options: ["Russia", "USA", "China", "France"], correct: 0 },
            { question: "What is the capital of France?", options: ["Lyon", "Marseille", "Paris", "Nice"], correct: 2 },
            { question: "Which is the second longest river?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correct: 0 },
            { question: "What is the capital of Japan?", options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"], correct: 1 },
            { question: "Which continent is the coldest?", options: ["Arctic", "Greenland", "Antarctica", "Canada"], correct: 2 },
            { question: "What is the capital of Egypt?", options: ["Alexandria", "Cairo", "Giza", "Luxor"], correct: 1 },
            { question: "Which is the largest lake in Africa?", options: ["Lake Victoria", "Lake Tanganyika", "Lake Malawi", "Lake Assal"], correct: 0 },
            { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
            { question: "Which country is the least populated in Europe?", options: ["Iceland", "Malta", "Cyprus", "Luxembourg"], correct: 0 },
            { question: "What is the capital of Spain?", options: ["Barcelona", "Madrid", "Valencia", "Seville"], correct: 1 },
            { question: "Which is the longest mountain range?", options: ["Andes", "Rocky Mountains", "Himalayas", "Alps"], correct: 0 }
        ]
    },
    english: {
        title: "English",
        questions: [
            { question: "What is the plural of 'child'?", options: ["childs", "children", "childrens", "child"], correct: 1 },
            { question: "Which is a synonym for 'happy'?", options: ["sad", "angry", "joyful", "tired"], correct: 2 },
            { question: "What type of word is 'quickly'?", options: ["noun", "verb", "adjective", "adverb"], correct: 3 },
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correct: 1 },
            { question: "What is the past tense of 'go'?", options: ["goed", "went", "gone", "going"], correct: 1 },
            { question: "Which sentence is grammatically correct?", options: ["Me and him went", "Him and I went", "He and I went", "I and he went"], correct: 2 },
            { question: "What is an antonym for 'difficult'?", options: ["hard", "easy", "complex", "tough"], correct: 1 },
            { question: "What is the superlative form of 'good'?", options: ["gooder", "goodest", "better", "best"], correct: 3 },
            { question: "Which is a proper noun?", options: ["city", "London", "building", "river"], correct: 1 },
            { question: "What punctuation ends an exclamatory sentence?", options: [".", "?", "!", ","], correct: 2 },
            { question: "What is the past tense of 'swim'?", options: ["swimmed", "swam", "swum", "swimming"], correct: 1 },
            { question: "What is a noun?", options: ["Action word", "Describing word", "Person, place, or thing", "Joining word"], correct: 2 },
            { question: "Which is a preposition?", options: ["run", "blue", "under", "quickly"], correct: 2 },
            { question: "What does 'metaphor' mean?", options: ["Comparison with 'like'", "Direct comparison without 'like'", "Opposite word", "Similar word"], correct: 1 },
            { question: "What is the past tense of 'eat'?", options: ["eated", "ate", "eaten", "eating"], correct: 1 },
            { question: "Which is a conjunction?", options: ["beautiful", "and", "quickly", "under"], correct: 1 },
            { question: "What is the plural of 'box'?", options: ["boxs", "boxes", "boxe", "boxen"], correct: 1 },
            { question: "What is an adjective?", options: ["An action", "A describing word", "A person", "A place"], correct: 1 },
            { question: "Who wrote 'Jane Eyre'?", options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "George Eliot"], correct: 0 },
            { question: "What is the plural of 'goose'?", options: ["gooses", "geese", "geeses", "goose"], correct: 1 }
        ]
    },
    physics: {
        title: "Physics",
        questions: [
            { question: "What is the unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
            { question: "What is the acceleration due to gravity?", options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"], correct: 0 },
            { question: "What is the formula for kinetic energy?", options: ["½mv²", "mgh", "mv", "ma"], correct: 0 },
            { question: "What type of wave is sound?", options: ["Longitudinal", "Transverse", "Electromagnetic", "Standing"], correct: 0 },
            { question: "What is Ohm's law?", options: ["V = IR", "P = IV", "E = mc²", "F = ma"], correct: 0 },
            { question: "What is the speed of sound in air?", options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"], correct: 0 },
            { question: "What particle has no charge?", options: ["Proton", "Electron", "Neutron", "Photon"], correct: 2 },
            { question: "What is the first law of thermodynamics?", options: ["Energy conservation", "Entropy increase", "Absolute zero", "Heat transfer"], correct: 0 },
            { question: "What is the unit of power?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 2 },
            { question: "What is the relation E = mc²?", options: ["Mass-energy equivalence", "Kinetic energy", "Potential energy", "Heat energy"], correct: 0 },
            { question: "What is the speed of light?", options: ["3 × 10⁸ m/s", "2 × 10⁸ m/s", "4 × 10⁸ m/s", "5 × 10⁸ m/s"], correct: 0 },
            { question: "What is the formula for potential energy?", options: ["½mv²", "mgh", "mv", "ma"], correct: 1 },
            { question: "What is the SI unit of pressure?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 3 },
            { question: "What is the phenomenon of refraction?", options: ["Bending of light", "Reflection of light", "Diffraction of light", "Scattering of light"], correct: 0 },
            { question: "What are objects that fall under gravity called?", options: ["Projectiles", "Vectors", "Scalars", "Tensors"], correct: 0 },
            { question: "What is Newton's second law?", options: ["F = ma", "F = m/a", "F = a/m", "F = m + a"], correct: 0 },
            { question: "What is the formula for work?", options: ["W = Fs", "W = F/s", "W = s/F", "W = F + s"], correct: 0 },
            { question: "What is the focal length of a plane mirror?", options: ["0", "Infinity", "1", "2"], correct: 1 },
            { question: "What is the angle of incidence in reflection?", options: ["Less than angle of reflection", "Equal to angle of reflection", "Greater than angle of reflection", "No relation"], correct: 1 },
            { question: "What are electromagnetic waves that have the shortest wavelength?", options: ["Visible light", "Gamma rays", "Radio waves", "Microwaves"], correct: 1 }
        ]
    },
    chemistry: {
        title: "Chemistry",
        questions: [
            { question: "What is the atomic number of carbon?", options: ["4", "6", "8", "12"], correct: 1 },
            { question: "What is the pH of pure water?", options: ["6", "7", "8", "9"], correct: 1 },
            { question: "What gas is produced when metals react with acids?", options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"], correct: 2 },
            { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], correct: 1 },
            { question: "What is the chemical formula for table salt?", options: ["NaCl", "CaCl₂", "KCl", "MgCl₂"], correct: 0 },
            { question: "What type of bond forms between metals and non-metals?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], correct: 1 },
            { question: "What is the noble gas in period 3?", options: ["Helium", "Neon", "Argon", "Krypton"], correct: 2 },
            { question: "What is the process of a solid turning directly to gas?", options: ["Melting", "Boiling", "Sublimation", "Condensation"], correct: 2 },
            { question: "What is Avogadro's number?", options: ["6.02 × 10²³", "3.14 × 10²³", "1.66 × 10²³", "9.11 × 10²³"], correct: 0 },
            { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
            { question: "What is the atomic number of oxygen?", options: ["6", "7", "8", "9"], correct: 2 },
            { question: "What is the chemical formula for glucose?", options: ["C₆H₁₀O₅", "C₆H₁₂O₆", "C₅H₁₀O₅", "C₇H₁₂O₆"], correct: 1 },
            { question: "What is the most electropositive element?", options: ["Sodium", "Potassium", "Francium", "Lithium"], correct: 2 },
            { question: "What is the process of burning called?", options: ["Combustion", "Oxidation", "Reduction", "Corrosion"], correct: 0 },
            { question: "What is the valency of carbon?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What is the color of chlorine gas?", options: ["White", "Yellow-green", "Brown", "Colorless"], correct: 1 },
            { question: "What is the pH range of acids?", options: ["0-7", "7-14", "7-8", "0-1"], correct: 0 },
            { question: "What is the chemical formula for ammonia?", options: ["NH₂", "NH₃", "N₂H₃", "N₃H"], correct: 1 },
            { question: "What is the atomic number of nitrogen?", options: ["5", "7", "9", "11"], correct: 1 },
            { question: "What is the process of converting a liquid to a gas?", options: ["Melting", "Boiling", "Condensation", "Freezing"], correct: 1 }
        ]
    },
    biology: {
        title: "Biology",
        questions: [
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"], correct: 1 },
            { question: "What is the study of plants called?", options: ["Zoology", "Botany", "Ecology", "Genetics"], correct: 1 },
            { question: "How many chromosomes do humans have?", options: ["44", "45", "46", "47"], correct: 2 },
            { question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correct: 2 },
            { question: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correct: 1 },
            { question: "What type of blood cell fights infection?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], correct: 1 },
            { question: "What is DNA?", options: ["Deoxyribonucleic acid", "Ribonucleic acid", "Amino acid", "Fatty acid"], correct: 0 },
            { question: "What is the largest organ in the human body?", options: ["Brain", "Liver", "Lungs", "Skin"], correct: 3 },
            { question: "What kingdom do mushrooms belong to?", options: ["Plant", "Animal", "Fungi", "Bacteria"], correct: 2 },
            { question: "What is the process of cell division called?", options: ["Meiosis", "Mitosis", "Both A and B", "Osmosis"], correct: 2 },
            { question: "What does RNA stand for?", options: ["Ribonucleic acid", "Ribose nucleic acid", "Ribose nitrogen acid", "Ribonuclease acid"], correct: 0 },
            { question: "What is the scientific study of life called?", options: ["Physiology", "Genetics", "Biology", "Ecology"], correct: 2 },
            { question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What is photosynthesis?", options: ["Breaking down food", "Making food using sunlight", "Removing waste", "Storing energy"], correct: 1 },
            { question: "What is the primary function of mitochondria?", options: ["Protein synthesis", "Energy production", "Genetic storage", "Waste removal"], correct: 1 },
            { question: "How many bones does an adult human have?", options: ["186", "206", "226", "246"], correct: 1 },
            { question: "What is the smallest bone in the human body?", options: ["Malleus", "Stapes", "Incus", "Radius"], correct: 1 },
            { question: "What is the function of chlorophyll?", options: ["Enzyme function", "Light absorption", "Gas exchange", "Nutrient transport"], correct: 1 },
            { question: "What is the study of heredity called?", options: ["Ecology", "Genetics", "Evolution", "Anatomy"], correct: 1 },
            { question: "What is the basic structure of all living organisms?", options: ["Tissue", "Organ", "Cell", "System"], correct: 2 }
        ]
    },
    computer: {
        title: "Computer Science",
        questions: [
            { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Unit", "Computer Processing Unit"], correct: 0 },
            { question: "What is the binary representation of decimal 10?", options: ["1010", "1100", "1001", "1011"], correct: 0 },
            { question: "Which programming language is known as the 'mother of all languages'?", options: ["Java", "C", "Python", "FORTRAN"], correct: 1 },
            { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"], correct: 0 },
            { question: "What is the smallest unit of data in a computer?", options: ["Byte", "Bit", "Nibble", "Word"], correct: 1 },
            { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 1 },
            { question: "Which company developed Java?", options: ["Microsoft", "Apple", "Sun Microsystems", "IBM"], correct: 2 },
            { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
            { question: "What does SQL stand for?", options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "System Query Language"], correct: 0 },
            { question: "What is the maximum value of a 8-bit unsigned integer?", options: ["127", "255", "256", "128"], correct: 1 },
            { question: "What does GPU stand for?", options: ["Graphics Processing Unit", "General Processing Unit", "Graphics Personal Unit", "Group Processing Unit"], correct: 0 },
            { question: "What is the time complexity of bubble sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correct: 2 },
            { question: "What is an algorithm?", options: ["A programming language", "Step-by-step procedure to solve a problem", "A data structure", "A type of software"], correct: 1 },
            { question: "What does API stand for?", options: ["Application Programming Interface", "Application Process Interface", "Advanced Programming Interface", "Applied Programming Interface"], correct: 0 },
            { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Serialized Object Notation", "JavaScript Operating Notation", "Java Standard Object Notation"], correct: 0 },
            { question: "What is a loop in programming?", options: ["A debugging tool", "Code that repeats", "A type of function", "A variable"], correct: 1 },
            { question: "What is a database?", options: ["Software application", "Organized collection of data", "Programming language", "Type of server"], correct: 1 },
            { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Common Style Sheets"], correct: 2 },
            { question: "What is object-oriented programming?", options: ["A type of database", "Programming using objects and classes", "Functional programming", "Assembly language"], correct: 1 },
            { question: "What is version control?", options: ["Controlling software versions", "System to track code changes", "Testing methodology", "Deployment process"], correct: 1 }
        ]
    },
    arts: {
        title: "Arts",
        questions: [
            { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2 },
            { question: "What are the primary colors?", options: ["Red, Blue, Yellow", "Red, Green, Blue", "Red, Blue, Green", "Blue, Yellow, Green"], correct: 0 },
            { question: "Which artist cut off his own ear?", options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"], correct: 1 },
            { question: "What is the art of beautiful handwriting called?", options: ["Typography", "Calligraphy", "Stenography", "Orthography"], correct: 1 },
            { question: "Who sculpted 'The Thinker'?", options: ["Michelangelo", "Auguste Rodin", "Leonardo da Vinci", "Donatello"], correct: 1 },
            { question: "What does 'Renaissance' mean?", options: ["Revival", "Rebirth", "Revolution", "Renewal"], correct: 1 },
            { question: "Which museum houses the Mona Lisa?", options: ["British Museum", "Metropolitan Museum", "Louvre", "Uffizi Gallery"], correct: 2 },
            { question: "What style of art is Salvador Dalí famous for?", options: ["Impressionism", "Cubism", "Surrealism", "Abstract"], correct: 2 },
            { question: "What is a fresco?", options: ["Oil painting", "Watercolor", "Wall painting on wet plaster", "Sculpture"], correct: 2 },
            { question: "Who painted 'Starry Night'?", options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Paul Cézanne"], correct: 1 },
            { question: "What movement did Claude Monet pioneer?", options: ["Cubism", "Impressionism", "Expressionism", "Romanticism"], correct: 1 },
            { question: "Who is famous for his abstract paintings and drip technique?", options: ["Jackson Pollock", "Mark Rothko", "Andy Warhol", "Roy Lichtenstein"], correct: 0 },
            { question: "What is the Statue of David by Michelangelo made of?", options: ["Bronze", "Marble", "Granite", "Plaster"], correct: 1 },
            { question: "What art style does Pablo Picasso pioneer?", options: ["Surrealism", "Cubism", "Impressionism", "Expressionism"], correct: 1 },
            { question: "What is a vanishing point in perspective drawing?", options: ["Corner of the canvas", "Point where parallel lines meet", "Center of the artwork", "Edge of the frame"], correct: 1 },
            { question: "Which artist created the sculptures at Easter Island?", options: ["Aztecs", "Mayans", "Rapanui people", "Incas"], correct: 2 },
            { question: "What is the famous Indian art form involving colored powder?", options: ["Batik", "Rangoli", "Origami", "Ikebana"], correct: 1 },
            { question: "Who is known for his use of bright colors and revolutionary style in modern art?", options: ["Henri Matisse", "Wassily Kandinsky", "Piet Mondrian", "Joan Miró"], correct: 0 },
            { question: "What is photography as an art form called?", options: ["Cinematography", "Photojournalism", "Fine art photography", "Documentary photography"], correct: 2 },
            { question: "What is the art of carving or shaping materials called?", options: ["Painting", "Sculpture", "Printmaking", "Drawing"], correct: 1 }
        ]
    },
    sports: {
        title: "Sports",
        questions: [
            { question: "How many players are on a basketball team on court?", options: ["4", "5", "6", "7"], correct: 1 },
            { question: "What is the maximum score possible in ten-pin bowling?", options: ["200", "250", "300", "350"], correct: 2 },
            { question: "How often are the Summer Olympics held?", options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"], correct: 2 },
            { question: "What sport is played at Wimbledon?", options: ["Golf", "Tennis", "Cricket", "Football"], correct: 1 },
            { question: "How many holes are there in a round of golf?", options: ["16", "17", "18", "19"], correct: 2 },
            { question: "What is the diameter of a basketball hoop?", options: ["16 inches", "17 inches", "18 inches", "19 inches"], correct: 2 },
            { question: "What does FIFA stand for?", options: ["Federation of International Football Associations", "Federation of International Football Athletes", "Federation of International Football Activities", "Federation of International Football Administrators"], correct: 0 },
            { question: "How many points is a touchdown worth in American football?", options: ["5", "6", "7", "8"], correct: 1 },
            { question: "What is the length of a marathon?", options: ["26.2 miles", "25.2 miles", "27.2 miles", "24.2 miles"], correct: 0 },
            { question: "In which sport would you perform a slam dunk?", options: ["Volleyball", "Tennis", "Basketball", "Badminton"], correct: 2 },
            { question: "How many sides does a boxing ring have?", options: ["3", "4", "5", "6"], correct: 1 },
            { question: "What is the duration of each period in ice hockey?", options: ["15 minutes", "20 minutes", "25 minutes", "30 minutes"], correct: 1 },
            { question: "How many players are on a soccer team on field?", options: ["9", "10", "11", "12"], correct: 2 },
            { question: "What is the distance of a cricket pitch?", options: ["20 yards", "22 yards", "25 yards", "30 yards"], correct: 1 },
            { question: "How many balls are used in a game of billiards?", options: ["14", "15", "16", "17"], correct: 2 },
            { question: "What is the tallest tennis racket allowed to be?", options: ["27 inches", "28 inches", "29 inches", "30 inches"], correct: 2 },
            { question: "How many teams compete in a relay race?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What is the weight of a standard baseball?", options: ["4 oz", "5 oz", "6 oz", "7 oz"], correct: 2 },
            { question: "What is the standard height of a volleyball net?", options: ["7 feet", "7.5 feet", "8 feet", "8.5 feet"], correct: 2 },
            { question: "What is a birdie in golf?", options: ["One shot under par", "One shot over par", "Two shots under par", "Two shots over par"], correct: 0 }
        ]
    },
    literature: {
        title: "Literature",
        questions: [
            { question: "Who wrote 'Pride and Prejudice'?", options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "George Eliot"], correct: 2 },
            { question: "What is the first book in the Harry Potter series?", options: ["Chamber of Secrets", "Philosopher's Stone", "Prisoner of Azkaban", "Goblet of Fire"], correct: 1 },
            { question: "Who wrote '1984'?", options: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "Anthony Burgess"], correct: 2 },
            { question: "What is Shakespeare's longest play?", options: ["Macbeth", "King Lear", "Othello", "Hamlet"], correct: 3 },
            { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Toni Morrison", "Maya Angelou", "Zora Neale Hurston"], correct: 0 },
            { question: "What is the opening line of 'A Tale of Two Cities'?", options: ["It was the best of times", "Call me Ishmael", "In the beginning", "Once upon a time"], correct: 0 },
            { question: "Who wrote 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], correct: 1 },
            { question: "What genre is 'The Lord of the Rings'?", options: ["Science Fiction", "Fantasy", "Mystery", "Romance"], correct: 1 },
            { question: "Who wrote 'One Hundred Years of Solitude'?", options: ["Jorge Luis Borges", "Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa"], correct: 2 },
            { question: "What is a sonnet?", options: ["12-line poem", "14-line poem", "16-line poem", "18-line poem"], correct: 1 },
            { question: "Who wrote 'Jane Eyre'?", options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "George Eliot"], correct: 0 },
            { question: "What is the author of 'Moby Dick'?", options: ["Mark Twain", "Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe"], correct: 1 },
            { question: "Who wrote 'Wuthering Heights'?", options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "George Eliot"], correct: 1 },
            { question: "What is the famous opening line of 'It Was the Best of Times'?", options: ["Great Expectations", "A Tale of Two Cities", "Oliver Twist", "David Copperfield"], correct: 1 },
            { question: "Who is the author of 'Anna Karenina'?", options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Ivan Turgenev", "Nikolai Gogol"], correct: 1 },
            { question: "What book is 'Call me Ishmael' the opening line of?", options: ["Moby Dick", "Billy Budd", "White-Jacket", "Bartleby, the Scrivener"], correct: 0 },
            { question: "Who wrote 'The Catcher in the Rye'?", options: ["J.D. Salinger", "Kurt Vonnegut", "Raymond Chandler", "Ernest Hemingway"], correct: 0 },
            { question: "What is the main character's name in 'Frankenstein'?", options: ["Victor Frankenstein", "The Monster", "Henry Clerval", "Walton"], correct: 0 },
            { question: "Who wrote 'Brave New World'?", options: ["George Orwell", "Ray Bradbury", "Aldous Huxley", "Anthony Burgess"], correct: 2 },
            { question: "What is the main theme of Shakespeare's 'Romeo and Juliet'?", options: ["Ambition", "Revenge", "Star-crossed love", "Betrayal"], correct: 2 }
        ]
    },
    current: {
        title: "Current Affairs",
        questions: [
            { question: "Who is the current Secretary-General of the UN?", options: ["Ban Ki-moon", "António Guterres", "Kofi Annan", "Boutros Boutros-Ghali"], correct: 1 },
            { question: "What is the currency of the European Union?", options: ["Pound", "Dollar", "Euro", "Franc"], correct: 2 },
            { question: "Which country hosted the 2020 Olympics?", options: ["China", "Japan", "South Korea", "Brazil"], correct: 1 },
            { question: "What does NATO stand for?", options: ["North Atlantic Treaty Organization", "North American Treaty Organization", "North Atlantic Trade Organization", "North American Trade Organization"], correct: 0 },
            { question: "Which social media platform was founded by Mark Zuckerberg?", options: ["Twitter", "Instagram", "Facebook", "LinkedIn"], correct: 2 },
            { question: "What is the largest economy in the world?", options: ["China", "United States", "Japan", "Germany"], correct: 1 },
            { question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"], correct: 1 },
            { question: "What is the most spoken language in the world?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], correct: 2 },
            { question: "Which country has the largest population?", options: ["India", "China", "United States", "Indonesia"], correct: 1 },
            { question: "What does WHO stand for?", options: ["World Health Organization", "World Human Organization", "World Help Organization", "World Hospital Organization"], correct: 0 },
            { question: "What does BRICS stand for?", options: ["Brazil, Russia, India, China, South Africa", "Brazil, Russia, Indonesia, Canada, Spain", "Belgium, Russia, India, China, Singapore", "Brazil, Romania, India, China, Serbia"], correct: 0 },
            { question: "Which country is the largest by area?", options: ["Canada", "United States", "China", "Russia"], correct: 3 },
            { question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Bath"], correct: 2 },
            { question: "Which organization is known for Nobel Prize?", options: ["UN", "World Bank", "Swedish Academy", "Nobel Foundation"], correct: 3 },
            { question: "What does ASEAN stand for?", options: ["Association of South East Asian Nations", "Association of South and East Asian Networks", "Alliance of South East Asia Network", "Association of Southeast Asian Nations"], correct: 3 },
            { question: "Which country is the world's largest democracy?", options: ["United States", "Indonesia", "India", "Brazil"], correct: 2 },
            { question: "What is the capital of Germany?", options: ["Munich", "Hamburg", "Berlin", "Frankfurt"], correct: 2 },
            { question: "What does IMF stand for?", options: ["International Monetary Fund", "International Military Force", "International Media Forum", "International Management Federation"], correct: 0 },
            { question: "Which country is known as the 'Land of the Rising Sun'?", options: ["Korea", "China", "Japan", "Vietnam"], correct: 2 },
            { question: "What is the main objective of the UN?", options: ["Economic development", "Peace and security", "Military cooperation", "Trade promotion"], correct: 1 }
        ]
    },
    general: {
        title: "General Knowledge",
        questions: [
            { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
            { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
            { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correct: 1 },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"], correct: 1 },
            { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
            { question: "What is the hardest natural substance?", options: ["Gold", "Diamond", "Steel", "Iron"], correct: 1 },
            { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correct: 1 },
            { question: "What is the largest country by area?", options: ["Canada", "United States", "China", "Russia"], correct: 3 },
            { question: "In which year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
            { question: "What is the speed of light?", options: ["200,000 km/s", "300,000 km/s", "400,000 km/s", "500,000 km/s"], correct: 1 },
            { question: "How many bones does an adult human have?", options: ["186", "206", "226", "246"], correct: 1 },
            { question: "What is the deepest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
            { question: "Which mountain is the tallest?", options: ["K2", "Kilimanjaro", "Mount Everest", "Denali"], correct: 2 },
            { question: "What is the smallest planet?", options: ["Venus", "Mercury", "Mars", "Pluto"], correct: 1 },
            { question: "How many strings does a violin have?", options: ["3", "4", "5", "6"], correct: 1 },
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Brisbane", "Canberra"], correct: 3 },
            { question: "How many chromosomes do humans have?", options: ["23", "46", "48", "50"], correct: 1 },
            { question: "What is the smallest bone in the human body?", options: ["Femur", "Stapes", "Fibula", "Tibia"], correct: 1 },
            { question: "How many sides does a pentagon have?", options: ["4", "5", "6", "7"], correct: 1 }
        ]
    },
    technology: {
        title: "Technology",
        questions: [
            { question: "What does 'WWW' stand for?", options: ["World Wide Web", "World Wide Website", "World Wide Window", "World Wide Wifi"], correct: 0 },
            { question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], correct: 1 },
            { question: "What does 'AI' stand for?", options: ["Automatic Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Applied Intelligence"], correct: 1 },
            { question: "What is the most popular mobile operating system?", options: ["iOS", "Android", "Windows Phone", "BlackBerry"], correct: 1 },
            { question: "What does 'URL' stand for?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Reference Link", "Universal Reference Link"], correct: 0 },
            { question: "Which company owns YouTube?", options: ["Facebook", "Amazon", "Google", "Microsoft"], correct: 2 },
            { question: "What is cloud computing?", options: ["Computing in the sky", "Internet-based computing", "Weather prediction", "Satellite computing"], correct: 1 },
            { question: "What does 'IoT' stand for?", options: ["Internet of Technology", "Internet of Things", "Internet of Thoughts", "Internet of Tools"], correct: 1 },
            { question: "What is blockchain?", options: ["A type of database", "A chain of blocks", "A cryptocurrency", "A programming language"], correct: 0 },
            { question: "What does '5G' refer to?", options: ["5 Gigabytes", "5th Generation", "5 Gigahertz", "5 Games"], correct: 1 },
            { question: "What does VR stand for?", options: ["Variable Reality", "Virtual Reality", "Verified Reality", "Visual Reality"], correct: 1 },
            { question: "What does AR stand for?", options: ["Augmented Reality", "Artificial Reality", "Applied Reality", "Advanced Reality"], correct: 0 },
            { question: "What is machine learning?", options: ["Programming machines", "Learning from data without explicit programming", "Artificial intelligence", "Robot learning"], correct: 1 },
            { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Interface", "Application Process Interface", "Automated Programming Interface"], correct: 0 },
            { question: "What is cybersecurity?", options: ["Computer safety", "Protection against cyber attacks", "Internet security", "Data protection"], correct: 1 },
            { question: "What is encryption?", options: ["Storing data", "Converting data into secret code", "Transferring data", "Backing up data"], correct: 1 },
            { question: "What does GPS stand for?", options: ["Global Positioning System", "Global Positioning Service", "Global Process System", "Geographic Positioning System"], correct: 0 },
            { question: "What is Big Data?", options: ["Large computers", "Large volumes of data", "Large programs", "Large networks"], correct: 1 },
            { question: "What is the metaverse?", options: ["Virtual universe", "Real world", "Internet platform", "Gaming console"], correct: 0 },
            { question: "What does SaaS stand for?", options: ["Software as a Service", "System as a Service", "Server as a Service", "Storage as a Service"], correct: 0 }
        ]
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    updateScoreDisplay();
    
    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const password = document.getElementById('passwordInput').value.trim();
        
        if (username && password) {
            currentUser = username;
            updateNavigation();
            showSection('home');
        } else {
            alert('Please enter both username and password');
        }
    });
});

// Navigation functions
function updateNavigation() {
    const loginNav = document.getElementById('loginNav');
    const logoutNav = document.getElementById('logoutNav');
    const userNav = document.getElementById('userNav');
    
    if (currentUser) {
        loginNav.classList.add('d-none');
        logoutNav.classList.remove('d-none');
        userNav.classList.remove('d-none');
        document.getElementById('username').textContent = currentUser;
    } else {
        loginNav.classList.remove('d-none');
        logoutNav.classList.add('d-none');
        userNav.classList.add('d-none');
    }
}

function logout() {
    currentUser = null;
    updateNavigation();
    showSection('home');
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    }
    
    // Update page title
    updatePageTitle(sectionName);
}

function updatePageTitle(section) {
    const titles = {
        home: 'QuizMaster - Interactive Quiz Platform',
        login: 'Login - QuizMaster',
        quiz: 'Quiz - QuizMaster',
        scores: 'Scores - QuizMaster'
    };
    document.title = titles[section] || 'QuizMaster';
}

// Quiz functions
function startQuiz(subject) {
    if (!currentUser) {
        alert('Please login to take a quiz');
        showSection('login');
        return;
    }
    
    currentQuiz = {
        subject: subject,
        data: quizData[subject],
        startTime: new Date()
    };
    
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.data.questions.length).fill(null);
    timeLeft = 300; // 5 minutes
    
    showSection('quiz');
    setupQuizInterface();
    startTimer();
    displayQuestion();
}

function setupQuizInterface() {
    document.getElementById('subjectTitle').textContent = currentQuiz.data.title + ' Quiz';
    document.getElementById('totalQuestions').textContent = currentQuiz.data.questions.length;
    document.getElementById('currentQuestion').textContent = '1';
    document.getElementById('progressBar').style.width = '10%';
}

function displayQuestion() {
    const question = currentQuiz.data.questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn option-btn';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.onclick = () => selectOption(index);
        
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
        
        optionsContainer.appendChild(button);
    });
    
    updateQuizNavigation();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update button styles
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === optionIndex) {
            btn.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.data.questions.length - 1) {
        currentQuestionIndex++;
        updateQuestionDisplay();
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestionDisplay();
        displayQuestion();
    }
}

function updateQuestionDisplay() {
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / currentQuiz.data.questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function updateQuizNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === currentQuiz.data.questions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function finishQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    let correctAnswers = 0;
    currentQuiz.data.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / currentQuiz.data.questions.length) * 100);
    const result = {
        subject: currentQuiz.subject,
        title: currentQuiz.data.title,
        score: score,
        correctAnswers: correctAnswers,
        totalQuestions: currentQuiz.data.questions.length,
        date: new Date().toLocaleDateString(),
        user: currentUser
    };
    
    // Save score
    userScores.push(result);
    localStorage.setItem('quizScores', JSON.stringify(userScores));
    
    // Show results
    showResults(result);
}

function showResults(result) {
    const modal = new bootstrap.Modal(document.getElementById('resultsModal'));
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultScore = document.getElementById('resultScore');
    const resultPercentage = document.getElementById('resultPercentage');
    
    // Set result content
    resultScore.textContent = `You scored ${result.correctAnswers} out of ${result.totalQuestions}`;
    resultPercentage.textContent = `${result.score}%`;
    
    // Set icon and title based on score
    if (result.score >= 90) {
        resultIcon.className = 'fas fa-trophy fa-3x result-icon excellent';
        resultTitle.textContent = 'Excellent!';
    } else if (result.score >= 70) {
        resultIcon.className = 'fas fa-medal fa-3x result-icon good';
        resultTitle.textContent = 'Well Done!';
    } else if (result.score >= 50) {
        resultIcon.className = 'fas fa-thumbs-up fa-3x result-icon fair';
        resultTitle.textContent = 'Good Try!';
    } else {
        resultIcon.className = 'fas fa-redo fa-3x result-icon poor';
        resultTitle.textContent = 'Keep Practicing!';
    }
    
    modal.show();
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const scoresList = document.getElementById('scoresList');
    const totalQuizzesElement = document.getElementById('totalQuizzes');
    const averageScoreElement = document.getElementById('averageScore');
    const bestScoreElement = document.getElementById('bestScore');
    
    if (userScores.length === 0) {
        scoresList.innerHTML = '<p class="text-muted">No quiz results available. Take a quiz to see your scores!</p>';
        totalQuizzesElement.textContent = '0';
        averageScoreElement.textContent = '0%';
        bestScoreElement.textContent = '0%';
        return;
    }
    
    // Display recent scores
    const userQuizzes = userScores.filter(score => !currentUser || score.user === currentUser);
    scoresList.innerHTML = '';
    
    userQuizzes.slice(-10).reverse().forEach(score => {
        const scoreElement = document.createElement('div');
        scoreElement.className = 'd-flex justify-content-between align-items-center p-3 border-bottom';
        
        let badgeClass = 'score-poor';
        if (score.score >= 90) badgeClass = 'score-excellent';
        else if (score.score >= 70) badgeClass = 'score-good';
        else if (score.score >= 50) badgeClass = 'score-fair';
        
        scoreElement.innerHTML = `
            <div>
                <h6 class="mb-1">${score.title}</h6>
                <small class="text-muted">${score.date}</small>
            </div>
            <span class="score-badge ${badgeClass}">${score.score}%</span>
        `;
        
        scoresList.appendChild(scoreElement);
    });
    
    // Update statistics
    totalQuizzesElement.textContent = userQuizzes.length;
    
    const averageScore = userQuizzes.reduce((sum, score) => sum + score.score, 0) / userQuizzes.length;
    averageScoreElement.textContent = Math.round(averageScore) + '%';
    
    const bestScore = Math.max(...userQuizzes.map(score => score.score));
    bestScoreElement.textContent = bestScore + '%';
}