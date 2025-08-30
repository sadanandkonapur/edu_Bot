// Edu Academy Chatbot JavaScript

let conversationHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadSubjects();
});

function initializeEventListeners() {
    // Chat form submission
    document.getElementById('question-form').addEventListener('submit', handleQuestionSubmit);
    
    // Study plan form submission
    document.getElementById('study-plan-form').addEventListener('submit', handleStudyPlanSubmit);
    
    // Enter key for chat input
    document.getElementById('user-input').addEventListener('keypress', handleKeyPress);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                conversation_history: conversationHistory
            })
        });
        
        const data = await response.json();
        
        // Hide typing indicator
        hideTypingIndicator();
        
        if (response.ok) {
            // Add bot response to chat
            addMessageToChat(data.response, 'bot');
            
            // Update conversation history
            conversationHistory.push({ role: 'user', content: message });
            conversationHistory.push({ role: 'assistant', content: data.response });
        } else {
            addMessageToChat('Sorry, I encountered an error. Please try again.', 'bot');
        }
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('Sorry, I\'m having trouble connecting. Please check your internet connection.', 'bot');
        console.error('Chat error:', error);
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message fade-in`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot me-2"></i>${message}
            </div>
            <small class="text-muted">${timeString}</small>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <small class="text-muted">${timeString}</small>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-robot me-2"></i>
            <span class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show the typing indicator
    typingDiv.style.display = 'block';
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function handleQuestionSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const question = formData.get('question');
    const subject = formData.get('subject');
    
    if (!question.trim()) {
        showAlert('Please enter a question.', 'error');
        return;
    }
    
    try {
        const response = await fetch('/ask-question', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Add the question and response to chat
            addMessageToChat(`[${subject}] ${question}`, 'user');
            addMessageToChat(data.response, 'bot');
            
            // Clear the form
            document.getElementById('question-input').value = '';
            
            // Scroll to chat
            scrollToChat();
        } else {
            showAlert('Error: ' + data.error, 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
        console.error('Question submit error:', error);
    }
}

async function handleStudyPlanSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const subject = formData.get('subject');
    const level = formData.get('level');
    const duration = formData.get('duration');
    
    if (!subject || !level) {
        showAlert('Please select both subject and level.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Generating...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/study-plan', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show the study plan
            const resultDiv = document.getElementById('study-plan-result');
            const contentDiv = document.getElementById('study-plan-content');
            
            contentDiv.textContent = data.study_plan;
            resultDiv.style.display = 'block';
            
            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            
            showAlert('Study plan generated successfully!', 'success');
        } else {
            showAlert('Error: ' + data.error, 'error');
        }
    } catch (error) {
        showAlert('Network error. Please try again.', 'error');
        console.error('Study plan error:', error);
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function loadSubjects() {
    try {
        const response = await fetch('/subjects');
        const data = await response.json();
        
        const subjectSelects = document.querySelectorAll('#subject-select, #study-subject');
        subjectSelects.forEach(select => {
            // Keep existing options and add from API if needed
            data.subjects.forEach(subject => {
                if (!Array.from(select.options).some(option => option.value === subject)) {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    select.appendChild(option);
                }
            });
        });
    } catch (error) {
        console.error('Error loading subjects:', error);
    }
}

function askQuestion(question) {
    document.getElementById('user-input').value = question;
    sendMessage();
}

function scrollToChat() {
    document.getElementById('chat-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-custom fade-in`;
    alertDiv.textContent = message;
    
    // Add to top of container
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    
    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth' });
}

// Utility function to format text
function formatResponse(text) {
    // Basic formatting for better readability
    return text
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome animation
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        heroSection.classList.add('fade-in');
    }, 100);
    
    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
