const Label = ({id, label, ...params}) => {
  return params.required
    ? <label htmlFor={id} className="required" {...params}>{label}</label>
    : <label htmlFor={id} {...params}>{label}</label>;
}

export default Label;
