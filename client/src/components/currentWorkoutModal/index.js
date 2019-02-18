import Modal from 'react-modal'
import React from 'react'
import { connect } from 'react-redux'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    width: '300px',
    height: '300px',
  },
}

export const CurrentWorkoutModal = ({ currentWorkout, isOpen, toggleShowCurrentWorkoutModal }) => (
  <Modal isOpen={isOpen} style={customStyles}>
    <table>
      <tr>
        <th>Exercise name</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Weight</th>
      </tr>
      {currentWorkout.map(exercise => (
        <tr>
          <td>{exercise.name}</td>
          <td>{exercise.sets}</td>
          <td>{exercise.reps}</td>
          <td>{exercise.weight}kg</td>
        </tr>
      ))}
    </table>
    <button onClick={() => toggleShowCurrentWorkoutModal()}>Close</button>
  </Modal>
)

const mapStateToProps = ({ workouts: { currentWorkout } }) => ({
  currentWorkout,
})

export default connect(mapStateToProps)(CurrentWorkoutModal)
