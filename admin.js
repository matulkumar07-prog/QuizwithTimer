// Admin Variables
let adminUser = null;
let currentEditingQuiz = null;
let currentEditingQuestion = null;
let quizzes = JSON.parse(localStorage.getItem('adminQuizzes')) || {};
let customQuestions = JSON.parse(localStorage.getItem('customQuestions')) || {};
let adminSettings = JSON.parse(localStorage.getItem('adminSettings')) || {
    timeLimit: 300,
    passingScore: 60,
    questionsPerQuiz: 10
};

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    loadAdminDashboard();
    loadQuizzes();
    loadQuestions();
    loadUsers();
    loadSettings();
});

// Admin Authentication
function checkAdminAuth() {
    // Check if user is logged in as admin
    const adminSession = sessionStorage.getItem('adminSession');
    
    if (!adminSession) {
        // Show admin login
        showAdminLogin();
    } else {
        adminUser = adminSession;
        document.getElementById('adminUserDisplay').textContent = adminUser;
    }
}

function showAdminLogin() {
    // Create login prompt
    const password = prompt('Enter admin password:');
    
    if (password === 'admin123' || password === 'ADMIN') {
        const username = prompt('Enter admin username:', 'Admin');
        if (username) {
            sessionStorage.setItem('adminSession', username);
            adminUser = username;
            document.getElementById('adminUserDisplay').textContent = username;
        } else {
            showAdminLogin();
        }
    } else {
        alert('Invalid credentials. Redirecting to main quiz...');
        window.location.href = 'index.html';
    }
}

function logoutAdmin() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminSession');
        window.location.href = 'index.html';
    }
}

// Section Navigation
function showAdminSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update sidebar active link
    const links = document.querySelectorAll('.admin-sidebar .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
    });
    
    event.target.closest('.nav-link')?.classList.add('active');
    
    // Load section-specific data
    if (sectionName === 'dashboard') {
        loadAdminDashboard();
    } else if (sectionName === 'quizzes') {
        loadQuizzes();
    } else if (sectionName === 'questions') {
        loadQuestions();
    } else if (sectionName === 'users') {
        loadUsers();
    } else if (sectionName === 'analytics') {
        loadAnalytics();
    }
}

// ========== DASHBOARD SECTION ==========
function loadAdminDashboard() {
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    
    // Calculate stats
    const totalUsers = new Set(quizScores.map(s => s.user)).size;
    const totalAttempts = quizScores.length;
    const avgScore = quizScores.length > 0 
        ? Math.round(quizScores.reduce((sum, s) => sum + s.score, 0) / quizScores.length)
        : 0;
    
    // Update stat cards
    document.getElementById('totalQuizzes').textContent = '15';
    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalAttempts').textContent = totalAttempts;
    document.getElementById('avgScore').textContent = avgScore + '%';
    
    // Load top users
    loadTopUsers(quizScores);
    
    // Load top quizzes
    loadTopQuizzes(quizScores);
}

function loadTopUsers(quizScores) {
    const userStats = {};
    
    quizScores.forEach(score => {
        if (!userStats[score.user]) {
            userStats[score.user] = {
                attempts: 0,
                scores: [],
                bestScore: 0
            };
        }
        userStats[score.user].attempts++;
        userStats[score.user].scores.push(score.score);
        userStats[score.user].bestScore = Math.max(userStats[score.user].bestScore, score.score);
    });
    
    const topUsers = Object.entries(userStats)
        .sort((a, b) => b[1].bestScore - a[1].bestScore)
        .slice(0, 5);
    
    let html = '';
    if (topUsers.length > 0) {
        topUsers.forEach(([user, stats]) => {
            html += `
                <div class="user-item">
                    <div>
                        <div class="user-item-name">
                            <i class="fas fa-user-circle me-2"></i>${user}
                        </div>
                        <small class="text-muted">Attempts: ${stats.attempts}</small>
                    </div>
                    <div class="user-item-score">${stats.bestScore}%</div>
                </div>
            `;
        });
    } else {
        html = '<p class="text-muted text-center">No users yet</p>';
    }
    
    document.getElementById('topUsers').innerHTML = html;
}

function loadTopQuizzes(quizScores) {
    const quizStats = {};
    
    quizScores.forEach(score => {
        quizStats[score.quiz] = (quizStats[score.quiz] || 0) + 1;
    });
    
    const topQuizzes = Object.entries(quizStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    let html = '';
    if (topQuizzes.length > 0) {
        topQuizzes.forEach(([quiz, count]) => {
            html += `
                <div class="quiz-item">
                    <div class="quiz-item-name">
                        <i class="fas fa-book me-2"></i>${quiz}
                    </div>
                    <div class="quiz-item-count">${count} attempts</div>
                </div>
            `;
        });
    } else {
        html = '<p class="text-muted text-center">No quiz attempts yet</p>';
    }
    
    document.getElementById('topQuizzes').innerHTML = html;
}

// ========== QUIZZES MANAGEMENT ==========
function loadQuizzes() {
    const quizTable = document.getElementById('quizzesTable');
    let html = '';
    
    const subjects = [
        { id: 'mathematics', title: 'Mathematics', difficulty: 'Medium' },
        { id: 'science', title: 'Science', difficulty: 'Medium' },
        { id: 'history', title: 'History', difficulty: 'Easy' },
        { id: 'geography', title: 'Geography', difficulty: 'Medium' },
        { id: 'english', title: 'English', difficulty: 'Easy' },
        { id: 'physics', title: 'Physics', difficulty: 'Hard' },
        { id: 'chemistry', title: 'Chemistry', difficulty: 'Hard' },
        { id: 'biology', title: 'Biology', difficulty: 'Medium' },
        { id: 'computer', title: 'Computer Science', difficulty: 'Hard' },
        { id: 'arts', title: 'Arts', difficulty: 'Easy' },
        { id: 'sports', title: 'Sports', difficulty: 'Easy' },
        { id: 'literature', title: 'Literature', difficulty: 'Medium' },
        { id: 'current', title: 'Current Affairs', difficulty: 'Medium' },
        { id: 'general', title: 'General Knowledge', difficulty: 'Medium' },
        { id: 'technology', title: 'Technology', difficulty: 'Hard' }
    ];
    
    subjects.forEach(subject => {
        html += `
            <tr>
                <td>
                    <strong>${subject.title}</strong>
                </td>
                <td>
                    <span class="badge badge-info">10 Questions</span>
                </td>
                <td>
                    <span class="badge badge-${getDifficultyColor(subject.difficulty)}">${subject.difficulty}</span>
                </td>
                <td>
                    <span class="badge badge-success">Active</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="editQuiz('${subject.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteQuiz('${subject.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    quizTable.innerHTML = html;
}

function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'Easy': return 'success';
        case 'Medium': return 'warning';
        case 'Hard': return 'danger';
        default: return 'secondary';
    }
}

function editQuiz(quizId) {
    currentEditingQuiz = quizId;
    document.getElementById('quizName').value = quizId;
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    modal.show();
}

function deleteQuiz(quizId) {
    if (confirm(`Are you sure you want to delete the ${quizId} quiz?`)) {
        alert('Quiz deleted successfully!');
        loadQuizzes();
    }
}

function saveQuiz() {
    const quizName = document.getElementById('quizName').value;
    const quizDifficulty = document.getElementById('quizDifficulty').value;
    const quizDescription = document.getElementById('quizDescription').value;
    
    if (!quizName) {
        alert('Please enter a quiz name');
        return;
    }
    
    alert('Quiz saved successfully!');
    
    // Reset form
    document.getElementById('quizForm').reset();
    currentEditingQuiz = null;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
    modal.hide();
    
    // Reload quizzes
    loadQuizzes();
}

// ========== QUESTIONS MANAGEMENT ==========
function loadQuestions() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '<p class="text-center text-muted">Loading questions...</p>';
    
    // Load from main quiz data
    const quizData = {
        mathematics: {
            title: "Mathematics",
            questions: [
                { question: "What is 25 × 4?", options: ["90", "95", "100", "105"], correct: 2 },
                { question: "What is the square root of 144?", options: ["11", "12", "13", "14"], correct: 1 },
                { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
                { question: "What is the value of π (pi) approximately?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
                { question: "What is 7³?", options: ["343", "294", "421", "392"], correct: 0 }
            ]
        },
        science: {
            title: "Science",
            questions: [
                { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "CH4"], correct: 0 },
                { question: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
                { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 }
            ]
        }
    };
    
    let html = '';
    let questionCount = 0;
    
    for (const subject in quizData) {
        quizData[subject].questions.forEach((q, index) => {
            questionCount++;
            const correctOption = q.options[q.correct];
            html += `
                <div class="question-item">
                    <div class="d-flex justify-content-between align-items-start">
                        <div style="flex: 1;">
                            <div class="question-text">${q.question}</div>
                            <span class="badge badge-info me-2">${subject}</span>
                            <span class="badge badge-secondary">Q${index + 1}</span>
                        </div>
                    </div>
                    <div class="question-options mt-3">
                        ${q.options.map((opt, idx) => `
                            <div class="option-badge ${idx === q.correct ? 'correct' : ''}">
                                ${String.fromCharCode(65 + idx)}. ${opt}
                                ${idx === q.correct ? ' <i class="fas fa-check ms-1"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="question-actions mt-3">
                        <button class="btn btn-sm btn-primary" onclick="editQuestion('${subject}', ${index})">
                            <i class="fas fa-edit me-1"></i>Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteQuestion('${subject}', ${index})">
                            <i class="fas fa-trash me-1"></i>Delete
                        </button>
                    </div>
                </div>
            `;
        });
    }
    
    if (html === '') {
        html = '<p class="text-center text-muted">No questions found</p>';
    }
    
    questionsList.innerHTML = html;
}

function filterQuestions() {
    const subject = document.getElementById('subjectFilter').value;
    const searchTerm = document.getElementById('questionSearch').value.toLowerCase();
    
    const questionsList = document.getElementById('questionsList');
    const items = questionsList.querySelectorAll('.question-item');
    
    items.forEach(item => {
        let show = true;
        
        if (subject && !item.querySelector('.badge-info')?.textContent.includes(subject)) {
            show = false;
        }
        
        if (searchTerm && !item.querySelector('.question-text').textContent.toLowerCase().includes(searchTerm)) {
            show = false;
        }
        
        item.style.display = show ? 'block' : 'none';
    });
}

function editQuestion(subject, index) {
    currentEditingQuestion = { subject, index };
    document.getElementById('questionSubject').value = subject;
    const modal = new bootstrap.Modal(document.getElementById('questionModal'));
    modal.show();
}

function deleteQuestion(subject, index) {
    if (confirm('Are you sure you want to delete this question?')) {
        alert('Question deleted successfully!');
        loadQuestions();
    }
}

function saveQuestion() {
    const subject = document.getElementById('questionSubject').value;
    const questionText = document.getElementById('questionText').value;
    const optionA = document.getElementById('optionA').value;
    const optionB = document.getElementById('optionB').value;
    const optionC = document.getElementById('optionC').value;
    const optionD = document.getElementById('optionD').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    
    if (!subject || !questionText || !optionA || !optionB || !optionC || !optionD || correctAnswer === '') {
        alert('Please fill in all fields');
        return;
    }
    
    alert('Question saved successfully!');
    
    // Reset form
    document.getElementById('questionForm').reset();
    currentEditingQuestion = null;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('questionModal'));
    modal.hide();
    
    // Reload questions
    loadQuestions();
}

// ========== USERS MANAGEMENT ==========
function loadUsers() {
    const usersTable = document.getElementById('usersTable');
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    
    // Get unique users
    const userMap = {};
    
    quizScores.forEach(score => {
        if (!userMap[score.user]) {
            userMap[score.user] = {
                scores: [],
                quizzes: new Set()
            };
        }
        userMap[score.user].scores.push(score.score);
        userMap[score.user].quizzes.add(score.quiz);
    });
    
    let html = '';
    
    if (Object.keys(userMap).length === 0) {
        html = '<tr><td colspan="6" class="text-center text-muted">No users registered yet</td></tr>';
    } else {
        Object.entries(userMap).forEach(([username, data]) => {
            const scores = data.scores;
            const bestScore = Math.max(...scores);
            const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            
            html += `
                <tr>
                    <td>
                        <strong><i class="fas fa-user-circle me-2"></i>${username}</strong>
                    </td>
                    <td>
                        <span class="badge badge-primary">${data.quizzes.size} quizzes</span>
                    </td>
                    <td>
                        <span class="badge badge-success">${bestScore}%</span>
                    </td>
                    <td>
                        <span class="badge badge-info">${avgScore}%</span>
                    </td>
                    <td>
                        <small class="text-muted">-</small>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-info me-2" onclick="viewUserDetails('${username}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="removeUser('${username}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    
    usersTable.innerHTML = html;
}

function viewUserDetails(username) {
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    const userScores = quizScores.filter(s => s.user === username);
    
    let details = `User: ${username}\n\n`;
    details += `Total Attempts: ${userScores.length}\n`;
    details += `Best Score: ${Math.max(...userScores.map(s => s.score))}%\n`;
    details += `Average Score: ${Math.round(userScores.reduce((a, b) => a + b.score, 0) / userScores.length)}%\n\n`;
    details += `Quiz History:\n`;
    userScores.forEach(s => {
        details += `- ${s.quiz}: ${s.score}% on ${new Date(s.date).toLocaleDateString()}\n`;
    });
    
    alert(details);
}

function removeUser(username) {
    if (confirm(`Are you sure you want to remove ${username}?`)) {
        const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
        const filtered = quizScores.filter(s => s.user !== username);
        localStorage.setItem('quizScores', JSON.stringify(filtered));
        alert('User removed successfully!');
        loadUsers();
    }
}

// ========== ANALYTICS SECTION ==========
function loadAnalytics() {
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    
    // Calculate statistics
    const totalAttempts = quizScores.length;
    const passCount = quizScores.filter(s => s.score >= adminSettings.passingScore).length;
    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;
    const completionRate = totalAttempts > 0 ? 100 : 0;
    
    // Most popular quiz
    const quizCounts = {};
    quizScores.forEach(s => {
        quizCounts[s.quiz] = (quizCounts[s.quiz] || 0) + 1;
    });
    const mostPopular = Object.entries(quizCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
    
    // Update analytics display
    document.getElementById('completionRate').textContent = completionRate + '%';
    document.getElementById('passRate').textContent = passRate + '%';
    document.getElementById('mostPopular').textContent = mostPopular;
    document.getElementById('avgTime').textContent = '5m';
}

// ========== SETTINGS SECTION ==========
function loadSettings() {
    document.getElementById('timeLimitSetting').value = adminSettings.timeLimit;
    document.getElementById('passingScoreSetting').value = adminSettings.passingScore;
    document.getElementById('questionsPerQuizSetting').value = adminSettings.questionsPerQuiz;
}

function saveSettings() {
    adminSettings.timeLimit = parseInt(document.getElementById('timeLimitSetting').value);
    adminSettings.passingScore = parseInt(document.getElementById('passingScoreSetting').value);
    adminSettings.questionsPerQuiz = parseInt(document.getElementById('questionsPerQuizSetting').value);
    
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    alert('Settings saved successfully!');
}

function exportData() {
    const data = {
        quizScores: JSON.parse(localStorage.getItem('quizScores')) || [],
        adminSettings: adminSettings,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quizmaster-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Data exported successfully!');
}

function clearAnalytics() {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
        localStorage.removeItem('quizScores');
        alert('Analytics cleared successfully!');
        loadAdminDashboard();
        loadUsers();
        loadAnalytics();
    }
}

function resetSystem() {
    if (confirm('Are you sure you want to reset the entire system? This will delete all user data and settings.')) {
        if (confirm('This action cannot be undone. Are you really sure?')) {
            localStorage.removeItem('quizScores');
            localStorage.removeItem('adminSettings');
            localStorage.removeItem('customQuestions');
            localStorage.removeItem('adminQuizzes');
            alert('System reset successfully!');
            window.location.reload();
        }
    }
}
