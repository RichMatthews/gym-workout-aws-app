import { Field, FieldArray, Form, Formik } from 'formik'

import { Button } from 'components/shared/button'
import React from 'react'
import Select from 'react-select'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import redcross from 'assets/redcross.png'
import styled from 'styled-components'
import { submitWorkout } from 'redux/action-creators/workouts'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #e7e7e7;
  padding: 3px;
  margin-bottom: 10px;
`

const RedCrossContainer = styled.div`
  object-fit: contain;
  width: 15px;
  height: 15px;
`

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`

const RedCross = styled.img`
  width: 100%;
  height: 100%;
`

const StyledButton = styled(Button)`
  height: 34px;
`

const StyledField = styled(Field)`
  width: 34px;
  height: 34px;
  font-size: 10px;
  text-align: center;
  padding: 0;
`

export const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 5px;
`

export const StyledSelect2 = styled(Select)`
  width: 150px;
  font-size: 10px;
`

const InputContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const FormRow = styled.div`
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: 5px;
`

class Workout extends React.Component {
  render() {
    const date = Date.now()
    return (
      <Container>
        <Formik
          initialValues={{
            workouts: [{ name: '', reps: '', sets: '', weight: '' }],
          }}
          onSubmit={(values, { resetForm }) => (
            this.props.submitWorkout(values, date), resetForm()
          )}
          render={({ values, setFieldValue }) => (
            <Form>
              <FieldArray
                name="workouts"
                render={arrayHelpers => (
                  <div>
                    <TopSection>
                      <h4> New Workout </h4>
                      <div>
                        <StyledButton
                          text="add exercise"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: '',
                              reps: 0,
                              sets: 0,
                              weight: 0,
                            })
                          }
                        />
                      </div>
                    </TopSection>
                    {values.workouts.map((workout, index) => (
                      <FormRow key={index}>
                        <InputContainer>
                          <StyledSelect2
                            name={`workouts[${index}].options`}
                            options={this.props.exercises}
                            onChange={value =>
                              setFieldValue(
                                `workouts[${index}].name`,
                                value.value
                              )
                            }
                          />
                          <StyledField
                            placeholder="reps"
                            name={`workouts[${index}].reps`}
                          />
                          <StyledField
                            placeholder="sets"
                            name={`workouts[${index}].sets`}
                          />
                          <StyledField
                            placeholder="weight"
                            name={`workouts[${index}].weight`}
                          />
                          <RedCrossContainer
                            type="button"
                            text="-"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <RedCross src={redcross} />
                          </RedCrossContainer>
                        </InputContainer>
                      </FormRow>
                    ))}

                    <Button type="submit" text="Submit Workout" />
                  </div>
                )}
              />
            </Form>
          )}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ workouts, languages }) => ({
  workouts,
  languages,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitWorkout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout)
