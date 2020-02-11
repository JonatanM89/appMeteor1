import { Mongo } from 'meteor/mongo';

//Cadastro de projetos
export const Arquivos = new Mongo.Collection('arquivos');
//Arquivos inseridos no projeto
export const ArquivosHist = new Mongo.Collection('arquivos_hist');
