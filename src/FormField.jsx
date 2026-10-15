function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>{label}</label>

      {type === "textarea" ? (
        <textarea
          className="form-input"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="form-input"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default FormField;