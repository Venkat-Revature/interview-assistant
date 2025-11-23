import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Drawer, Descriptions, Timeline, Progress, Card, Row, Col, Statistic } from 'antd';
import { SearchOutlined, EyeOutlined, TrophyOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './CandidateList.css';

const CandidateList = () => {
  const candidates = useSelector((state) => state.candidates.candidates);
  const interview = useSelector((state) => state.interview);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Debug: Log candidates to console
  console.log('Total candidates in store:', candidates.length);
  console.log('Candidates:', candidates);

  // Calculate statistics
  const completedCandidates = candidates.filter((c) => c.status === 'completed');
  const inProgressCandidates = candidates.filter((c) => c.status === 'in-progress');
  const averageScore = completedCandidates.length > 0
    ? Math.round(completedCandidates.reduce((sum, c) => sum + (c.score || 0), 0) / completedCandidates.length)
    : 0;
  const passedCandidates = completedCandidates.filter((c) => c.score >= 70).length;

  const filteredCandidates = candidates
    .filter(
      (c) =>
        c.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'score') {
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === 'date') {
        return new Date(b.createdAt || b.completedAt) - new Date(a.createdAt || a.completedAt);
      } else if (sortBy === 'status') {
        const statusOrder = { 'in-progress': 0, 'completed': 1 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'processing';
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text || 'N/A'}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score, record) => {
        if (record.status === 'in-progress') {
          return <Tag icon={<ClockCircleOutlined />} color="processing">In Progress</Tag>;
        }
        return (
          <Tag color={getScoreColor(score)}>
            {score || 0}/100
          </Tag>
        );
      },
      sorter: (a, b) => (a.score || 0) - (b.score || 0),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          icon={status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          color={getStatusColor(status)}
        >
          {status === 'completed' ? 'Completed' : 'In Progress'}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedCandidate(record);
            setDrawerVisible(true);
          }}
          size="small"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="candidate-list-container">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Total Candidates"
              value={candidates.length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Completed"
              value={completedCandidates.length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="In Progress"
              value={inProgressCandidates.length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Average Score"
              value={averageScore}
              suffix="/ 100"
              valueStyle={{ color: averageScore >= 70 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Current Interview Progress */}
      {interview.isInterviewStarted && !interview.isInterviewCompleted && (
        <Card className="current-interview-card" style={{ marginBottom: 20 }}>
          <h3>🎯 Current Interview in Progress</h3>
          <div style={{ marginTop: 15 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Question {interview.currentQuestion + 1} of {interview.questions.length}</span>
                <Tag color="processing">Active</Tag>
              </div>
              <Progress 
                percent={Math.round(((interview.currentQuestion + 1) / interview.questions.length) * 100)} 
                status="active"
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
              />
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                Time remaining: {interview.currentTimer}s | 
                Difficulty: <Tag color={
                  interview.questions[interview.currentQuestion]?.difficulty === 'easy' ? 'green' :
                  interview.questions[interview.currentQuestion]?.difficulty === 'medium' ? 'orange' : 'red'
                }>
                  {interview.questions[interview.currentQuestion]?.difficulty?.toUpperCase()}
                </Tag>
              </div>
            </Space>
          </div>
        </Card>
      )}

      <div className="list-header">
        <h2>Candidates Dashboard</h2>
        <Space wrap>
          <Input
            placeholder="Search by name or email..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              cursor: 'pointer',
            }}
          >
            <option value="score">Sort by Score</option>
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCandidates}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="candidates-table"
      />

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>Candidate Details</span>
            {selectedCandidate?.status === 'completed' && (
              <Tag color={getScoreColor(selectedCandidate.score)}>
                Score: {selectedCandidate.score}/100
              </Tag>
            )}
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={700}
      >
        {selectedCandidate && (
          <div className="candidate-details">
            <Descriptions title="Profile Information" bordered column={1}>
              <Descriptions.Item label="Name">{selectedCandidate.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedCandidate.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedCandidate.phone}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedCandidate.status)}>
                  {selectedCandidate.status === 'completed' ? 'Completed' : 'In Progress'}
                </Tag>
              </Descriptions.Item>
              {selectedCandidate.status === 'completed' && (
                <>
                  <Descriptions.Item label="Final Score">
                    <Tag color={getScoreColor(selectedCandidate.score)}>
                      {selectedCandidate.score}/100
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Completed At">
                    {new Date(selectedCandidate.completedAt).toLocaleString()}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>

            {selectedCandidate.status === 'completed' && selectedCandidate.summary && (
              <div className="summary-section">
                <h3>AI Summary</h3>
                <p>{selectedCandidate.summary}</p>
              </div>
            )}

            {selectedCandidate.status === 'completed' && selectedCandidate.questions && selectedCandidate.questions.length > 0 && (
              <div className="interview-details">
                <h3>Interview Questions & Answers</h3>
                <Timeline
                  items={(selectedCandidate.questions || []).map((q, idx) => ({
                    color: (selectedCandidate.scores || [])[idx] >= 70 ? 'green' : 
                            (selectedCandidate.scores || [])[idx] >= 50 ? 'orange' : 'red',
                    children: (
                      <div className="timeline-item">
                        <p>
                          <strong>Q{idx + 1}: {q.question}</strong>
                          <Tag 
                            color={q.difficulty === 'easy' ? 'green' : q.difficulty === 'medium' ? 'orange' : 'red'}
                            style={{ marginLeft: 10 }}
                          >
                            {q.difficulty?.toUpperCase()}
                          </Tag>
                        </p>
                        <div className="answer">
                          <strong>Answer:</strong> {(selectedCandidate.answers || [])[idx] || 'No answer provided'}
                        </div>
                        <p className="score">
                          <strong>Score:</strong> {(selectedCandidate.scores || [])[idx]}/100
                        </p>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}

            {selectedCandidate.status === 'in-progress' && (
              <div style={{ marginTop: 20, padding: 20, background: '#fff7e6', borderRadius: 8 }}>
                <p style={{ margin: 0, color: '#fa8c16' }}>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  This candidate is currently taking the interview. Check back later for results.
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CandidateList;