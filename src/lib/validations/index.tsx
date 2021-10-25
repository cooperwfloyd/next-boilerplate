import {useState} from "react";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const messageRegex = /^[\s\S]*$/;
const nameRegex = /^\w+( +\w+)*$/;

export const bot = () => {
  return Array.from(document.querySelectorAll("[name$='__']")).map((e: any) => {
    return e.value !== "" ? true : false;
  });
}

export const dataObjectCleaner = (obj: Object | String[]) => {
  const newObj = {};

  for(const key in obj) {
    const val = obj[key];
    if(Array.isArray(obj)) {
      newObj[key] = dataObjectCleaner(val);
    } else if(!key.endsWith("__")) { // Honeypot — checks for bots
      if(val === Object(val)) {
        newObj[key] = dataObjectCleaner(val);
      } else if(val) {
        htmlDecode(val).toString() ? newObj[key] = htmlDecode(val).toString() : null;
      }
    }
  }

  return newObj;
}

export const formDataObjectCleaner = (formId: string) => {
  const formData: FormData = new FormData(document.getElementById(formId) as HTMLFormElement); // Grabs FormData from form id
  if(formData) return dataObjectCleaner(Object.fromEntries(formData.entries()));// Converts FormData to JSON and runs through the cleaner
};

export const htmlDecode = input => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export const useInput = (initialValue, validate) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      onChange: e => {
        setValue(e.target.value);
        const id = e.target.id;
        const val = e.target.value;
        const style = e.target.style;

        const inputValid = () => {
          e.target.setAttribute("aria-invalid", "false");
          if(val === "") {
            style.removeProperty("border-color");
          } else {
            style.borderColor = "var(--input-green)";
          }
        }

        const inputError = () => {
            if(val === "") {
              style.removeProperty("border-color");
              e.target.setAttribute("aria-invalid", "false");
            } else {
              style.borderColor = "var(--input-red)";
              e.target.setAttribute("aria-invalid", "true");
            }
        }

        const validateInput = validate => {
          switch(validate) {
            case("name"): return nameRegex.test(val);
            case("email"): return emailRegex.test(val);
            case("message"): return messageRegex.test(val);
          }
        }

        validateInput(validate) ? inputValid() : inputError();
      }
    }
  };
};
