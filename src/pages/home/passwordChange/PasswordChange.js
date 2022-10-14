import React, { useEffect } from 'react';
import CustomButton from '../../../_sharecomponents/custombutton/CustomButton';
import CustomInput from '../../../_sharecomponents/custominput/CustomInput';
import FormGroup from '../../../_sharecomponents/formgroup/FromGroup';
import styled from "styled-components";
import { useState } from 'react';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './passwordChange.scss'

const PasswordChange = (props) => {

    const username = localStorage.getItem('username')

    const formik = useFormik({
        initialValues: {
            username: username,
            password: '',
        },
        validationSchema: Yup.object({

            password: Yup.string()
                .min(6, 'Minimum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required'),
        }),
        onSubmit: values => {
            console.log("values", values);
            props.changePassword(values);
        }
    })
    useEffect(() => {
        props.showLoading(props.isLoading);
    }, [props.isLoading])

    return (
        <div className={props.className}>
            <form onSubmit={formik.handleSubmit}
             className='password-change'>
                <div className="content">
                    <h3>Change password</h3>

                    <FormGroup>
                        <CustomInput
                            label='New password *'
                            type='password'
                            name='password'
                            value=""
                            onChangeInput={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p>{formik.errors.password}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <CustomButton
                            type="submit"
                            color="#ffffff"
                            width="100%"
                            uppercase
                        >
                            Submit
                        </CustomButton>
                    </FormGroup>
                </div>
            </form>
        </div>
    );
};

const PasswordChangingStyled = styled(PasswordChange)`
    height: calc(100vh - 108px);
    position: relative;

    .content {
        width: 400px;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    h3 {
        text-align: center;
    }
`
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
        errMessage: state.user.errMessage
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changePassword: (values) => {
            dispatch(userActions.changePassword(values))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangingStyled);
