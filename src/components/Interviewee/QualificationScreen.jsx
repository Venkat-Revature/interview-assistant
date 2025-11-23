import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Space, Alert, Spin } from 'antd';import { 
  CheckCircleOutlined, 
  CameraOutlined, 
  TrophyOutlined,
  RightOutlined 
} from '@ant-design/icons';
import './QualificationScreen.css';

const QualificationScreen = ({ candidateName, onProceedToInterview }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [personDetected, setPersonDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Replace the startCamera function in QualificationScreen.jsx

const startCamera = async () => {
  try {
    setLoading(true);
    
    // More flexible constraints for better compatibility
    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      },
      audio: false,
    };

    console.log('Requesting camera access...');
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    console.log('Camera stream obtained:', stream);
    
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      
      // Ensure video plays
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(err => {
          console.error('Video play error:', err);
        });
      };
      
      streamRef.current = stream;
      setCameraActive(true);
      setCameraError(null);
      
      console.log('Camera started successfully');
      
      // Simulate person detection after 2 seconds
      setTimeout(() => {
        setPersonDetected(true);
      }, 2000);
    }
  } catch (error) {
    console.error('Camera access error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    let errorMessage = 'Unable to access camera. ';
    
    if (error.name === 'NotAllowedError') {
      errorMessage += 'Camera permission denied. Please allow camera access in browser settings.';
    } else if (error.name === 'NotFoundError') {
      errorMessage += 'No camera found on your device.';
    } else if (error.name === 'NotReadableError') {
      errorMessage += 'Camera is already in use by another application.';
    } else if (error.name === 'OverconstrainedError') {
      errorMessage += 'Camera constraints not supported by your device.';
    } else if (error.name === 'TypeError') {
      errorMessage += 'getUserMedia is not supported in your browser.';
    } else {
      errorMessage += 'Please check your camera and try again.';
    }
    
    setCameraError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleProceed = () => {
    stopCamera();
    onProceedToInterview();
  };

  return (
    <div className="qualification-screen-container">
      <div className="qualification-content">
        {/* Success Banner */}
        <div className="success-banner">
          <div className="success-icon-wrapper">
            <CheckCircleOutlined className="success-icon" />
          </div>
          <h1 className="success-title">Congratulations, {candidateName}!</h1>
          <p className="success-subtitle">
            You have successfully qualified for the AI-Powered Interview Round
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="qualification-card">
          <div className="card-content">
            {/* Left Section - Camera */}
            <div className="camera-section">
              <div className="camera-header">
                <CameraOutlined className="camera-icon" />
                <h3>Identity Verification</h3>
              </div>
              
              <div className="camera-container">
                {loading ? (
                  <div className="camera-loading">
                    <Spin size="large" tip="Initializing camera..." />
                  </div>
                ) : cameraError ? (
                  <Alert
                    message="Camera Error"
                    description={cameraError}
                    type="error"
                    showIcon
                    action={
                      <Button size="small" onClick={startCamera}>
                        Retry
                      </Button>
                    }
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="camera-feed"
                    />
                    {cameraActive && (
                      <div className={`detection-overlay ${personDetected ? 'detected' : ''}`}>
                        <div className="detection-frame" />
                        {personDetected && (
                          <div className="detection-badge">
                            <CheckCircleOutlined /> Person Detected
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {personDetected && (
                <Alert
                  message="Verification Successful"
                  description="Your identity has been verified. You may proceed to the interview."
                  type="success"
                  showIcon
                  className="verification-alert"
                />
              )}
            </div>

            {/* Right Section - Interview Details */}
            <div className="details-section">
              <div className="trophy-icon-wrapper">
                <TrophyOutlined className="trophy-icon" />
              </div>
              
              <h2 className="details-title">Round 2: AI Interview</h2>
              
              <div className="interview-stats">
                <div className="stat-card">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Questions</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">~10</div>
                  <div className="stat-label">Minutes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100</div>
                  <div className="stat-label">Max Score</div>
                </div>
              </div>

              <div className="difficulty-breakdown">
                <h4>Question Difficulty</h4>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div className="difficulty-item">
                    <span className="difficulty-label">
                      <span className="dot easy-dot"></span>
                      Easy (2 questions)
                    </span>
                    <span className="time-badge">20s each</span>
                  </div>
                  <div className="difficulty-item">
                    <span className="difficulty-label">
                      <span className="dot medium-dot"></span>
                      Medium (2 questions)
                    </span>
                    <span className="time-badge">60s each</span>
                  </div>
                  <div className="difficulty-item">
                    <span className="difficulty-label">
                      <span className="dot hard-dot"></span>
                      Hard (2 questions)
                    </span>
                    <span className="time-badge">120s each</span>
                  </div>
                </Space>
              </div>

              <div className="instructions">
                <h4>Instructions</h4>
                <ul>
                  <li>Answer all questions within the time limit</li>
                  <li>Questions will be presented one at a time</li>
                  <li>Your camera will remain active during the interview</li>
                  <li>You can pause the interview if needed</li>
                </ul>
              </div>

              <Button
                type="primary"
                size="large"
                block
                icon={<RightOutlined />}
                onClick={handleProceed}
                disabled={!personDetected}
                className="proceed-button"
              >
                {personDetected ? 'Start Interview' : 'Waiting for Verification...'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-step completed">
            <div className="step-circle">✓</div>
            <span>Resume Upload</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step active">
            <div className="step-circle">2</div>
            <span>Verification</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-circle">3</div>
            <span>Interview</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationScreen;