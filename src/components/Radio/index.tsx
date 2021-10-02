const Radio = ({name, label, value, id = value, ...props}) => {
  return (
    <div className="radio-option">
      <label htmlFor={id}>
        <input id={id} name={name} type="radio" value={value} {...props}/>
        <span className="indicator"></span>
        {label}
      </label>
    </div>
  );
}

export default Radio;
