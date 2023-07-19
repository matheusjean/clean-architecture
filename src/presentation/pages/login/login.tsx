import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault()
    setState({...state, isLoading: true})
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu E-mail' />
          <Input
            type='password'
            name='password'
            placeholder='Digite a sua senha'
          />
          <button data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            type='submit'
            className={Styles.submit}>
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
