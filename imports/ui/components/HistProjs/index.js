import React from 'react'
import './style.css';

function Projects({hist}){
    
    return (
        <li className="project-item">
            <header>
                <div className="user-info">
                <strong>{hist.descricao}</strong>                
                </div>
            </header>
            <p>{hist.data}</p>            
        </li>
        
    )
}

export default Projects