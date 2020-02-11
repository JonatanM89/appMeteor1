  import React, { useState } from 'react';
  import './Sidebar.css';
  import './App.css';
  import './global.css';
  import Projects from './components/DevItem/devitem';
  import DevForm from './components/DevForm/devform';
  import {Arquivos} from '../api/arquivos';
  import {Tracker} from 'meteor/tracker';
  
  export default class Home extends React.Component {    
    
    constructor(props){
      super(props);

      this.state = {
        arqs : []
      }
    }

    componentWillMount(){
      this.loadArqs()
    }  

    loadArqs(){
      Tracker.autorun(()=>{
        var arqs = Arquivos.find({}).fetch()
        this.setState({arqs: arqs})
      })
    }

    handleAddDev(data){
      var date  = new Date().getDate()
      var month = (new Date().getMonth() + 1)  < 10 ? "0"+ (new Date().getMonth() + 1) : new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear();

      Arquivos.insert({
        client_name : data.client_name,
        client_email : data.client_email,
        descricao : data.descricao,
        historico : [{
          descricao : "Projeto criado",
          data :date + '/' + month + '/' + year
        }]
      });    
       
      let msg = 'Olá, identificamos que foi criado um projeto "'+data.descricao+'" no appArch, acesse o link para visualiza-lo -> http://localhost:3000/projects/list/'+data.client_email;
      
      Meteor.call(
        'sendEmail',
        data.client_email,
        'AppArch <jonatanmedina.dev@gmail.com>',        
        'Projeto criado no appArch ',
        msg
      );

      /*var file = data.arquivo.files[0];
      if (file){
        var reader = new FileReader();
        reader.onload = function(event){          
          var buffer = new Uint8Array(reader.result)
          Meteor.call('saveFile', buffer);
        }
      } */       
    }

    render() {
      return (
        <div id="app">
          <aside>
            <strong>Novo projeto</strong>
            <DevForm  onSubmit={this.handleAddDev}/>
          </aside>
          <main>
            <ul>
              { this.state.arqs.map(arq => (
                <Projects key={arq._id} dev={arq} />
              ))}   
            </ul>

          </main>
        </div>
      );
    }
  }