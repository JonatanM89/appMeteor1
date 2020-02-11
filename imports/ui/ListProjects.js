import React, { useState } from 'react';
import './Sidebar.css';
import './App.css';
import './global.css';
import Projects from './components/DevItem/devitem';
import DevForm from './components/DevForm/devform';
import {Arquivos} from '../api/arquivos';
import {Tracker} from 'meteor/tracker';

export default class ListProjects extends React.Component {    
  
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
    const { email } = this.props.match.params

    Tracker.autorun(()=>{
      var arqs = Arquivos.find({ client_email: email  } ).fetch()
      console.log(arqs)
      this.setState({arqs: arqs, email : email})
    })
  }

  render() {
    return (
      <div id="app">
        
        <main>
          <h1 style={{textAlign:"center",marginBottom:10}} >Projetos disponíveis</h1>
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