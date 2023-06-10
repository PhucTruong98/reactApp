import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import { useState } from "react";

//this is destructuring the prop into other vars, ...props is
//assigning the name of the rest to props
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  history,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      //
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }

    console.log("this is courses data", courses);
  }, [props.course]);

  function handleChange(event) {
    //this is destructuring the event
    const { name, value } = event.target;
    //setState can take in either an object or function
    //prevCourse is course before the change
    //if name of the changed field is authorid, convert it
    //before assigning, otherwise, update the change
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    //prevent the page from reloading
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }
  return (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
      ></CourseForm>
    </>
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    courses: state.courses,
    authors: state.authors,
    course: course,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
