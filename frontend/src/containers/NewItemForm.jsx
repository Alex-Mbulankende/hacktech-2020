import { connect } from 'react-redux';
import { withFormik } from 'formik';

import NewItemForm from '../components/NewItemForm';
import { postListing } from '../actions/ebayActions';
import { getStats } from '../actions/statsActions';

const NewItemFormContainer = withFormik({
  mapPropsToValues() {
    return {
      title: '',
      location: '',
      description: '',
      picture_url: '',
      price: '',
      category: 0,
    };
  },
  handleSubmit(values, { resetForm,  props }) {
    console.log(values);
    props.postListing(values);
    props.getStats();
  },
})(NewItemForm);

export default connect(
  null,
  { postListing }
)(NewItemFormContainer);
