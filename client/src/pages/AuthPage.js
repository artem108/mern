import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', 
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.massage)
        } catch (error) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.massage)
            auth.login(data.token, data.userId)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Make short your link</h3>
                <div className="card" style={{backgroundColor: '#ee6e73'}}>
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="enter email" 
                                    id="email" 
                                    type="text" 
                                    name="email" 
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="enter password" 
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Password</label>
                            </div>

                        </div>   
                     </div>
                     <div className="card-action">
                       <button className="btn yellow darken-4" style={{marginRight: '20px'}} disabled={loading} onClick={loginHandler}>Log in</button>
                       <button className="btn grey liten-1 black-text" onClick={registerHandler} disabled={loading}>Registrate</button>
                    </div>
                </div>
            </div>
       </div>
    )
}