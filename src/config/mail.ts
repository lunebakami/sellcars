export default {
  host: process.env.MAIL_HOST ?? '',
  port: process.env.MAIL_PORT ?? 0,
  secure: false,
  auth: {
    user: process.env.MAIL_USER ?? '',
    pass: process.env.MAIL_PASS ?? '',
  },
  default: {
    from: 'Equipe Sell Car <noreply@sellcar.com>',
  },
};
