import React from "react";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  //make sure we use arrow function here so that we can bind to the right context
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(this.state.course.title);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Course</h2>
        <h3>Add Courses</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input>
      </form>
    );
  }
}

export default CoursesPage;
