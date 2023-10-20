import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [contactName, setContactName] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/contacts')
      .then((response) => response.json())
      .then((data) => {
        setContactName(data.name); 
      })
      .catch((error) => {
        console.error('ERROR:', error);
      });
  }, []);

  const handleCreateContactClick = () => {
    if (contactName.trim() !== '') {
      fetch('http://localhost/api/contacts', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: contactName}),
      })
        .then((response) => response.json()) // 
        .then((data) => {
          setContacts([...contacts, data]);
        })
        .catch((error) => {
          console.error('ERROR', error);
        });
      setContactName('');
    }
  };

  const handleDeleteContact = (contactIndex) => {
    console.log(contacts); // Add this line for debugging
    const contact = contacts[contactIndex]; // Get the contact you want to delete
    const contactId = contact.id; // Get the contact's ID
    fetch(`http://localhost/api/contacts/${contact.id}`, {
      method: 'DELETE', 
    })
      .then(() => {
        const newContacts = [...contacts];
        newContacts.splice(contactIndex, 1);
        setContacts(newContacts);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };
  
  

  const handleAddInfo = (contactIndex) => {
    const newContacts = [...contacts];
    if (newContacts[contactIndex] && newContacts[contactIndex].name.trim() !== '') {
      newContacts[contactIndex].names.push(newContacts[contactIndex].name);
      newContacts[contactIndex].phoneNumbers.push(newContacts[contactIndex].phoneNumber);
      newContacts[contactIndex].name = ''; // Reset the name input
      newContacts[contactIndex].phoneNumber = ''; // Reset the phone number input
      setContacts(newContacts);
    }
  };
  
  
  const handleDeleteEntry = (contactIndex, entryIndex) => {
    const newContacts = [...contacts];
    newContacts[contactIndex].names.splice(entryIndex, 1);
    newContacts[contactIndex].phoneNumbers.splice(entryIndex, 1);
    setContacts(newContacts);
  };

   
  return (
    <div>
      <h1 className="centered">Contactor</h1>
      <h2 className="centered">Get Started</h2>
      <h2 className="centered">hello</h2>

      <div className="container">
        <h1 className="centered">Contacts</h1>
        <input
          type="text"
          placeholder="Enter Name of contact here"
          size="50"
          className="input-box"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <button className="my-button" onClick={handleCreateContactClick}>
          Create Contact
        </button>
      </div>

      <div className="container2">
        {contacts.map((contact, contactIndex) => (
          <div key={contactIndex} className="contact-container">
            <div className="title-delete-container">
              <p className="title">{contact.name}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteContact(contactIndex)}>
                Delete Contact
              </button>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                className="input-box2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="input-box2"
              />
              <button className="add-button">
                Add
              </button>
            </div>
            <div className="contact-details">
              <div>
                <div className="name"></div>
                <div className="phone-number"></div>
                <button className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;