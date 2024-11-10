import React, { useState, useEffect, useRef, useId } from "react";
import { getRandomeUser } from "../Utility/api";
import { InstructorFunc } from "./InstructorFunc";
export const CycleFuncPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });
  const [inputName, setInputName] = useState("");
  const [inputFeedback, setinputFeedback] = useState("");
  const totalRender = useRef(0);
  const id = useId();
  useEffect(() => {
    totalRender.current = totalRender.current + 1;
    console.log("render" + totalRender.current);
  });
  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomeUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomeUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    };
    if (state.studentList.length < state.studentCount) {
      getUser();
    } else if (state.studentList.length > state.studentCount) {
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [],
        };
      });
    }
  }, [state.studentCount]);

  // useEffect(() => {
  //   console.log("This will be called on EVERY Render");
  // });
  // useEffect(() => {
  //   console.log(
  //     "This will be called on whenever the value of inputName,inputFeedback changes"
  //   );
  // }, [inputName, inputFeedback]);

  // useEffect(() => {
  //   console.log("This will be called on Intitial/First Render/Mount");
  //   return () => {
  //     console.log("This will be called when component will be UNMOUNTED");
  //   };
  // }, []);

  function handleAddStudent() {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  }
  function handleRemoveAllStudent() {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  }
  function handleToggleInstructor() {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  }
  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>&nbsp;
        <i
          className={`bi bi-toggle-${
            state.hideInstructor ? "on" : "off"
          } btn btn-success btn-sm`}
          onClick={() => handleToggleInstructor()}
        ></i>
        <br />
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc Instructor={state.instructor} />
        ) : null}
      </div>
      <div className="p-3">{totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          value={inputName}
          placeholder="Name..."
          id={`${id}_inputName`}
        />
        <label htmlFor={`${id}_inputName`}>Value :</label>
        {inputName}
        <br />
        <textarea
          name=""
          placeholder="Feedback..."
          id={`${id}_inputFeedback`}
          value={inputFeedback}
          onChange={(e) => {
            setinputFeedback(e.target.value);
          }}
        ></textarea>
        <label htmlFor={`${id}_inputFeedback`}>FeedBack :</label>
        {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h-4 text-success">Students</span>
        <br />
        <div>Student Count: {state.studentCount}</div>
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleAddStudent()}
        >
          Add Student
        </button>
        &nbsp;
        <button
          className="btn-danger btn btn-sm"
          onClick={handleRemoveAllStudent}
        >
          Remove All Student
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
        <br />
      </div>
    </div>
  );
};
