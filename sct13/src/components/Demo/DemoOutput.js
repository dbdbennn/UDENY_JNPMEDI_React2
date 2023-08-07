import React from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
    console.log('DEMOOUtpUT');
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

// this makes that React will not re-evaluating this component and it's children
// great tool if u have huge component tree u can avoid unnecessary re-evaluation for entire branch
export default React.memo(DemoOutput);
