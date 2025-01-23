import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private api_pubkey = "TOTgGtcH4-Nigdt-D";
  private service_id = "service_j7h0cua";
  private template_id = "template_5w0nioi";

  constructor() {
    emailjs.init(this.api_pubkey);
  }

  sendEmail(formData: { email: string, objet: string, message: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.service_id, this.template_id, formData);
  }
}
