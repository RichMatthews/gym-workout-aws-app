import React from 'react'
import { Field, FieldArray, Form, Formik } from 'formik'
import styled from 'styled-components'
import { Button } from 'components/shared/button'

const RepsAndSetsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    padding-top: 25px;
  }
`

const StyledField = styled(Field)`
  width: 34px;
  height: 34px;
  font-size: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
  border: 1px solid white;
  color: white;
  background: #2b2b29;
  border-radius: 20px;
  outline: none;
`

const WeightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledButton = styled(Button)`
  padding: 5px;
  width: 40%;
`

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

export const AddExercise = ({
  addExerciseToCurrentWorkout,
  exerciseData,
  cancelAddingWorkout,
}) => (
  <Formik
    initialValues={{}}
    onSubmit={values => {
      const exerciseName = exerciseData.current.name
      const mergeValues = { exerciseName, ...values }
      addExerciseToCurrentWorkout(mergeValues)
    }}
    render={() => (
      <StyledOuterForm>
        <FieldArray
          name="workouts"
          render={() => (
            <StyledInnerForm>
              <WeightSection>
                <RepsAndSetsSection>
                  <StyledField name={`sets`} />
                  <div>sets</div>
                </RepsAndSetsSection>
                <RepsAndSetsSection>
                  <StyledField name={`reps`} />
                  <div>reps</div>
                </RepsAndSetsSection>
                <RepsAndSetsSection>
                  <StyledField name={`weight`} />
                  <div>kg</div>
                </RepsAndSetsSection>
              </WeightSection>
              <ButtonSection>
                <StyledButton
                  onClick={() => cancelAddingWorkout()}
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
)
