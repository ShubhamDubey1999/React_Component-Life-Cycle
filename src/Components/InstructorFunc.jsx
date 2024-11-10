import React from "react";
export const InstructorFunc = ({ Instructor }) => {
  return (
    <div>
      Name : {Instructor.name}
      <br />
      Email : {Instructor.email}
      <br />
      Phone : {Instructor.phone}
    </div>
  );
};
