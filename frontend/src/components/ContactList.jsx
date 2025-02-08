import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export const ContactList = ({ contacts }) => {
  if (!contacts?.length) return null;

  return (
    <Card>
      <Card.Header as="h5">Suggested Contacts</Card.Header>
      <ListGroup variant="flush">
        {contacts.map((contact, index) => (
          <ListGroup.Item key={index}>
            <h6 className="mb-1">{contact.name}</h6>
            <p className="mb-1 text-muted">
              {contact.title} at {contact.company}
            </p>
            <small className="text-muted">{contact.email}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};