import React from 'react';
import { Card, Button, Result, Statistic, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './InterviewComplete.css';

const InterviewComplete = ({ score, summary, candidateName, onNewInterview }) => {
  return (
    <div className="interview-complete-container">
      <Card className="complete-card">
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: '48px' }} />}
          title="Interview Completed!"
          subTitle="Thank you for completing the interview. Your results are below."
        />

        <div className="results-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Statistic
                title="Final Score"
                value={score}
                suffix="/ 100"
                valueStyle={{ color: score >= 70 ? '#52c41a' : score >= 50 ? '#faad14' : '#ff4d4f' }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Statistic
                title="Status"
                value={score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Improvement'}
                valueStyle={{ color: score >= 70 ? '#52c41a' : score >= 50 ? '#faad14' : '#ff4d4f' }}
              />
            </Col>
          </Row>

          <div className="summary-section">
            <h3>AI Summary</h3>
            <p>{summary}</p>
          </div>

          <div className="action-section">
            <Button type="primary" size="large" onClick={onNewInterview} block>
              Start New Interview
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InterviewComplete;
