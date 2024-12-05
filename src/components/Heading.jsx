import React from "react";

const Heading = ({ children, className }) => {
  return (
    <h1
      className={`text-xl font-extrabold ml-5 tracking-widest  text-primary ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;