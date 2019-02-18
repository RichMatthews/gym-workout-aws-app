import { Field, FieldArray, Form, Formik } from 'formik'
import React, { Component } from 'react'

import { Button } from 'components/shared/button'
import CurrentWorkoutModal from 'components/currentWorkoutModal'
import Modal from 'react-modal'
import PreviousWorkouts from 'components/previousWorkouts'
import Search from 'components/search'
import { addExerciseToCurrentWorkout } from 'redux/action-creators/exercises'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toggleModal } from 'redux/action-creators/modal'

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Section = styled.div`
  width: 100%;
`

const StyledField = styled(Field)`
  width: 34px;
  height: 34px;
  font-size: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
`

const StyledOuterForm = styled(Form)`
  height: 100%;
`

const StyledInnerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const RepsAndSetsSection = styled.div`
  display: flex;
  flex-direction: row;
  > span {
    padding-top: 25px;
  }
`

const WeightSection = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledButton = styled(Button)`
  padding: 5px;
  width: 40%;
`

class Main extends Component {
  state = {
    exercises: [],
    showCurrentWorkoutModal: false,
  }

  componentDidMount() {
    axios.get('http://34.239.110.214:5000/exercises').then(data => {
      data.data.map(exercise => {
        this.setState({
          exercises: this.state.exercises.concat({
            value: exercise.name,
            label: exercise.name,
          }),
        })
      })
    })
  }

  toggleShowCurrentWorkoutModal = () => {
    this.setState({
      showCurrentWorkoutModal: !this.state.showCurrentWorkoutModal,
    })
  }

  render() {
    return (
      <Container>
        <div>
          <button onClick={() => this.toggleShowCurrentWorkoutModal()}>
            view current workout
          </button>
          {this.state.showCurrentWorkoutModal ? (
            <CurrentWorkoutModal
              toggleShowCurrentWorkoutModal={this.toggleShowCurrentWorkoutModal}
              isOpen={this.state.showCurrentWorkoutModal}
            />
          ) : null}
        </div>

        <Modal
          isOpen={this.props.exerciseModal.isOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Formik
            initialValues={{}}
            onSubmit={values => {
              const exerciseName = this.props.exerciseData.current.name
              const mergeValues = { exerciseName, ...values }
              this.props.addExerciseToCurrentWorkout(mergeValues)
            }}
            render={() => (
              <StyledOuterForm>
                <FieldArray
                  name="workouts"
                  render={() => (
                    <StyledInnerForm>
                      <field name={`name`}>
                        <h2>
                          {this.props.exerciseData.current.name || 'Error'}
                        </h2>
                      </field>
                      <RepsAndSetsSection>
                        <StyledField name={`sets`} />
                        <span>X</span>
                        <StyledField name={`reps`} />
                      </RepsAndSetsSection>
                      <WeightSection>
                        <StyledField name={`weight`} />
                      </WeightSection>
                      <ButtonSection>
                        <StyledButton
                          onClick={() => this.props.toggleModal()}
                          type="submit"
                          text="Cancel"
                        />
                        <StyledButton type="submit" text="Add exercise" />
                      </ButtonSection>
                    </StyledInnerForm>
                  )}
                />
              </StyledOuterForm>
            )}
          />
        </Modal>
        <Search exercises={this.state.exercises} />
        <Section>
          <PreviousWorkouts />
        </Section>
      </Container>
    )
  }
}

const mapStateToProps = ({ exerciseData, exerciseModal }) => ({
  exerciseData,
  exerciseModal,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addExerciseToCurrentWorkout, toggleModal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
