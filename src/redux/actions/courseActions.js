import * as types from "./actionTypes";

//this is an action creator because it creates an action
//must have a type
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
