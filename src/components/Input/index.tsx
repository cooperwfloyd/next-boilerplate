import Label from "../Label";

const Input = ({id, type, label, autoComplete = "on", ...params}) => {
  return (
    <>
      <Label id={id} label={label} {...params}/>
      <input id={id} name={id} type={type} autoComplete={autoComplete} {...params}/>
      
      <label style={{display: "none"}} id={id + "__"}>{label}</label>
      <input style={{display: "none"}} id={id + "__"} name={id + "__"} type={type}/>
    </>
  );
}

export default Input;
