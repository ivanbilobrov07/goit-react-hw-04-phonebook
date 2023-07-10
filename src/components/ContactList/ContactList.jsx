import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import {
  Table,
  TableRow,
  TableTitleCell,
  TableHeader,
} from './ContactList.styled';
import { FormModal } from 'components/App/App.styled';
import { ContactForm } from 'components/ContactForm';
import { ContactItem } from 'components/ContactItem';

export const ContactList = ({ contacts, removeContact, editContact }) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    closeModal();
  }, [contacts]);

  const openModal = id => {
    setIsEditModalShown(true);
    setEditItemId(id);
  };

  const closeModal = () => {
    setIsEditModalShown(false);
  };

  const findContactByName = nameValue => {
    return contacts.find(contact => {
      return nameValue === contact.name && contact.id !== editItemId;
    });
  };

  const findContactByNumber = numberValue => {
    return contacts.find(contact => {
      return numberValue === contact.number && contact.id !== editItemId;
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <th>Names</th>
            <th>Phone Number</th>
            <TableTitleCell>Edit</TableTitleCell>
            <TableTitleCell>Delete</TableTitleCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {contacts.map(({ name, number, id }) => (
            <TableRow key={id}>
              <ContactItem
                removeContact={() => removeContact(id)}
                id={id}
                name={name}
                number={number}
                openModal={openModal}
              />
            </TableRow>
          ))}
        </tbody>
      </Table>
      {isEditModalShown && (
        <FormModal onClose={closeModal}>
          <ContactForm
            handleContactChange={editContact}
            findContactByName={findContactByName}
            findContactByNumber={findContactByNumber}
            initialValues={contacts.find(({ id }) => id === editItemId)}
          />
        </FormModal>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func.isRequired,
};
