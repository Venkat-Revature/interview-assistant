# Crisp - Complete File Structure

## 📁 Project Directory Tree

```
crisp-interview-assistant/
│
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies and scripts
│   ├── .env                            # Environment variables (create this)
│   ├── .env.example                    # Example env file
│   └── .gitignore                      # Git ignore rules
│
├── 📄 Documentation Files
│   ├── README.md                       # Main project documentation
│   ├── SETUP_GUIDE.md                  # Detailed setup instructions
│   ├── QUICK_START.md                  # 5-minute quick start
│   ├── PROJECT_SUMMARY.md              # Implementation details
│   ├── FEATURES.md                     # Feature overview
│   └── FILE_STRUCTURE.md               # This file
│
├── 📁 public/
│   └── index.html                      # Main HTML file
��
└── 📁 src/
    │
    ├── 📁 components/
    │   │
    │   ├── 📁 Interviewee/             # Candidate interview components
    │   │   ├── ResumeUpload.jsx        # Resume file upload component
    │   │   ├── ResumeUpload.css        # Resume upload styles
    │   │   ├── MissingFieldsForm.jsx   # Collect missing information
    │   │   ├── MissingFieldsForm.css   # Missing fields form styles
    │   │   ├── InterviewChat.jsx       # Main interview interface
    │   │   ├── InterviewChat.css       # Interview chat styles
    │   │   ├── InterviewComplete.jsx   # Results and summary screen
    │   │   ├── InterviewComplete.css   # Results screen styles
    │   │   └── IntervieweeTab.jsx      # Main interviewee container
    │   │
    │   └── 📁 Interviewer/             # Interviewer dashboard components
    │       ├── CandidateList.jsx       # Candidates table and details
    │       ├── CandidateList.css       # Dashboard styles
    │       └── InterviewerTab.jsx      # Main interviewer container
    │
    ├── 📁 store/                       # Redux state management
    │   ├── store.js                    # Redux store configuration
    │   │                               # (with redux-persist setup)
    │   │
    │   └── 📁 slices/
    │       ├── candidateSlice.js       # Candidate state and actions
    │       └── interviewSlice.js       # Interview state and actions
    │
    ├── 📁 services/
    │   └── aiService.js                # OpenAI API integration
    │                                   # - generateInterviewQuestions()
    │                                   # - scoreAnswer()
    │                                   # - generateSummary()
    │                                   # - getMockQuestions()
    │
    ├── 📁 utils/
    │   └── resumeParser.js             # Resume parsing utilities
    │                                   # - extractTextFromPDF()
    │                                   # - extractTextFromDOCX()
    │                                   # - extractResumeData()
    │                                   # - parseResume()
    │
    ├── App.jsx                         # Main app component with tabs
    ├── App.css                         # App styles
    ├── index.js                        # React entry point
    └── index.css                       # Global styles
```

---

## 📊 File Count Summary

| Category | Count | Files |
|----------|-------|-------|
| **Configuration** | 4 | package.json, .env, .env.example, .gitignore |
| **Documentation** | 6 | README.md, SETUP_GUIDE.md, QUICK_START.md, PROJECT_SUMMARY.md, FEATURES.md, FILE_STRUCTURE.md |
| **React Components** | 9 | App.jsx + 8 component files |
| **Component Styles** | 6 | 6 CSS files |
| **Redux Store** | 3 | store.js + 2 slices |
| **Services** | 1 | aiService.js |
| **Utilities** | 1 | resumeParser.js |
| **HTML/CSS** | 2 | index.html, index.css |
| **Total** | **32** | **All files** |

---

## 🔍 File Descriptions

### Configuration Files

#### `package.json`
- Project metadata and version
- All npm dependencies
- Build and start scripts
- ESLint configuration

#### `.env`
- OpenAI API key
- API endpoint URL
- **Note**: Create this file and add your API key

#### `.env.example`
- Template for `.env` file
- Shows required variables
- Safe to commit to git

#### `.gitignore`
- Excludes node_modules
- Excludes .env file
- Excludes build artifacts
- Excludes IDE files

---

### Documentation Files

#### `README.md`
- Complete project overview
- Features list
- Installation instructions
- Usage guide
- Troubleshooting
- Deployment instructions

#### `SETUP_GUIDE.md`
- Step-by-step setup
- Project structure explanation
- Feature implementation details
- Troubleshooting guide
- Deployment options
- Performance tips

#### `QUICK_START.md`
- 5-minute quick start
- Essential commands
- Basic troubleshooting
- Deployment quick links

#### `PROJECT_SUMMARY.md`
- Requirements implementation checklist
- Architecture overview
- Technology stack details
- Data flow diagrams
- Security features
- Deployment readiness

#### `FEATURES.md`
- Detailed feature descriptions
- User workflows
- UI component overview
- Security features
- Performance features
- Future enhancement ideas

#### `FILE_STRUCTURE.md`
- This file
- Complete directory tree
- File descriptions
- File count summary

---

### React Components

#### Interviewee Components

**ResumeUpload.jsx**
- File upload component
- Accepts PDF/DOCX
- Calls parseResume utility
- Shows loading state
- Displays success/error messages

**MissingFieldsForm.jsx**
- Dynamic form for missing fields
- Shows only missing information
- Validates email format
- Validates required fields
- Submits complete profile

**InterviewChat.jsx**
- Main interview interface
- Displays current question
- Manages timer countdown
- Handles answer submission
- Shows progress bar
- Pause/resume functionality
- Auto-submit on timeout

**InterviewComplete.jsx**
- Results display screen
- Shows final score
- Displays AI summary
- Shows performance rating
- Option to start new interview

**IntervieweeTab.jsx**
- Main interviewee container
- Manages interview stages
- Handles resume data
- Detects unfinished sessions
- Shows Welcome Back modal

#### Interviewer Components

**CandidateList.jsx**
- Displays all candidates in table
- Search functionality
- Sort by score or date
- View details drawer
- Shows Q&A timeline
- Displays scores and summary

**InterviewerTab.jsx**
- Main interviewer container
- Renders CandidateList

---

### Component Styles

**App.css**
- Header styling
- Layout styling
- Tab styling
- Responsive design

**ResumeUpload.css**
- Upload box styling
- Drag-drop area styling
- Hint text styling

**MissingFieldsForm.css**
- Form card styling
- Input field styling
- Button styling

**InterviewChat.css**
- Interview header styling
- Timer styling
- Question display styling
- Chat messages styling
- Answer input styling
- Difficulty badges

**InterviewComplete.css**
- Results card styling
- Score display styling
- Summary section styling
- Action buttons styling

**CandidateList.css**
- Table styling
- Search bar styling
- Drawer styling
- Timeline styling
- Score badges

---

### Redux Store

#### `store.js`
- Redux store configuration
- redux-persist setup
- Middleware configuration
- Serialization checks
- Store and persistor export

#### `candidateSlice.js`
- Candidate state shape
- Actions:
  - `addCandidate()`
  - `updateCandidate()`
  - `setCurrentCandidate()`
  - `completeCandidate()`

#### `interviewSlice.js`
- Interview state shape
- Actions:
  - `initializeInterview()`
  - `submitAnswer()`
  - `moveToNextQuestion()`
  - `setTimer()`
  - `completeInterview()`
  - `pauseInterview()`
  - `resumeInterview()`
  - `resetInterview()`

---

### Services

#### `aiService.js`
- OpenAI API integration
- Functions:
  - `generateInterviewQuestions()` - Creates 6 questions
  - `scoreAnswer()` - Scores individual answers
  - `generateSummary()` - Creates professional summary
  - `getMockQuestions()` - Fallback questions

---

### Utilities

#### `resumeParser.js`
- PDF parsing with pdfjs-dist
- DOCX parsing with mammoth
- Functions:
  - `extractTextFromPDF()` - Extracts text from PDF
  - `extractTextFromDOCX()` - Extracts text from DOCX
  - `extractResumeData()` - Regex extraction
  - `parseResume()` - Main parsing function

---

### HTML & CSS

#### `index.html`
- Main HTML file
- Meta tags
- Root div for React
- Title and description

#### `index.css`
- Global styles
- Font configuration
- Body styling
- Reset styles

#### `index.js`
- React entry point
- Redux Provider setup
- PersistGate setup
- App component rendering

---

## 🔄 Component Dependencies

```
App.jsx
├── Tabs (Ant Design)
├── IntervieweeTab.jsx
│   ├── ResumeUpload.jsx
│   ├── MissingFieldsForm.jsx
│   ├── InterviewChat.jsx
│   │   ├── aiService.js
│   │   └── Redux (interview, candidates)
│   └── InterviewComplete.jsx
└── InterviewerTab.jsx
    └── CandidateList.jsx
        └── Redux (candidates, interview)
```

---

## 📦 Import Structure

```
index.js
├── store.js (Redux)
├── App.jsx
│   ├── IntervieweeTab.jsx
│   │   ├── ResumeUpload.jsx
│   │   ├── MissingFieldsForm.jsx
│   │   ├── InterviewChat.jsx
│   │   │   └── aiService.js
│   │   └─��� InterviewComplete.jsx
│   └── InterviewerTab.jsx
│       └── CandidateList.jsx
├── resumeParser.js
└── Redux slices
```

---

## 🎯 Key File Relationships

### Data Flow
```
resumeParser.js → ResumeUpload.jsx → Redux (candidates)
                                   ↓
                          MissingFieldsForm.jsx
                                   ↓
                          InterviewChat.jsx → aiService.js
                                   ↓
                          Redux (interview, candidates)
                                   ↓
                          CandidateList.jsx (Dashboard)
```

### State Management
```
Redux Store
├── candidates slice
│   ├── Used by: IntervieweeTab, CandidateList
│   └── Persisted: Yes
└── interview slice
    ├── Used by: InterviewChat, CandidateList
    └── Persisted: Yes
```

---

## 📝 File Sizes (Approximate)

| File | Size | Type |
|------|------|------|
| package.json | 1 KB | Config |
| App.jsx | 2 KB | Component |
| InterviewChat.jsx | 5 KB | Component |
| aiService.js | 4 KB | Service |
| resumeParser.js | 3 KB | Utility |
| store.js | 1 KB | Redux |
| candidateSlice.js | 2 KB | Redux |
| interviewSlice.js | 2 KB | Redux |
| CSS files | 15 KB | Styles |
| Documentation | 50 KB | Docs |
| **Total** | **~90 KB** | **All** |

---

## ✅ File Checklist

### Essential Files (Must Have)
- [x] package.json
- [x] .env (create and add API key)
- [x] public/index.html
- [x] src/index.js
- [x] src/App.jsx
- [x] src/store/store.js
- [x] src/components/Interviewee/IntervieweeTab.jsx
- [x] src/components/Interviewer/InterviewerTab.jsx

### Component Files (Must Have)
- [x] ResumeUpload.jsx
- [x] MissingFieldsForm.jsx
- [x] InterviewChat.jsx
- [x] InterviewComplete.jsx
- [x] CandidateList.jsx

### Service Files (Must Have)
- [x] aiService.js
- [x] resumeParser.js

### Redux Files (Must Have)
- [x] store.js
- [x] candidateSlice.js
- [x] interviewSlice.js

### Documentation (Recommended)
- [x] README.md
- [x] SETUP_GUIDE.md
- [x] QUICK_START.md
- [x] PROJECT_SUMMARY.md
- [x] FEATURES.md
- [x] FILE_STRUCTURE.md

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📚 Documentation Reading Order

1. **QUICK_START.md** - Get running in 5 minutes
2. **README.md** - Understand the project
3. **FEATURES.md** - Learn about features
4. **SETUP_GUIDE.md** - Detailed setup help
5. **PROJECT_SUMMARY.md** - Architecture details
6. **FILE_STRUCTURE.md** - This file

---

**All files are ready to use! 🎉**

Total: **32 files** | **~90 KB** | **Production Ready**
