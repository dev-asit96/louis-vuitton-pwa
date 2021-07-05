import React, { createContext } from "react";

export const NameContext = createContext();

const NameProvider = (props) => {
  var name = "Hi User!";

  return (
    <NameContext.Provider value={name}>{props.children}</NameContext.Provider>
  );
};
export default NameProvider;
