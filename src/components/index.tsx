import {useEffect, useState} from "react";
import setPageClasses from "../scripts/setPageClasses";

const Global = props => {
  const [checkPageClasses, setCheckPageClasses] = useState(false);

  useEffect(() => {
    props.className && setCheckPageClasses(setPageClasses(props.className));
  }, [props.className]);

  return props.className ? checkPageClasses && props.children : props.children;
}

export default Global;
