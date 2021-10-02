import Label from "../Label";

const Textarea = ({id, label, ...params}) => {
  return (
    <>
      <Label id={id} label={label} {...params}/>
      <textarea id={id} name={id} {...params}></textarea>
      
      <label style={{display: "none"}} id={id + "__"}>{label}</label>
      <textarea style={{display: "none"}} id={id + "__"} name={id + "__"}></textarea>
    </>
  );
}

export default Textarea;
