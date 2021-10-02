import Label from "../Label";

export const Option = ({value, label}) => {
  return (
    <option value={value}>{label}</option>
  );
}

const Select = ({id, label, ...props}) => {
  return (
    <>
      <Label id={id} label={label} {...props}/>
      <select id={id} name={id} {...props}>
        {props.children}
      </select>
      
      <label style={{display: "none"}} htmlFor={id + "__"}>{label}</label>
      <select style={{display: "none"}} id={id + "__"} name={id + "__"} {...props}>
        {props.children}
      </select>
    </>
  );
}

export default Select;
