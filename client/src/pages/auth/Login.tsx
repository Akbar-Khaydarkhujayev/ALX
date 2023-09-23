import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import '../../styles/form.scss';
import './auth.scss';
import {ILogin} from "../../interfaces/Auth.ts";
import {useLogin} from "../../hooks/useLogin.ts";

const Login = () => {

    const {loginUser, error} = useLogin();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ILogin>();

    const onSubmit = async (user: ILogin) => {
        await loginUser(user)
    }

    return (
        <div className='auth'>
            <div className='auth__container'>
                <form className='form auth-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>

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
                    <button disabled={isSubmitting}>Login</button>
                    <p className='error'>{error}</p>
                </form>
                <div className='link-log'>
                    <Link to='/register'>Do not have a account? Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;