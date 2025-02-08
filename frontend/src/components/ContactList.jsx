import React from 'react';
import { UserCircle, MapPin, Briefcase, LinkedinIcon } from 'lucide-react';

export const ContactList = ({ analysis }) => {
  const contacts = analysis?.contacts;

  if (!contacts?.length) return null;

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-lg bg-white bg-opacity-10">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-lg">
        <h2 className="text-black text-xl flex items-center gap-2">
          Suggested Contacts
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {/* profile photo */}
        {contacts.map((contact, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">

            <div className="d-flex align-items-start">
              {/* photo */}
              <div className="text-center mx-3">
                <img
                  src={contact.photo_url}
                  alt="Profile"
                  className="rounded-circle border-secondary"
                  width="70"
                  height="70"
                />
              </div>

              {/* else */}
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contact.first_name} {contact.last_name} -
                      <small className="text-muted fst-italic"> {contact.careerPath}</small>

                      {contact.linkedin_url && (
                        <span className="mx-3">
                          <a
                            href={contact.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <LinkedinIcon className="h-6 w-6" />
                          </a>
                        </span>
                      )}

                    </h3>
                    
                    <p className="m-0 p-0">Email: {contact.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{contact.headline}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;