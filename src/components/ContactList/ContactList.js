import { PropTypes } from 'prop-types';
import s from './ContactList.module.css';
import { connect } from 'react-redux';
import nameFunction from '../../redux/operations';
import { useEffect } from 'react';

const ContactList = ({ contacts, handleDelete, fetchContacts }) => {
  useEffect(() => {
    console.log(123);
    fetchContacts();
  }, [fetchContacts]);

  const contactsList = contacts.map(({ id, name, phone }) => (
    <li key={id} className={s.item}>
      <div>
        <span>
          {name}: {phone}
        </span>
        <button
          className={s.btn}
          id={id}
          type="button"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  ));

  return <ul>{contactsList}</ul>;
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const getFilteredContacts = (contact, filter) => {
  return contact.filter(text =>
    text.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const mapStateToProps = ({ item: { contacts, filter } }) => ({
  contacts: getFilteredContacts(contacts, filter),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(nameFunction.fetchContacts()),
  handleDelete: id => dispatch(nameFunction.handleDeleteContact(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
