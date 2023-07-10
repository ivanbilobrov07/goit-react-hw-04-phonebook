import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Controlls } from 'components/Controlls';
import { Message } from 'components/Message';
import { Container, Title, FormModal } from './App.styled';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  const isFirstMount = useRef(true);

  useEffect(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem(LS_KEY));

    if (contactsFromLS) {
      setContacts(contactsFromLS);
    }
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

  const findContactByName = nameValue =>
    contacts.find(({ name }) => name === nameValue);

  const findContactByNumber = numberValue =>
    contacts.find(({ number }) => numberValue === number);

  const addContact = data => {
    const id = nanoid();
    setContacts(state => [...state, { ...data, id }]);

    toggleModal();
  };

  const editContact = data => {
    setContacts(state =>
      state.map(item => (item.id === data.id ? data : item))
    );
  };

  const removeContact = idValue => {
    setContacts(state => state.filter(({ id }) => id !== idValue));
  };

  const toggleModal = () => {
    setIsModalShown(state => !state);
  };

  const contactsToShow = getFilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <div>
        <Controlls getFilteredValue={setFilter} toggleModal={toggleModal} />

        {isModalShown && (
          <FormModal onClose={toggleModal}>
            <ContactForm
              handleContactChange={addContact}
              findContactByName={findContactByName}
              findContactByNumber={findContactByNumber}
            />
          </FormModal>
        )}
        {contactsToShow.length ? (
          <ContactList
            removeContact={removeContact}
            contacts={contactsToShow}
            editContact={editContact}
          />
        ) : (
          <Message text="There are no contacts here" />
        )}
      </div>
    </Container>
  );
};
