import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Button, Input, Progress, message, Modal, Spin } from 'antd';
import { SendOutlined, PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeInterview,
  submitAnswer,
  moveToNextQuestion,
  setTimer,
  completeInterview,
  pauseInterview,
  resumeInterview,
} from '../../store/slices/interviewSlice';
import { generateInterviewQuestions, scoreAnswer, generateSummary, getMockQuestions } from '../../services/aiService';
import './InterviewChat.css';

const InterviewChat = ({ candidateProfile, onInterviewComplete }) => {
  const dispatch = useDispatch();
  const interview = useSelector((state) => state.interview);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize interview on mount
  useEffect(() => {
    const initializeInterviewQuestions = async () => {
      setLoading(true);
      try {
        // Try to use AI API, fallback to mock questions
        const result = await generateInterviewQuestions(candidateProfile);
        const questions = result.success ? result.questions : getMockQuestions();
        dispatch(initializeInterview(questions));
      } catch (error) {
        console.error('Error initializing interview:', error);
        dispatch(initializeInterview(getMockQuestions()));
      } finally {
        setLoading(false);
      }
    };

    if (!interview.isInterviewStarted) {
      initializeInterviewQuestions();
    }
  }, [candidateProfile, dispatch, interview.isInterviewStarted]);

  const finalizeInterview = useCallback(async () => {
    try {
      const totalScore = interview.scores.reduce((a, b) => a + b, 0) / interview.scores.length;
      const summaryResult = await generateSummary(candidateProfile, interview.answers, interview.scores);
      const summary = summaryResult.success ? summaryResult.summary : 'Interview completed.';

      dispatch(completeInterview());
      onInterviewComplete({
        score: Math.round(totalScore),
        summary: summary,
      });
    } catch (error) {
      message.error('Error finalizing interview');
    }
  }, [candidateProfile, dispatch, interview.answers, interview.scores, onInterviewComplete]);

  const submitAnswerToAI = useCallback(async (userAnswer) => {
    setLoading(true);
    try {
      const currentQ = interview.questions[interview.currentQuestion];
      const scoreResult = await scoreAnswer(currentQ.question, userAnswer, currentQ.difficulty);
      let score = 0;
      if (userAnswer && userAnswer.trim().length > 0 && scoreResult.success) {
        // Clamp to [0, 100]
        const raw = Number(scoreResult.score);
        score = Math.max(0, Math.min(100, isNaN(raw) ? 0 : raw));
      } // else keep 0 for empty/invalid answers

      dispatch(
        submitAnswer({
          questionIndex: interview.currentQuestion,
          answer: userAnswer,
          score: score,
        })
      );

      setAnswer('');

      if (interview.currentQuestion + 1 < interview.questions.length) {
        dispatch(moveToNextQuestion());
      } else {
        // Interview complete
        await finalizeInterview();
      }
    } catch (error) {
      message.error('Error submitting answer');
    } finally {
      setLoading(false);
    }
  }, [dispatch, finalizeInterview, interview.currentQuestion, interview.questions]);

  // Timer effect
  useEffect(() => {
    if (!interview.isInterviewStarted || interview.isPaused || interview.isInterviewCompleted) {
      return;
    }

    const autoSubmit = async () => {
      if (interview.currentQuestion < interview.questions.length) {
        await submitAnswerToAI(answer || '[No answer provided]');
      }
    };

    const timer = setInterval(() => {
      dispatch(setTimer(interview.currentTimer - 1));

      if (interview.currentTimer - 1 <= 0) {
        autoSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [answer, dispatch, interview.currentQuestion, interview.currentTimer, interview.isInterviewCompleted, interview.isInterviewStarted, interview.isPaused, interview.questions.length, submitAnswerToAI]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interview.currentQuestion]);

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      message.warning('Please provide an answer');
      return;
    }
    submitAnswerToAI(answer);
  };

  const handlePause = () => {
    dispatch(pauseInterview());
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setShowPauseModal(false);
    dispatch(resumeInterview());
  };

  if (loading && interview.questions.length === 0) {
    return <Spin size="large" tip="Initializing interview..." />;
  }

  if (interview.isInterviewCompleted) {
    return null;
  }

  const currentQuestion = interview.questions[interview.currentQuestion];
  const progress = ((interview.currentQuestion + 1) / interview.questions.length) * 100;

  return (
    <div className="interview-chat-container">
      <Card className="interview-card">
        <div className="interview-header">
          <div className="progress-section">
            <span>Question {interview.currentQuestion + 1} of {interview.questions.length}</span>
            <Progress percent={progress} status={interview.currentTimer <= 10 ? 'exception' : 'active'} />
          </div>
          <div className="timer-section">
            <span className={`timer ${interview.currentTimer <= 10 ? 'warning' : ''}`}>
              {interview.currentTimer}s
            </span>
            <Button
              icon={interview.isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
              onClick={handlePause}
              danger={!interview.isPaused}
            >
              {interview.isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
        </div>

        <div className="question-section">
          <h3>Question {interview.currentQuestion + 1}</h3>
          <p className="question-text">{currentQuestion?.question}</p>
          <span className={`difficulty ${currentQuestion?.difficulty}`}>
            {currentQuestion?.difficulty.toUpperCase()}
          </span>
        </div>

        <div className="chat-messages">
          <div className="message bot-message">
            <p>{currentQuestion?.question}</p>
          </div>
          {interview.answers[interview.currentQuestion] && (
            <div className="message user-message">
              <p>{interview.answers[interview.currentQuestion]}</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="answer-input-section">
          <Input.TextArea
            rows={4}
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={interview.isPaused || loading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmitAnswer}
            loading={loading}
            disabled={interview.isPaused}
            block
            size="large"
          >
            Submit Answer
          </Button>
        </div>
      </Card>

      <Modal
        title="Interview Paused"
        open={showPauseModal}
        onOk={handleResume}
        onCancel={handleResume}
        okText="Resume"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Your interview has been paused. Click "Resume" to continue.</p>
      </Modal>
    </div>
  );
};

export default InterviewChat;
