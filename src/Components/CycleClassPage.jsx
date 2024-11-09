import React from "react";
import { getRandomeUser } from "../Utility/api";
import Instructor from "./Instructor";
export default class CycleClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }
  //These are 3 lifecycle methods
  componentDidMount = async () => {
    console.log("Component Did Mount"); // Invoked after the render() method

    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
      //this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
    } else {
      const response = await getRandomeUser();
      //console.log(response);

      this.setState((prevState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    }
  };
  componentDidUpdate = async (previousProps, previousState) => {
    console.log("Component Did Update");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
    console.log("Old State - " + previousState.studentCount);
    console.log("New State - " + this.state.studentCount);
    if (previousState.studentCount < this.state.studentCount) {
      let getData = await getRandomeUser();
      this.setState((previousState) => {
        return {
          studentList: [
            ...previousState.studentList,
            {
              name: getData.data.first_name + " " + getData.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState((previousState) => {
        return {
          studentList: [],
        };
      });
    }
  };
  componentWillUnmount() {
    console.log("Component Will UnMount");
  }
  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };
  handleRemoveAllStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: 0,
      };
    });
  };
  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };
  render() {
    console.log("Render method"); // Invoked first

    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor</span>&nbsp;
          <i
            className={`bi bi-toggle-${
              this.state.hideInstructor ? "on" : "off"
            } btn btn-success btn-sm`}
            onClick={this.handleToggleInstructor}
          ></i>
          <br />
          {!this.state.hideInstructor && this.state.instructor ? (
            <Instructor Instructor={this.state.instructor} />
          ) : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
            value={this.state.inputName}
            placeholder="Name..."
          />
          Value : {this.state.inputName}
          <br />
          <textarea
            name=""
            placeholder="Feedback..."
            id=""
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>
          FeedBack : {this.state.inputFeedback}
        </div>
        <div className="p-3">
          <span className="h-4 text-success">Students</span>
          <br />
          <div>Student Count: {this.state.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Add Student
          </button>
          &nbsp;
          <button
            className="btn-danger btn btn-sm"
            onClick={this.handleRemoveAllStudent}
          >
            Remove All Student
          </button>
          {this.state.studentList.map((student, index) => {
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
  }
}
