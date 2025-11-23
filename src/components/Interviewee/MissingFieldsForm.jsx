import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import './MissingFieldsForm.css';

const MissingFieldsForm = ({ resumeData, onComplete }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const missingFields = [];
  if (!resumeData.name) missingFields.push('name');
  if (!resumeData.email) missingFields.push('email');
  if (!resumeData.phone) missingFields.push('phone');

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const completeData = {
        ...resumeData,
        ...values,
      };
      onComplete(completeData);
      message.success('Profile completed! Starting interview...');
    } catch (error) {
      message.error('Error completing profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="missing-fields-container">
      <Card className="missing-fields-card">
        <h2>Complete Your Profile</h2>
        <p>We need the following information to proceed:</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={resumeData}
        >
          {missingFields.includes('name') && (
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
          )}

          {missingFields.includes('email') && (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
          )}

          {missingFields.includes('phone') && (
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input placeholder="+1 (555) 123-4567" />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Start Interview
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MissingFieldsForm;
