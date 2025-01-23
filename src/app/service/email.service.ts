import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private api_pubkey = "";
  private service_id = "";
  private template_id = "";

  constructor() {
    emailjs.init(this.api_pubkey);
  }

  sendEmail(formData: { email: string, objet: string, message: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.service_id, this.template_id, formData);
  }
}
