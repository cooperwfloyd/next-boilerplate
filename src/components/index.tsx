import {useEffect, useState} from "react";
import setPageClasses from "../scripts/setPageClasses";

const Global = props => {
  const [checkPageClasses, setCheckPageClasses] = useState(false);

  useEffect(() => {
    props.className && setCheckPageClasses(setPageClasses(props.className));
    document.title = props.documentTitle ? `${props.documentTitle} | ${process.env.orgName}` : process.env.orgName;
  }, [props.className, props.documentTitle]);

  return props.className ? checkPageClasses && props.children : props.children;
}

export default Global;
