# Crisp - Setup & Installation Guide

## Quick Start

### Step 1: Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

### Step 2: Clone & Install
```bash
# Clone the repository
git clone <your-repo-url>
cd crisp-interview-assistant

# Install dependencies
npm install
```

### Step 3: Configure API Key
1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your API key:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your-actual-key-here
   ```

### Step 4: Run the Application
```bash
npm start
```
The app will automatically open at `http://localhost:3000`

## Project Structure Explained

```
crisp-interview-assistant/
│
├── public/
│   └���─ index.html                 # Main HTML file
│
├── src/
│   ├── components/
│   │   ├── Interviewee/          # Candidate interview components
│   │   │   ├── ResumeUpload.jsx  # Resume file upload
│   │   │   ├── MissingFieldsForm.jsx  # Collect missing info
│   │   │   ├── InterviewChat.jsx # Main interview interface
│   │   │   ├── InterviewComplete.jsx  # Results screen
│   │   │   └── IntervieweeTab.jsx # Main interviewee container
│   │   │
│   │   └── Interviewer/          # Interviewer dashboard
│   │       ├── CandidateList.jsx # Candidates table & details
│   │       └── InterviewerTab.jsx # Main interviewer container
│   │
│   ├── store/                    # Redux state management
│   │   ├── store.js              # Redux store configuration
│   │   └── slices/
│   │       ├── candidateSlice.js # Candidate state
│   │       └── interviewSlice.js # Interview state
│   │
│   ├── services/
│   │   └── aiService.js          # OpenAI API integration
│   │
│   ├── utils/
│   │   └── resumeParser.js       # PDF/DOCX parsing
│   │
│   ├── App.jsx                   # Main app component
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
│
├── .env                          # Environment variables (create this)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
└── README.md                     # Project documentation
```

## Key Features Implementation

### 1. Resume Upload & Parsing
- **Location**: `src/components/Interviewee/ResumeUpload.jsx`
- **Parser**: `src/utils/resumeParser.js`
- **Supported Formats**: PDF, DOCX
- **Extracted Fields**: Name, Email, Phone

### 2. Interview Flow
- **Location**: `src/components/Interviewee/InterviewChat.jsx`
- **Questions**: 6 total (2 Easy, 2 Medium, 2 Hard)
- **Timers**: 20s, 60s, 120s respectively
- **Auto-Submit**: When timer reaches 0
- **Pause/Resume**: With Welcome Back modal

### 3. AI Integration
- **Location**: `src/services/aiService.js`
- **Model**: GPT-3.5-turbo
- **Functions**:
  - Generate interview questions
  - Score answers (0-100)
  - Generate candidate summary
- **Fallback**: Mock questions if API fails

### 4. State Management
- **Location**: `src/store/`
- **Technology**: Redux Toolkit + redux-persist
- **Persistence**: Browser localStorage
- **Data Persisted**:
  - Candidate profiles
  - Interview progress
  - Answers and scores
  - Session state

### 5. Dashboard
- **Location**: `src/components/Interviewer/CandidateList.jsx`
- **Features**:
  - List all completed interviews
  - Sort by score or date
  - Search by name/email
  - View detailed candidate info
  - See all Q&A with scores

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (not recommended)
npm eject
```

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` again
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: API key not working
**Solution**: 
1. Verify key is correct in `.env`
2. Check OpenAI account has credits
3. Ensure key has API access enabled
4. Restart dev server after changing `.env`

### Issue: Resume parsing fails
**Solution**:
1. Ensure file is valid PDF/DOCX
2. Try with a different file
3. Check browser console for errors
4. App will use mock questions if parsing fails

### Issue: Data not persisting
**Solution**:
1. Check if localStorage is enabled
2. Clear browser cache: `Ctrl+Shift+Delete`
3. Check Redux DevTools for state
4. Verify redux-persist is configured

### Issue: Port 3000 already in use
**Solution**:
```bash
# Use a different port
PORT=3001 npm start
```

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload 'build' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json:
# "homepage": "https://yourusername.github.io/crisp-interview-assistant"
npm run build
npm run deploy
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `REACT_APP_API_ENDPOINT` | OpenAI endpoint | `https://api.openai.com/v1/chat/completions` |

## Performance Tips

1. **Optimize Bundle Size**
   ```bash
   npm install -g webpack-bundle-analyzer
   npm run build
   ```

2. **Enable Code Splitting**
   - Already configured with React.lazy()

3. **Use Production Build**
   ```bash
   npm run build
   serve -s build
   ```

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use environment variables** for sensitive data
3. **Validate all inputs** - Already implemented
4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure API key
3. ✅ Run development server
4. ✅ Test interviewee flow
5. ✅ Test interviewer dashboard
6. ✅ Deploy to production

## Support & Resources

- **React Documentation**: https://react.dev
- **Redux Documentation**: https://redux.js.org
- **Ant Design**: https://ant.design
- **OpenAI API**: https://platform.openai.com/docs
- **Redux Persist**: https://github.com/rt2zz/redux-persist

---

**Happy Interviewing! 🚀**
