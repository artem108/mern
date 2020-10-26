import React, {useState, useEffect, useContext} from 'react'
// import { request } from 'express'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const CreatePage = () => {
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    console.log(link);

    const pressHendler = async(event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data);
            } catch (error) {
            }
            
        } 
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                                <input 
                                    placeholder="enter link" 
                                    id="link" 
                                    type="text" 
                                    value = {link}
                                    onChange={e => setLink(e.target.value)}
                                    onKeyPress={pressHendler}
                                />
                                <label htmlFor="link">Enter link</label>
                </div>
            </div>
       </div>
    )
}