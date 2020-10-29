import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
    const { request, loading } = useHttp()
    const [links, setLinks] = useState(null)
    const { token } = useContext(AuthContext)

    const getLinks = useCallback(async() => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (error) {
            
        }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if(loading) return <Loader />

    return (
        <>
             {
                !loading && links && <LinksList links={links}/>
            }
       </>
    )
}