import Label from "../Label";

const Checkbox = ({id, label, value, ...props}) => {
  return (
    <>
      <input id={id} name={id} type="checkbox" value={value} {...props}/>
      <Label id={id} label={label} {...props}/>
    </>
  );
}

export default Checkbox;
