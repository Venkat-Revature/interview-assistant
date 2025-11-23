/**
 * AI Service for Interview Assistant
 * Handles AI-powered question generation, answer scoring, and summary generation
 */

const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Mock questions for fallback when AI API is not available
 */
export const getMockQuestions = () => [
  {
    question: 'What is the difference between var, let, and const in JavaScript?',
    difficulty: 'easy',
    timeLimit: 20,
  },
  {
    question: 'Explain the concept of closures in JavaScript with an example.',
    difficulty: 'easy',
    timeLimit: 20,
  },
  {
    question: 'What are React Hooks and why were they introduced? Explain useState and useEffect.',
    difficulty: 'medium',
    timeLimit: 60,
  },
  {
    question: 'Explain the difference between SQL and NoSQL databases. When would you use each?',
    difficulty: 'medium',
    timeLimit: 60,
  },
  {
    question: 'Design a RESTful API for a blog application. Include endpoints for posts, comments, and user authentication.',
    difficulty: 'hard',
    timeLimit: 120,
  },
  {
    question: 'Explain how you would optimize the performance of a React application. Discuss at least 5 different techniques.',
    difficulty: 'hard',
    timeLimit: 120,
  },
];

/**
 * Generate interview questions using AI
 */
export const generateInterviewQuestions = async (candidateProfile) => {
  // If no API key, return mock questions
  if (!API_KEY) {
    console.warn('No AI API key configured, using mock questions');
    return {
      success: true,
      questions: getMockQuestions(),
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `Generate 6 interview questions for a Full Stack Developer (React/Node.js) position.
            
Candidate Profile:
- Name: ${candidateProfile.name}
- Email: ${candidateProfile.email}

Requirements:
- 2 Easy questions (fundamental concepts)
- 2 Medium questions (practical application)
- 2 Hard questions (system design, optimization)

Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here",
    "difficulty": "easy",
    "timeLimit": 20
  }
]

Time limits: Easy=20s, Medium=60s, Hard=120s
Make questions specific, practical, and relevant to full stack development.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        questions: questions,
      };
    }

    // Fallback to mock questions
    return {
      success: false,
      questions: getMockQuestions(),
    };
  } catch (error) {
    console.error('Error generating questions:', error);
    return {
      success: false,
      questions: getMockQuestions(),
    };
  }
};

/**
 * Score an answer using AI
 */
export const scoreAnswer = async (question, answer, difficulty) => {
  // If no API key, return mock score
  if (!API_KEY) {
    return {
      success: true,
      score: getMockScore(answer, difficulty),
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `Score this interview answer on a scale of 0-100.

Question: ${question}
Difficulty: ${difficulty}
Answer: ${answer}

Evaluation Criteria:
- Technical accuracy (40%)
- Completeness (30%)
- Clarity of explanation (20%)
- Practical examples (10%)

Return ONLY a number between 0 and 100. Nothing else.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const scoreText = data.content[0].text.trim();
    const score = parseInt(scoreText.match(/\d+/)?.[0] || '0');

    return {
      success: true,
      score: Math.min(100, Math.max(0, score)),
    };
  } catch (error) {
    console.error('Error scoring answer:', error);
    return {
      success: false,
      score: getMockScore(answer, difficulty),
    };
  }
};

/**
 * Generate a summary of the interview
 */
export const generateSummary = async (candidateProfile, answers, scores) => {
  // If no API key, return mock summary
  if (!API_KEY) {
    return {
      success: true,
      summary: getMockSummary(scores),
    };
  }

  try {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `Generate a concise interview summary (2-3 sentences) for this candidate.

Candidate: ${candidateProfile.name}
Average Score: ${avgScore.toFixed(1)}/100
Individual Scores: ${scores.join(', ')}

Focus on:
1. Overall performance level
2. Key strengths observed
3. Areas for improvement (if any)

Keep it professional and constructive.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const summary = data.content[0].text.trim();

    return {
      success: true,
      summary: summary,
    };
  } catch (error) {
    console.error('Error generating summary:', error);
    return {
      success: false,
      summary: getMockSummary(scores),
    };
  }
};

/**
 * Mock scoring logic when AI is not available
 */
const getMockScore = (answer, difficulty) => {
  if (!answer || answer.trim().length === 0) {
    return 0;
  }

  const wordCount = answer.trim().split(/\s+/).length;
  let baseScore = 0;

  // Score based on word count and difficulty
  if (difficulty === 'easy') {
    if (wordCount >= 30) baseScore = 80;
    else if (wordCount >= 15) baseScore = 60;
    else if (wordCount >= 5) baseScore = 40;
    else baseScore = 20;
  } else if (difficulty === 'medium') {
    if (wordCount >= 50) baseScore = 75;
    else if (wordCount >= 30) baseScore = 55;
    else if (wordCount >= 15) baseScore = 35;
    else baseScore = 20;
  } else {
    if (wordCount >= 100) baseScore = 70;
    else if (wordCount >= 50) baseScore = 50;
    else if (wordCount >= 25) baseScore = 30;
    else baseScore = 15;
  }

  // Add randomness for variety
  const variance = Math.floor(Math.random() * 10) - 5;
  return Math.min(100, Math.max(0, baseScore + variance));
};

/**
 * Mock summary generation when AI is not available
 */
const getMockSummary = (scores) => {
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (avgScore >= 70) {
    return 'Excellent performance demonstrated strong technical knowledge across all difficulty levels. The candidate showed good problem-solving skills and clear communication. Recommended for next round.';
  } else if (avgScore >= 50) {
    return 'Good overall performance with solid understanding of fundamental concepts. Some areas need improvement, particularly in complex problem-solving. Consider for next round with additional technical assessment.';
  } else {
    return 'The candidate showed basic understanding but struggled with more complex questions. Further technical training recommended before advancing. Areas of improvement include depth of knowledge and practical application.';
  }
};

const aiService = {
  generateInterviewQuestions,
  scoreAnswer,
  generateSummary,
  getMockQuestions,
};

export default aiService;