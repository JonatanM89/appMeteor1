import React from 'react'
import './style.css';

function Projects({dev}){
    const link = "/projects/"+dev._id;
    return (
        <li className="project-item">
            <header>
                <div className="user-info">
                <strong>{dev.client_name}</strong>                
                </div>
            </header>
            <p>{dev.client_email}</p>
            <p>{dev.descricao}</p>
            <a href={link} target="_blank">Ver informações</a>
        </li>
        
    )
}

export default Projects