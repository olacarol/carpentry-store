import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formData = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  sendEmail(form: NgForm) {

    const { serviceID, templateAdmin, templateClient, publicKey } = environment.emailjs;

    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      return;
    }

    emailjs.send(serviceID, templateAdmin, this.formData, publicKey)
      .then(() => emailjs.send(serviceID, templateClient, this.formData, publicKey))
      .then(() => {
        this.successMessage = 'Mensagem enviada com sucesso!';
        form.resetForm();
        this.formData = { name: '', phone: '', email: '', message: '' };
        setTimeout(() => this.successMessage = '', 5000);
      })
      .catch((error) => {
        console.error('Erro no EmailJS:', error);
        this.errorMessage = 'Houve um erro ao enviar. Tente novamente mais tarde.';
      });
  }
}