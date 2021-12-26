import axios from 'axios';
import * as actions from './actions';

axios.defaults.baseURL = 'https://61c4dcf2f1af4a0017d99839.mockapi.io';

const fetchContacts = () => dispatch => {
  dispatch(actions.fetchContactRequest());
  axios
    .get('/contacts')
    .then(({ data }) => dispatch(actions.fetchContactSuccess(data)))
    .catch(error => dispatch(actions.fetchContactError(error)));
};

const addContact = (name, phone) => dispatch => {
  const contacts = { name, phone };
  dispatch(actions.addContactRequest());

  axios
    .post('/contacts', contacts)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch(error => dispatch(actions.addContactError(error)));
};

const handleDeleteContact = id => dispatch => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(actions.deleteContactSuccess(id)))
    .catch(error => dispatch(actions.deleteContactError(error)));
};

const nameFunction = { addContact, handleDeleteContact, fetchContacts };

export default nameFunction;
