import React, { useState } from 'react';
import { Tabs, Layout } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import IntervieweeTab from './components/Interviewee/IntervieweeTab';
import InterviewerTab from './components/Interviewer/InterviewerTab';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const [activeTab, setActiveTab] = useState('interviewee');

  const items = [
    {
      key: 'interviewee',
      label: (
        <span>
          <UserOutlined />
          Interviewee
        </span>
      ),
      children: <IntervieweeTab />,
    },
    {
      key: 'interviewer',
      label: (
        <span>
          <TeamOutlined />
          Interviewer
        </span>
      ),
      children: <InterviewerTab />,
    },
  ];

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <h1>Crisp - AI Interview Assistant</h1>
          {/*<p>Intelligent Interview Platform for Full Stack Developers</p> */}
        </div>
      </Header>
      <Content className="app-content">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          size="large"
          className="main-tabs"
        />
      </Content>
    </Layout>
  );
}

export default App;
