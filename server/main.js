import {Meteor} from 'meteor/meteor';
import {Arquivos} from './../imports/api/arquivos';

Meteor.startup( function(){
  //Configuração do SendGrid
  process.env.MAIL_URL = 'smtp://apikey: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@smtp.sendgrid.net:587';
  //console.log(Arquivos.find().fetch());
});

Meteor.methods({
  //Enviando email com SendGrid 
  sendEmail(to, from, subject, text) {
    Email.send({ to, from, subject, text });
  }

});