import React from "react";
export default class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Mounted - Instructor");
  }
  componentDidUpdate() {
    console.log("Update - Instructor");
  }
  componentWillUnmount() {
    console.log("UnMount - Instructor");
  }
  render() {
    console.log("Render - Instructor");

    return (
      <div>
        Name : {this.props.Instructor.name}
        <br />
        Email : {this.props.Instructor.email}
        <br />
        Phone : {this.props.Instructor.phone}
      </div>
    );
  }
}
