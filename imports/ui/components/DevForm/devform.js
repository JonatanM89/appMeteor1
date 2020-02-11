import React, { useEffect, useState } from 'react';
import './style.css';

function DevForm( { onSubmit }){
    
    const [ client_name, setclient_name ] = useState('')
    const [ client_email, setclient_email ] = useState('')
    const [ descricao, setdescricao ] = useState('')    
    const [ arquivo, setarquivo ] = useState('')    
    

    async function handleAddDev(e){
        e.preventDefault();

        await onSubmit({
          client_name,
          client_email,
          descricao,
          arquivo
        });

        setclient_name('')
        setclient_email('')
        setdescricao('')
        setarquivo('');
    }  

    return (
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="client_name">Nome cliente</label>
            <input name="client_name" id="client_name" required value={client_name} onChange={e => setclient_name(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="client_email">Email cliente</label>
            <input type="email" name="client_email" id="client_email" required value={client_email} onChange={e => setclient_email(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="descricao">Nome projeto</label>
            <input name="descricao" id="descricao" required value={descricao} onChange={e => setdescricao(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="arquivo">Arquivo</label>
            <input name="arquivo" id="arquivo" type="file" value={arquivo} onChange={e => setarquivo(e.target.value)} />
          </div>
          
          <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm