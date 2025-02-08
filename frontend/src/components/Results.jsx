import React from "react";

function Results({ result }) {
  return (
    <div>
      <h2>Suggested Career: {result.career_field}</h2>
      <h3>Contacts:</h3>
      <ul>
        {result.contacts.map((contact, index) => (
          <li key={index}>{contact.name} - {contact.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
