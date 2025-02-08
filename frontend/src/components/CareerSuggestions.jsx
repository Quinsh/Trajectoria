import React from 'react';
import { Card } from 'react-bootstrap';

export const CareerSuggestions = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Suggested Career Paths</Card.Header>
      <Card.Body>
        <Card.Text className="white-space-pre-wrap">
          {analysis}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};