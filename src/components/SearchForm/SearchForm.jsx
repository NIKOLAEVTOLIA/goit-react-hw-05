import { Formik, Form, Field } from 'formik';
import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.query);
        resetForm();
      }}
    >
      <Form className={css.searchForm}>
        <Field type="text" name="query" placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
