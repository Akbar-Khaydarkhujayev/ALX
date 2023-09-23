import {useForm} from 'react-hook-form';
import '../../styles/form.scss';
import './auth.scss'
import {IRegister} from "../../interfaces/Auth.ts";
import { useRegister } from "../../hooks/useRegister.ts"
import {Link} from "react-router-dom";

const Register = () => {

    const {registerUser, error} = useRegister()

    const {register, watch, handleSubmit, formState: {errors, isSubmitting}} = useForm<IRegister>();
    const onSubmit = async (user: IRegister) => {
        await registerUser(user)
    }

    return (
        <div className='auth'>
            <div className='auth__container'>
                <form className='form auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <label>
                        First Name
                        <input type='text' {...register('firstName', {
                            required: 'Enter First Name',
                            minLength: {value: 2, message: 'First name must be at least 2 characters'},
                            maxLength: {value: 20, message: 'First name must be 20 characters at most'}
                        })}/>
                        <p className='error'>{errors.firstName?.message?.toString()}</p>
                    </label>
                    <label>
                        Last Name
                        <input type='text' {...register('lastName', {
                            required: 'Enter Last Name',
                            minLength: {value: 2, message: 'Last name must be at least 2 characters'},
                            maxLength: {value: 20, message: 'Last name must be 20 characters at most'}
                        })}/>
                        <p className='error'>{errors.lastName?.message?.toString()}</p>
                    </label>
                    <label>
                        Phone Number
                        <div className='flex register-form__phone'>
                            <div className='register-form__phone-code'>+998</div>
                            <input type='number' {...register('phone', {
                                valueAsNumber: true,
                                required: 'Enter Phone Number',
                                minLength: {value: 9, message: 'Invalid Phone Number'},
                                maxLength: {value: 9, message: 'Invalid Phone Number'}
                            })}/>
                        </div>
                        <p className='error'>{errors.phone?.message?.toString()}</p>
                    </label>
                    <label>
                        Email Address
                        <input type='text' {...register('email', {
                            required: 'Enter Email address',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Entered value does not match email format"
                            }
                        })}/>
                        <p className='error'>{errors.email?.message?.toString()}</p>
                    </label>
                    <label>
                        Password
                        <input type='password' {...register('password', {required: 'Enter Password'})}/>
                        <p className='error'>{errors.password?.message?.toString()}</p>
                    </label>
                    <label>
                        Confirm Password
                        <input type='password' {...register('confirmPassword', {
                            required: 'Confirm Password', validate: (val: string) => {
                                if (watch('password') != val) {
                                    return "Passwords do no match";
                                }
                            },
                        })}/>
                        <p className='error'>{errors.confirmPassword?.message?.toString()}</p>
                    </label>
                    <button disabled={isSubmitting}>Register</button>
                    <p className='error'>{error}</p>
                </form>
                <div className='link-log'>
                    <Link to='/login'>Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;