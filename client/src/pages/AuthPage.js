import React, { useState } from 'react'

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: '', 
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make short your link</h1>
                <div className="card blue darken-1">
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
                       <button className="btn yellow darken-4" style={{marginRight: '20px'}}>Log in</button>
                       <button className="btn grey liten-1 black-text">Registrate</button>
                    </div>
                </div>
            </div>
       </div>
    )
}