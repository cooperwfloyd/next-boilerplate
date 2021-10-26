const isBrowser = typeof window !== "undefined";

const setClasses = (classes: string) => {
  const htmlElement = document.documentElement;
  if(isBrowser) {
    htmlElement.className = classes;
    return true;
  } else {
    return false;
  }
}

export default setClasses;
