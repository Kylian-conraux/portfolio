import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { EmailService } from './service/email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      objet: ['', [Validators.required, Validators.maxLength(255)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]]
    });

  }


  ngOnInit() {
    initFlowbite();
  }


  checkMail(mail: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(mail);
  }

  checkObject(object: string): boolean {
    const objectRegex = /^[a-zA-Z0-9\s.,!?-]{1,255}$/;
    return objectRegex.test(object);
  }

  checkMessage(message: string): void {
    message = message.replace(/<[^>]*>/g, '');
    //const messageRegex = /^[a-zA-Z0-9\s.,!?@#$%&*()_+:'"=/\r\n-]{1,2000}$/;
    //return messageRegex.test(message);
  }

  highlightError(input: HTMLInputElement): void {
    input.style.backgroundColor = 'lightcoral';
    setTimeout(() => {
      input.style.backgroundColor = "#f0eeee";
    }, 1000);
  }

  checkForm(): boolean {
    const mail = document.getElementById('email') as HTMLInputElement;
    const object = document.getElementById('objet') as HTMLInputElement;
    const message = document.getElementById('message') as HTMLInputElement;

    let test = true;

    if (!this.checkMail(mail.value)) {
      this.highlightError(mail);
      test = false;
    }
    if (!this.checkObject(object.value)) {
      this.highlightError(object);
      test = false;
    }
    this.checkMessage(message.value);
  //  if (!this.checkMessage(message.value)) {
   //   this.highlightError(message);
   //   test = false;
  //  }
    return test;
  }


  sendMail(): void {
    if (this.checkForm()) {
      let validity = this.contactForm.status === "VALID";
      if (validity) {
        this.emailService.sendEmail(this.contactForm.value).then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
          console.log('FAILED...', err);
        });
      }
    }
  }

  /**
   * J'ai ajouté un spinner pour montrer que le mail est en cours d'envoi
   * Une fois l'envoie fini et le code retour reçu, j'affiche un message de succès ou d'erreur
   * Je dois allez chercher les principaux codes d'erreur pour les afficher et tous les traiter
   * 
   */

}