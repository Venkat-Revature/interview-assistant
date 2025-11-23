# Crisp - AI-Powered Interview Assistant

An intelligent interview platform for evaluating Full Stack (React/Node) developers using AI-powered question generation and answer scoring.

## 🎯 Features

### Interviewee Tab
- **Resume Upload**: Upload PDF or DOCX resumes
- **Auto-Extraction**: Automatically extracts Name, Email, and Phone from resume
- **Missing Fields Collection**: Chatbot collects any missing information before starting
- **Timed Interview**: 6 questions with progressive difficulty
  - 2 Easy questions (20 seconds each)
  - 2 Medium questions (60 seconds each)
  - 2 Hard questions (120 seconds each)
- **AI Scoring**: Each answer is scored by AI (0-100)
- **Auto-Submit**: Answers automatically submit when time runs out
- **Pause/Resume**: Pause interview and resume later with "Welcome Back" modal
- **Final Summary**: AI-generated summary of candidate performance

### Interviewer Tab (Dashboard)
- **Candidate List**: View all completed interviews sorted by score
- **Search & Filter**: Search candidates by name or email
- **Detailed View**: Click on any candidate to see:
  - Profile information
  - Final score and AI summary
  - All questions, answers, and individual scores
- **Responsive Design**: Works on desktop and mobile

### Data Persistence
- **Local Storage**: All data persists using Redux + redux-persist
- **Session Recovery**: Unfinished interviews can be resumed
- **Welcome Back Modal**: Notifies users of unfinished sessions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit + redux-persist
- **UI Library**: Ant Design 5
- **PDF Parsing**: pdfjs-dist
- **DOCX Parsing**: mammoth
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **HTTP Client**: Axios
- **Unique IDs**: UUID

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (for AI features)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crisp-interview-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## 📖 Usage

### For Candidates (Interviewee Tab)
1. Click on the **Interviewee** tab
2. Upload your resume (PDF or DOCX)
3. Complete any missing profile information
4. Answer 6 interview questions within the time limits
5. View your final score and AI-generated summary
6. Start a new interview or switch to Interviewer tab

### For Interviewers (Interviewer Tab)
1. Click on the **Interviewer** tab
2. View all completed candidate interviews
3. Search or sort candidates by score
4. Click "View Details" on any candidate to see:
   - Their profile information
   - Final score and AI summary
   - All questions, answers, and scores

## 🔧 Project Structure

```
crisp-interview-assistant/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Interviewee/
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── MissingFieldsForm.jsx
│   │   │   ├── InterviewChat.jsx
│   │   │   ├── InterviewComplete.jsx
│   │   │   └── IntervieweeTab.jsx
│   │   └── Interviewer/
│   │       ├── CandidateList.jsx
│   │       └── InterviewerTab.jsx
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── candidateSlice.js
│   │       └── interviewSlice.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   └── resumeParser.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🤖 AI Integration

The app uses OpenAI's GPT-3.5-turbo model for:
- **Question Generation**: Creates 6 contextual questions for Full Stack developers
- **Answer Scoring**: Evaluates answers on a 0-100 scale with feedback
- **Summary Generation**: Creates professional summaries of candidate performance

### Fallback Mechanism
If the AI API fails, the app uses pre-defined mock questions to ensure the interview can still proceed.

## 💾 Data Storage

All data is stored locally using:
- **Redux Store**: In-memory state management
- **redux-persist**: Automatic persistence to browser localStorage
- **IndexedDB**: Optional for larger data sets

Data persisted includes:
- Candidate profiles
- Interview questions and answers
- Scores and summaries
- Interview progress and timers

## 🎨 Styling

- **Responsive Design**: Mobile-first approach
- **Ant Design Components**: Pre-built, accessible UI components
- **Custom CSS**: Additional styling for interview flow and dashboard
- **Color Scheme**: Professional blue theme with status indicators

## 🔐 Security Considerations

- API keys stored in `.env` (not committed to git)
- No sensitive data stored in localStorage
- CORS-enabled for API calls
- Input validation on all forms

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'build' folder to Netlify
```

## 📝 Environment Variables

```
REACT_APP_OPENAI_API_KEY=your-api-key
REACT_APP_API_ENDPOINT=https://api.openai.com/v1/chat/completions
```

## 🐛 Troubleshooting

### Resume parsing fails
- Ensure the PDF/DOCX file is not corrupted
- Try with a different file format
- Check browser console for detailed error messages

### AI API errors
- Verify your OpenAI API key is correct
- Check API rate limits
- Ensure sufficient API credits
- App will fall back to mock questions if API fails

### Data not persisting
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check Redux DevTools for state updates

## 📄 License

This project is part of the Swipe Internship Assignment.

## 👥 Contributing

This is an assignment project. For improvements or bug reports, please create an issue or pull request.

## 📞 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for the Swipe Internship Program**
