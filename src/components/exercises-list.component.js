import axios from "axios";
import { useState, useEffect } from "react";
import Exercise from "./Exercise";

export default function ExercisesList() {
  const [state, setState] = useState({ exercises: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        setState({ exercises: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((res) => {
      console.log(res.data);
    });
    setState({
      exercises: state.exercises.filter((exercise) => exercise._id !== id),
    });
  }

  function exerciseList() {
    return state.exercises.map((exercise) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={deleteExercise}
          key={exercise}
        />
      );
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}
