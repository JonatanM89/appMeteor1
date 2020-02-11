import React, { useEffect, useState } from 'react';
import './style.css';

function DevForm( { onSubmit }){
    var day  = new Date().getDate()
    var month = (new Date().getMonth() + 1)  < 10 ? "0"+ (new Date().getMonth() + 1) : new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    const formated_date = year + '-' + month + '-' + day;
    
    
    const [ responsavel, setresp ] = useState('')    
    const [ data, setdata ] = useState(formated_date) 
    const [ descricao, setdescricao ] = useState('')    
    const [ arquivo, setarquivo] = useState('');

    async function handleAddDev(e){
      e.preventDefault();

      await onSubmit({
        descricao,
        data,
        responsavel,
        arquivo
      });
      
      setdescricao('')
      setresp('')
      setdata(formated_date)
      setarquivo('');
    }  

    return (
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="responsavel">Nome responsavel</label>
            <input name="responsavel" id="responsavel" required value={responsavel} onChange={e => setresp(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="data">Nome responsavel</label>
            <input name="data" id="data" required onChange={e => setdata(e.target.value)} type="date" value={data} />
          </div>
          <div className="input-block">
            <label htmlFor="descricao">Descrição</label>
            <textarea rows="6" name="descricao" id="descricao" required value={descricao} onChange={e => setdescricao(e.target.value)}>{descricao}</textarea>
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