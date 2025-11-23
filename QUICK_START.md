# Crisp - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 min)
```bash
cd crisp-interview-assistant
npm install
```

### Step 2: Configure API Key (1 min)
1. Get key from: https://platform.openai.com/api-keys
2. Create `.env` file:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your-key-here
   ```

### Step 3: Start App (1 min)
```bash
npm start
```
Opens at: http://localhost:3000

### Step 4: Test It (1 min)
- **Interviewee Tab**: Upload a resume (or use mock data)
- **Interviewer Tab**: View completed interviews

---

## 📋 What You Get

### Interviewee Features
✅ Resume upload (PDF/DOCX)
✅ Auto-extract Name, Email, Phone
✅ 6 timed interview questions
✅ AI scoring for each answer
✅ Final score & summary
✅ Pause/Resume capability

### Interviewer Features
✅ Dashboard with all candidates
✅ Search & sort functionality
✅ Detailed candidate profiles
✅ View all Q&A with scores
✅ AI-generated summaries

### Technical Features
✅ Redux state management
✅ Local data persistence
✅ Welcome Back modal
✅ Responsive design
✅ Error handling & fallbacks

---

## 🎯 Interview Flow

```
1. Upload Resume
   ↓
2. Fill Missing Info (if needed)
   ↓
3. Answer 6 Questions (with timers)
   ↓
4. Get Score & Summary
   ↓
5. View in Dashboard
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with tabs |
| `src/components/Interviewee/` | Candidate interface |
| `src/components/Interviewer/` | Dashboard interface |
| `src/store/` | Redux state management |
| `src/services/aiService.js` | OpenAI integration |
| `src/utils/resumeParser.js` | PDF/DOCX parsing |

---

## 🔧 Available Commands

```bash
npm start      # Start dev server
npm build      # Build for production
npm test       # Run tests
npm eject      # Eject config (not recommended)
```

---

## 🐛 Troubleshooting

### Port 3000 in use?
```bash
PORT=3001 npm start
```

### API key not working?
- Check key is correct in `.env`
- Verify OpenAI account has credits
- Restart dev server after changing `.env`

### Resume parsing fails?
- Try different PDF/DOCX file
- App will use mock questions as fallback

### Data not persisting?
- Clear browser cache: `Ctrl+Shift+Delete`
- Check if localStorage is enabled

---

## 📊 Interview Questions

**6 Total Questions:**
- 2 Easy (20 seconds each)
- 2 Medium (60 seconds each)
- 2 Hard (120 seconds each)

**Scoring:**
- Each answer: 0-100
- Final score: Average of all 6
- 70+: Excellent | 50-69: Good | <50: Needs Improvement

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'build' folder to Netlify
```

---

## 📚 Documentation

- **README.md** - Full project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_SUMMARY.md** - Implementation details

---

## 💡 Tips

1. **Test with mock data first** - No API key needed
2. **Use browser DevTools** - Redux DevTools for debugging
3. **Check console** - Error messages help troubleshooting
4. **Save API key safely** - Don't commit `.env` to git

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with API key
- [ ] Dev server running (`npm start`)
- [ ] Can upload resume
- [ ] Can answer questions
- [ ] Can view dashboard
- [ ] Data persists after refresh

---

## 🎓 Next Steps

1. ✅ Get it running
2. ✅ Test interviewee flow
3. ✅ Test interviewer dashboard
4. ✅ Customize questions (in `aiService.js`)
5. ✅ Deploy to production
6. ✅ Share with team

---

## 📞 Need Help?

- Check **SETUP_GUIDE.md** for detailed instructions
- Review **PROJECT_SUMMARY.md** for architecture
- Check browser console for error messages
- Verify `.env` file has correct API key

---

**Ready to go! 🚀**

```bash
npm install && npm start
```

Then open http://localhost:3000 in your browser.
