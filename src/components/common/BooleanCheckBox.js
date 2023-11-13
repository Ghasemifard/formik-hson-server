const BooleanCheckBox = ({ formik, name,label }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        id={name}
        name={name}
        value={true}
        onChange={formik.handleChange}
        checked={formik.values[name]}
      />
      <label htmlFor={name}>{label}</label>
      {formik.errors[name] && formik.values[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default BooleanCheckBox;
