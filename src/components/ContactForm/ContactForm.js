import React, { useState } from 'react';
import s from './ContactForm.module.css';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import nameFunction from '../../redux/operations';

function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in the contacts`);
      return contacts;
    }
    onSubmit(name, number);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя"
          onChange={handleChange}
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона"
          onChange={handleChange}
          required
        />
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  contacts: state.item.contacts,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(nameFunction.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

// ContactForm.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       // number: PropTypes.string.isRequired,
//     }).isRequired,
//   ).isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };
