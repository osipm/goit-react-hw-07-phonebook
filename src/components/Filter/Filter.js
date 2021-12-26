import { PropTypes } from 'prop-types';
import s from './Filter.module.css';
import { connect } from 'react-redux';
import * as Contact from '../../redux/actions';

function Filter({ filter, onHandleChange }) {
  return (
    <label className={s.label}>
      Find contacts by name:
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onHandleChange}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filter: state.item.filter,
});

const mapDispatchToProps = dispatch => ({
  onHandleChange: e => dispatch(Contact.filter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};
