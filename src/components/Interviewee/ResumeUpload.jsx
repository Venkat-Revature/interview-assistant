import React, { useState } from 'react';
import { Upload, Card, message, Spin } from 'antd';
import { InboxOutlined, FilePdfOutlined } from '@ant-design/icons';
import { extractResumeData } from '../../services/resumeService';
import { useDispatch } from 'react-redux';
import { addCandidate } from '../../store/slices/candidateSlice';
import './ResumeUpload.css';

const { Dragger } = Upload;

const ResumeUpload = ({ onResumeData }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    // Check file type
    const isPDF = file.type === 'application/pdf';
    const isDOCX = 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    if (!isPDF && !isDOCX) {
      message.error('You can only upload PDF or DOCX files!');
      return false;
    }

    // Check file size (10MB limit)
    const isLessThan10M = file.size / 1024 / 1024 < 10;
    if (!isLessThan10M) {
      message.error('File must be smaller than 10MB!');
      return false;
    }

    setUploading(true);

    try {
      // Extract resume data
      const extractedData = await extractResumeData(file);
      
      if (!extractedData) {
        throw new Error('Failed to extract resume data');
      }

      // Create candidate in store
      dispatch(addCandidate(extractedData));
      
      message.success('Resume uploaded successfully!');
      
      // Pass data to parent
      onResumeData(extractedData);
    } catch (error) {
      console.error('Error processing resume:', error);
      message.error('Error processing resume. Please try again.');
    } finally {
      setUploading(false);
    }

    // Prevent default upload behavior
    return false;
  };

  return (
    <div className="resume-upload-container">
      <Card className="upload-card">
        <div className="upload-box">
          <h2>Welcome to Crisp AI Interview</h2>
          <p>Upload your resume to get started with the interview process</p>

          <Dragger
            name="resume"
            multiple={false}
            beforeUpload={handleUpload}
            showUploadList={false}
            disabled={uploading}
            className="resume-dragger"
          >
            {uploading ? (
              <Spin size="large" tip="Processing resume..." />
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#1890ff' }} />
                </p>
                <p className="ant-upload-text">
                  Click or drag resume to this area to upload
                </p>
                <p className="ant-upload-hint">
                  <FilePdfOutlined /> Support for PDF and DOCX files only
                </p>
              </>
            )}
          </Dragger>

          <div className="upload-hint">
            <p>✓ Your resume will be analyzed to extract key information</p>
            <p>✓ All data is processed securely and stored locally</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumeUpload;