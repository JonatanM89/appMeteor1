import React, { useState } from 'react';
import './Sidebar.css';
import './App.css';
import './global.css';
import DevForm from './components/DevFormHist/devformhist';
import {Arquivos} from '../api/arquivos';
import {Tracker} from 'meteor/tracker';
import {HistProjetct} from './components/HistProjs/index';

export default class Home extends React.Component {    
  
  constructor(props){
    super(props);
    this.state = {
        id : 0
    }

    this.handleAddDev = this.handleAddDev.bind(this);
    this.showData = this.showData.bind(this);
    
  }


  componentWillMount(){
    this.loadArqs()
  }  

  loadArqs(){
    const { id } = this.props.match.params
    Tracker.autorun(()=>{
      var arqs = Arquivos.findOne(id)
      //console.log(arqs)
      this.setState({arqs: arqs, id : id})
    })
  }

  handleAddDev(data){
      let arqs = this.state.arqs;
      let hist = arqs.historico.concat({descricao : data.descricao, data : data.data, responsavel : data.responsavel})
      arqs.historico = hist
    
    console.log(arqs)
    
    this.setState({arqs: arqs})

    Arquivos.update(this.state.id, this.state.arqs);

    let msg = 'Olá, identificamos uma alteração no projeto '+this.state.arqs.descricao+', acesse o link para visualiza-lo -> http://localhost:3000/public/projects/'+this.state.id;
      
      Meteor.call(
        'sendEmail',
        this.state.arqs.client_email,
        'AppArch <jonatanmedina.dev@gmail.com>',        
        'Projeto criado no appArch ',
        msg
      );
    
  }

  showData(dt){    
    let format_date = dt.split("-");
    
    if(format_date.length == 1 )
        return dt
    else
        return format_date[2]+'/'+format_date[1]+'/'+format_date[0];     
  }

  loadHist(){
    let cont = 0;  
    if(this.state.arqs != null){
        if(this.state.arqs.historico != null){
            return (
                this.state.arqs.historico.map(hist => (
                    <li className="project-item">
                        <header>
                            <div style={{ textAlign:"right",fontSize:11 }}>
                            <strong>{ this.showData( hist.data == undefined ? "" : hist.data) }</strong>                
                            </div>
                        </header>
                        <p>Resposável: {hist.responsavel == null ? 'Não informado' : hist.responsavel}</p>            
                        <p>{hist.descricao}</p> 
                    </li>
                ))
            )
        }

    } else {
        return (
            <li>Nada para mostrar</li>
        )
    }
  }

  render() {
    return (
      <div id="app">
        <aside>
          <strong>Novo histórico</strong>
          <DevForm onSubmit= {this.handleAddDev}/>
        </aside>
        <main>
            <h1>{this.state.arqs == null ? "" : this.state.arqs.descricao}</h1>
            <p style={{margin: 5}}> Cliente: {this.state.arqs == null ? "" : this.state.arqs.client_name} </p>
            <p style={{margin: 5}}> Email: {this.state.arqs == null ? "" : this.state.arqs.client_email}</p>                       
            <ul>
                { this.loadHist() }   
            </ul>
        </main>
      </div>
    );
  }
}