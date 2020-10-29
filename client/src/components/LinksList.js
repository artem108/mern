import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({links}) => {
    if (links.lenth) {
        return (
            <p>List of links is emty :(</p>
        )
    }
    return (
            <>
               <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Original</th>
                    <th>Short</th>
                    <th>Open</th>
                </tr>
                </thead>
                <tbody>
                    {
                        links.map((link, index) => {
                            return (
                                <tr>
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.to}</td>
                                <td><Link to={`/detail/${link._id}`}>Open detail</Link></td>
                            </tr>
                            )
                            
                        })
                    }
                </tbody>
            </table>
            </>
    )
}