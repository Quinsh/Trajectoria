import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { analyzeResume } from '../api.js';

export const ResumeUpload = ({ onAnalysis }) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)

    try {
      const response = await analyzeResume(file);
      onAnalysis(response);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="text-center">
      <Card.Body className="p-5">
        <Form.Group controlId="resume-upload" className="mb-0">
          <Form.Label className="w-100 cursor-pointer mb-0">
            <Upload className="mb-3" size={48} />
            <p className="mb-2">
              {loading ? 'Analyzing...' : 'Drop your resume here or click to upload'}
            </p>
            <p className="text-muted small">Supported format: PDF</p>
          </Form.Label>
          <Form.Control
            type="file"
            className="d-none"
            onChange={handleFileUpload}
            accept=".pdf"
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};
