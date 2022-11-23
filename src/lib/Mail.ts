import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface MailLib {
  transporter: Transporter;
}

type Message = {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
};

class Mail implements MailLib {
  transporter: nodemailer.Transporter<SMTPTransport.Options>;

  constructor() {
    const { host, port, secure, auth } = mailConfig;

    const transportOptions = {
      host,
      port,
      secure,
      auth: auth.user ? auth : {},
    };

    this.transporter = nodemailer.createTransport(
      transportOptions as SMTPTransport.Options
    );

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message: Message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
