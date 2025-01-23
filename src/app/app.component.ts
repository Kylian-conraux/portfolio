import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';

  


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

  checkMessage(message: string): boolean {
    const messageRegex = /^[a-zA-Z0-9\s.,!?@#$%&*()_+:'"=/\r\n-]{1,2000}$/;
    return messageRegex.test(message);
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
    if (!this.checkMessage(message.value)) {
      this.highlightError(message);
      test = false;
    }
    return test;
  }


  sendMail(): void {
    if (this.checkForm()) {
      const mail = document.getElementById('email') as HTMLInputElement;
      const object = document.getElementById('objet') as HTMLInputElement;
      const message = document.getElementById('message') as HTMLInputElement;

      const mailto = `mailto:`;
    }
  }
}