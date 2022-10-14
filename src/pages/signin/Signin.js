import CustomCheckbox from "../../_sharecomponents/customcheckbox/CustomCheckbox";

import { Link } from "react-router-dom";
import FormGroup from "../../_sharecomponents/formgroup/FromGroup";
import CustomInput from "../../_sharecomponents/custominput/CustomInput";
import CustomButton from "../../_sharecomponents/custombutton/CustomButton";

import { MdLockOutline } from 'react-icons/md'

import './Signin.css'
import { useState } from "react";

import { connect, useDispatch } from "react-redux";
import userActions from "../../actions/userActions";
import { useEffect } from "react";

const Signin = (props) => {

    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);
  
    const handleSubmitForm = (e) => {
        e.preventDefault();

        props.signin(username, password);

    }

    const handleOnChangeInput = (e) => {
    
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);

        if (e.target.name === 'username') {
            setUsername(e.target.value);
        }else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }

    }

    const handleCheckboxChange = (checked) => {
        setRememberMe(checked);
    }

    useEffect(() => {
        props.showLoading(props.isLoading);
    }, [props.isLoading])

    // const dispatch = useDispatch();

    // dispatch(userActions.signin(username, password));

    // signin: (username, password) => {
    //     dispatch(userActions.signin(username, password))
    // }
    console.log(props)
    
    return (
        <div className="signin-container">
            <div className="signin-header">
                <div className="signin-avatar">
                    <MdLockOutline size='1.36rem'/>
                </div>
                <h1>Sign in</h1>
            </div>
            <form className="signin-main">
                <p>{props.errMessage}</p>
                <FormGroup>
                    <CustomInput 
                        label="Username *"
                        type="text"
                        name="username"
                        value=""
                        onChangeInput={handleOnChangeInput}
                    />
                </FormGroup>

                <FormGroup>
                    <CustomInput 
                        label="Password *"
                        type="password"
                        name="password"
                        value=""
                        onChangeInput={handleOnChangeInput}
                    />
                </FormGroup>

                <div className="remember-me">
                    <CustomCheckbox 
                        fontSize="24px" 
                        label="Remember me"
                        checkboxChange={handleCheckboxChange}
                    />
                </div>

                <div className="btn-submit">
                    <CustomButton 
                        type="submit"
                        uppercase
                        width="100%"
                        onClick={handleSubmitForm}
                        color="white"
                    >
                        Sign In
                    </CustomButton>
                </div>

                <div className='group-link'>
                    <Link to="/forgot-password">Forgot password?</Link>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
                <p className="copy-right"> Copyright &copy; &nbsp;
                    <Link to="/">Your Wbsite</Link>&nbsp;2022
                </p>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
        errMessage: state.user.errMessage
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        signin: (username, password) => {
            dispatch(userActions.signin(username, password))
        },
        updateUser: (user)=>{
            dispatch(userActions.updateUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
