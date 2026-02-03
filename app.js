// MindPilot AI - Full Automation Coding Platform
// Main application logic with Puter.com integration

let puterAuth = null;
let currentProject = null;
let automationQueue = [];
let terminalHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    animateStats();
});

// Initialize Puter.com connection
async function initPuter() {
    try {
        // Check if Puter is available
        if (typeof puter === 'undefined') {
            showNotification('Puter.com SDK not loaded. Please check your internet connection.', 'error');
            console.error('Puter SDK not found');
            return;
        }
        
        showNotification('Connecting to Puter.com...', 'info');
        
        // Try to authenticate with Puter
        puterAuth = await puter.auth.signIn();
        
        if (puterAuth) {
            showNotification('Successfully connected to Puter.com!', 'success');
            updatePuterStatus(true);
            loadPuterFiles();
        } else {
            showNotification('Connection cancelled by user', 'warning');
        }
    } catch (error) {
        console.error('Puter connection failed:', error);
        showNotification('Failed to connect to Puter.com: ' + error.message, 'error');
        
        // Fallback: simulate connection for demo purposes
        setTimeout(() => {
            puterAuth = { simulated: true };
            showNotification('Demo mode: Simulated Puter.com connection', 'info');
            updatePuterStatus(true);
        }, 1000);
    }
}

// Update Puter connection status
function updatePuterStatus(connected) {
    const connectBtn = document.querySelector('button[onclick="initPuter()"]');
    if (connected) {
        connectBtn.innerHTML = '<i class="fas fa-cloud mr-2"></i>Connected';
        connectBtn.classList.remove('bg-purple-600');
        connectBtn.classList.add('bg-green-600');
    } else {
        connectBtn.innerHTML = '<i class="fas fa-cloud mr-2"></i>Connect Puter';
        connectBtn.classList.remove('bg-green-600');
        connectBtn.classList.add('bg-purple-600');
    }
}

// Load files from Puter.com
async function loadPuterFiles() {
    if (!puterAuth) return;
    
    try {
        const files = await puter.fs.readdir('/');
        displayPuterFiles(files);
    } catch (error) {
        console.error('Failed to load Puter files:', error);
    }
}

// Display Puter files in the interface
function displayPuterFiles(files) {
    console.log('Puter files:', files);
    // Update UI with file list
}

// Navigation between sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-purple-400');
    });
    event.target.classList.add('text-purple-400');
}

// Code Editor Functions
function generateCode() {
    const editor = document.getElementById('code-editor');
    const language = document.getElementById('language-select').value;
    const prompt = editor.value || 'Create a modern web application';
    
    showNotification('AI is generating code...', 'info');
    
    // Simulate AI code generation
    setTimeout(() => {
        let generatedCode = '';
        
        switch(language) {
            case 'javascript':
                generatedCode = `// AI Generated JavaScript Code
class MindPilotApp {
    constructor() {
        this.version = '1.0.0';
        this.features = ['AI-powered', 'Full automation', 'Cloud-ready'];
    }
    
    async initialize() {
        console.log('Initializing MindPilot AI Platform...');
        await this.loadModules();
        this.startAutomation();
    }
    
    async loadModules() {
        // Load AI modules
        const modules = ['code-generator', 'bug-detector', 'optimizer'];
        for (const module of modules) {
            console.log(\`Loading \${module}...\`);
        }
    }
    
    startAutomation() {
        console.log('Starting automation pipeline...');
        setInterval(() => {
            this.performTask();
        }, 5000);
    }
    
    performTask() {
        console.log('Performing automated task...');
    }
}

// Initialize the application
const app = new MindPilotApp();
app.initialize();`;
                break;
                
            case 'python':
                generatedCode = `# AI Generated Python Code
import asyncio
import json
from typing import Dict, List, Optional

class MindPilotAI:
    def __init__(self):
        self.version = "1.0.0"
        self.capabilities = [
            "code_generation",
            "bug_detection", 
            "performance_optimization",
            "automated_testing"
        ]
    
    async def initialize(self):
        """Initialize the AI platform"""
        print("🚀 Initializing MindPilot AI Platform...")
        await self.load_ai_modules()
        self.start_automation_engine()
    
    async def load_ai_modules(self):
        """Load AI-powered modules"""
        modules = ["nlp_processor", "code_analyzer", "automation_engine"]
        for module in modules:
            print(f"📦 Loading {module}...")
            await asyncio.sleep(0.1)
    
    def start_automation_engine(self):
        """Start the automation engine"""
        print("⚡ Starting automation engine...")
        # Automation logic here
    
    def generate_code(self, description: str) -> str:
        """Generate code from description"""
        return f"# Generated from: {description}\\nprint('Hello, MindPilot AI!')"

# Run the application
if __name__ == "__main__":
    ai_platform = MindPilotAI()
    asyncio.run(ai_platform.initialize())`;
                break;
                
            case 'html':
                generatedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MindPilot AI App</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 MindPilot AI Application</h1>
        <div class="feature-card">
            <h2>✨ AI-Powered Features</h2>
            <p>Automated code generation, bug detection, and optimization</p>
        </div>
        <div class="feature-card">
            <h2>☁️ Cloud Ready</h2>
            <p>Deploy instantly to multiple platforms with one click</p>
        </div>
    </div>
</body>
</html>`;
                break;
                
            case 'css':
                generatedCode = `/* AI Generated CSS - Modern Design System */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --glass-bg: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
}

.glass-effect {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.feature-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}`;
                break;
        }
        
        editor.value = generatedCode;
        updateOutput(generatedCode, language);
        showNotification('Code generated successfully!', 'success');
    }, 2000);
}

function optimizeCode() {
    const editor = document.getElementById('code-editor');
    const code = editor.value;
    
    if (!code.trim()) {
        showNotification('Please enter some code to optimize', 'warning');
        return;
    }
    
    showNotification('Optimizing code...', 'info');
    
    setTimeout(() => {
        // Simulate code optimization
        const optimized = code
            .replace(/\/\*.*?\*\//g, '') // Remove block comments
            .replace(/\/\/.*$/gm, '') // Remove line comments
            .replace(/\s+/g, ' ') // Minify whitespace
            .trim();
        
        editor.value = optimized;
        showNotification('Code optimized successfully!', 'success');
    }, 1500);
}

function debugCode() {
    const editor = document.getElementById('code-editor');
    const code = editor.value;
    
    if (!code.trim()) {
        showNotification('Please enter some code to debug', 'warning');
        return;
    }
    
    showNotification('Analyzing code for bugs...', 'info');
    
    setTimeout(() => {
        // Simulate bug detection
        const issues = [
            'Line 15: Potential null reference',
            'Line 23: Unused variable detected',
            'Line 31: Missing error handling'
        ];
        
        showNotification(`Found ${issues.length} potential issues`, 'warning');
        console.log('Debug issues:', issues);
    }, 2000);
}

function runCode() {
    const editor = document.getElementById('code-editor');
    const language = document.getElementById('language-select').value;
    const code = editor.value;
    
    if (!code.trim()) {
        showNotification('Please enter some code to run', 'warning');
        return;
    }
    
    showNotification('Executing code...', 'info');
    
    setTimeout(() => {
        // Simulate code execution
        const output = getSimulatedOutput(code, language);
        updateOutput(output, language);
        showNotification('Code executed successfully!', 'success');
    }, 1000);
}

function getSimulatedOutput(code, language) {
    if (language === 'javascript') {
        return `// Code Output
MindPilot AI Platform initialized!
✓ Modules loaded: 3
✓ Automation engine started
✓ Ready for tasks
Performance: 98% efficiency`;
    } else if (language === 'python') {
        return `# Code Output
🚀 Initializing MindPilot AI Platform...
📦 Loading nlp_processor...
📦 Loading code_analyzer...
📦 Loading automation_engine...
⚡ Starting automation engine...
Platform ready!`;
    } else if (language === 'html') {
        return `<!-- HTML Preview -->
Document rendered successfully
✓ Responsive design applied
✓ Modern CSS loaded
✓ Interactive elements ready`;
    } else {
        return `CSS compiled successfully!
✓ Variables defined: 12
✓ Mixins created: 5
✓ Responsive breakpoints: 4
✓ Animation keyframes: 3`;
    }
}

function updateOutput(code, language) {
    const outputElement = document.getElementById('code-output');
    outputElement.className = `language-${language}`;
    outputElement.textContent = code;
    
    // Re-highlight syntax
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(outputElement);
    }
}

// Save code to Puter.com
async function saveToPuter() {
    if (!puterAuth) {
        showNotification('Please connect to Puter.com first', 'warning');
        return;
    }
    
    const editor = document.getElementById('code-editor');
    const code = editor.value;
    const language = document.getElementById('language-select').value;
    const filename = `mindpilot-code-${Date.now()}.${getFileExtension(language)}`;
    
    try {
        await puter.fs.write(filename, code);
        showNotification(`Code saved to Puter.com as ${filename}`, 'success');
    } catch (error) {
        console.error('Failed to save to Puter:', error);
        showNotification('Failed to save code to Puter.com', 'error');
    }
}

function getFileExtension(language) {
    const extensions = {
        'javascript': 'js',
        'python': 'py',
        'html': 'html',
        'css': 'css'
    };
    return extensions[language] || 'txt';
}

// Automation Functions
function startAutomation(type) {
    showNotification(`Starting ${type} automation...`, 'info');
    
    const automationItem = {
        id: Date.now(),
        type: type,
        status: 'running',
        progress: 0
    };
    
    automationQueue.push(automationItem);
    updateAutomationStatus();
    
    // Simulate automation progress
    const interval = setInterval(() => {
        automationItem.progress += 10;
        
        if (automationItem.progress >= 100) {
            automationItem.status = 'completed';
            clearInterval(interval);
            showNotification(`${type} automation completed!`, 'success');
        }
        
        updateAutomationStatus();
    }, 500);
}

function updateAutomationStatus() {
    const statusContainer = document.getElementById('automation-status');
    
    if (automationQueue.length === 0) {
        statusContainer.innerHTML = '<p class="text-gray-400">No active automations</p>';
        return;
    }
    
    const statusHTML = automationQueue.map(item => {
        const statusIcon = item.status === 'running' 
            ? '<div class="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>'
            : '<i class="fas fa-check-circle text-green-400"></i>';
            
        const statusText = item.status === 'running' 
            ? `${item.type} automation in progress...`
            : `${item.type} automation completed`;
            
        return `
            <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-3">
                    ${statusIcon}
                    <span>${statusText}</span>
                </div>
                <span class="text-gray-400">${item.progress}%</span>
            </div>
        `;
    }).join('');
    
    statusContainer.innerHTML = statusHTML;
}

// Project Management
function createNewProject() {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;
    
    currentProject = {
        id: Date.now(),
        name: projectName,
        created: new Date().toISOString(),
        files: []
    };
    
    showNotification(`Project "${projectName}" created successfully!`, 'success');
    showSection('editor');
}

function selectTemplate(template) {
    showNotification(`Loading ${template} template...`, 'info');
    
    setTimeout(() => {
        loadTemplateCode(template);
        showSection('editor');
        showNotification(`${template} template loaded!`, 'success');
    }, 1000);
}

function loadTemplateCode(template) {
    const editor = document.getElementById('code-editor');
    const languageSelect = document.getElementById('language-select');
    
    const templates = {
        'react': {
            language: 'javascript',
            code: `// React Component Template
import React, { useState, useEffect } from 'react';

const MindPilotApp = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // AI-powered data fetching
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <h1>MindPilot AI React App</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="data-container">
                    {data.map(item => (
                        <div key={item.id} className="item">
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MindPilotApp;`
        },
        'nodejs': {
            language: 'javascript',
            code: `// Node.js Express API Template
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// AI-powered routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'active',
        platform: 'MindPilot AI',
        features: ['automation', 'code-generation', 'optimization']
    });
});

app.post('/api/generate', async (req, res) => {
    const { prompt, language } = req.body;
    
    try {
        // AI code generation logic
        const generatedCode = await generateCode(prompt, language);
        res.json({ code: generatedCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 MindPilot AI Server running on port ${PORT}`);
});`
        },
        'python': {
            language: 'python',
            code: `# Python Flask API Template
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """AI-powered health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'platform': 'MindPilot AI',
        'version': '1.0.0'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    """Analyze code with AI"""
    data = request.get_json()
    code = data.get('code', '')
    
    # AI analysis logic
    analysis = {
        'lines': len(code.split('\\n')),
        'complexity': 'medium',
        'suggestions': [
            'Consider adding error handling',
            'Optimize loop performance',
            'Add documentation'
        ]
    }
    
    return jsonify(analysis)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`
        }
    };
    
    const template = templates[template];
    if (template) {
        languageSelect.value = template.language;
        editor.value = template.code;
        updateOutput(template.code, template.language);
    }
}

// Deployment Functions
function deployProject() {
    const selectedPlatform = document.querySelector('input[name="platform"]:checked');
    
    if (!selectedPlatform) {
        showNotification('Please select a deployment platform', 'warning');
        return;
    }
    
    const platform = selectedPlatform.value;
    showNotification(`Deploying to ${platform}...`, 'info');
    
    // Simulate deployment process
    const deploymentSteps = [
        'Building project...',
        'Running tests...',
        'Optimizing assets...',
        'Uploading to server...',
        'Configuring domain...'
    ];
    
    let currentStep = 0;
    const deploymentInterval = setInterval(() => {
        if (currentStep < deploymentSteps.length) {
            updateDeploymentStatus(deploymentSteps[currentStep], (currentStep + 1) * 20);
            currentStep++;
        } else {
            clearInterval(deploymentInterval);
            completeDeployment(platform);
        }
    }, 1000);
}

function updateDeploymentStatus(step, progress) {
    const statusContainer = document.getElementById('deployment-status');
    const statusHTML = `
        <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">Deployment in Progress</span>
                <span class="text-blue-400">${progress}%</span>
            </div>
            <p class="text-sm text-gray-400">${step}</p>
            <div class="mt-2 bg-gray-700 rounded-full h-2">
                <div class="bg-blue-400 h-2 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
            </div>
        </div>
    `;
    statusContainer.innerHTML = statusHTML;
}

function completeDeployment(platform) {
    const urls = {
        'vercel': 'https://mindpilot-app.vercel.app',
        'netlify': 'https://mindpilot-app.netlify.app',
        'heroku': 'https://mindpilot-app.herokuapp.com',
        'puter': 'https://puter.com/apps/mindpilot'
    };
    
    const url = urls[platform];
    const statusContainer = document.getElementById('deployment-status');
    
    statusContainer.innerHTML = `
        <div class="p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">MindPilot App</span>
                <span class="text-green-400">Live</span>
            </div>
            <p class="text-sm text-gray-400">${url}</p>
            <div class="mt-2 bg-gray-700 rounded-full h-2">
                <div class="bg-green-400 h-2 rounded-full" style="width: 100%"></div>
            </div>
            <div class="mt-4 flex space-x-2">
                <button onclick="window.open('${url}', '_blank')" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                    <i class="fas fa-external-link-alt mr-1"></i>Visit Site
                </button>
                <button class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                    <i class="fas fa-chart-line mr-1"></i>Analytics
                </button>
            </div>
        </div>
    `;
    
    showNotification(`Successfully deployed to ${platform}!`, 'success');
}

// Terminal Functions
function openTerminal() {
    document.getElementById('terminal-modal').classList.remove('hidden');
    document.getElementById('terminal-input').focus();
}

function closeTerminal() {
    document.getElementById('terminal-modal').classList.add('hidden');
}

function executeCommand() {
    const input = document.getElementById('terminal-input');
    const command = input.value.trim();
    
    if (!command) return;
    
    const terminalContent = document.getElementById('terminal-content');
    terminalContent.innerHTML += `<div>$ ${command}</div>`;
    
    // Process command
    const output = processTerminalCommand(command);
    terminalContent.innerHTML += `<div>${output}</div>`;
    
    terminalContent.scrollTop = terminalContent.scrollHeight;
    input.value = '';
    
    terminalHistory.push(command);
}

function processTerminalCommand(command) {
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    switch (cmd) {
        case 'help':
            return `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  status   - Show platform status
  deploy   - Deploy current project
  test     - Run automated tests
  build    - Build project
  analyze  - Analyze code quality`;
            
        case 'clear':
            document.getElementById('terminal-content').innerHTML = '<div>$ Terminal cleared</div>';
            return '';
            
        case 'status':
            return `Platform Status:
✓ AI Engine: Online
✓ Puter.com: ${puterAuth ? 'Connected' : 'Disconnected'}
✓ Automation: Active
✓ Projects: ${automationQueue.length} active`;
            
        case 'deploy':
            return '🚀 Initiating deployment...';
            
        case 'test':
            return '🧪 Running test suite...\\n✓ All tests passed (156/156)';
            
        case 'build':
            return '🔨 Building project...\\n✓ Build completed successfully';
            
        case 'analyze':
            return '📊 Analyzing code...\\n✓ Code quality: 95%\\n✓ Performance: Excellent\\n✓ Security: No issues found';
            
        default:
            return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set color based on type
    const colors = {
        'success': 'bg-green-600',
        'error': 'bg-red-600',
        'warning': 'bg-yellow-600',
        'info': 'bg-blue-600'
    };
    
    notification.classList.add(colors[type] || colors['info']);
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function animateStats() {
    // Animate statistics on dashboard
    const stats = [
        { id: 'project-count', target: 12, suffix: '' },
        { id: 'loc-count', target: 45.2, suffix: 'K' },
        { id: 'deploy-count', target: 28, suffix: '' },
        { id: 'ai-tasks', target: 156, suffix: '' }
    ];
    
    stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / 50;
        const element = document.getElementById(stat.id);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            
            if (stat.suffix === 'K') {
                element.textContent = current.toFixed(1) + stat.suffix;
            } else {
                element.textContent = Math.floor(current) + stat.suffix;
            }
        }, 30);
    });
}

function setupEventListeners() {
    // Terminal input enter key
    document.getElementById('terminal-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            executeCommand();
        }
    });
    
    // Code editor syntax highlighting on change
    document.getElementById('code-editor').addEventListener('input', function() {
        const code = this.value;
        const language = document.getElementById('language-select').value;
        updateOutput(code, language);
    });
    
    // Language selector change
    document.getElementById('language-select').addEventListener('change', function() {
        const code = document.getElementById('code-editor').value;
        updateOutput(code, this.value);
    });
}

function initializeApp() {
    // Set initial section
    showSection('dashboard');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveToPuter();
        }
        
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        
        // Ctrl/Cmd + ` to open terminal
        if ((e.ctrlKey || e.metaKey) && e.key === '`') {
            e.preventDefault();
            openTerminal();
        }
    });
    
    console.log('🚀 MindPilot AI Platform initialized successfully!');
}

// Export functions for global access
window.MindPilotAI = {
    initPuter,
    generateCode,
    optimizeCode,
    debugCode,
    runCode,
    saveToPuter,
    startAutomation,
    createNewProject,
    selectTemplate,
    deployProject,
    openTerminal,
    closeTerminal,
    executeCommand
};
