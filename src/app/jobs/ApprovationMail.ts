import Mail from '../../lib/Mail';

type MailData = {
  data: {
    user: {
      name: string;
      email: string;
    };
    car: string;
  };
};

class ApprovationMail {
  get key() {
    return 'ApprovationMail';
  }

  async handle({ data }: MailData) {
    const { user, car } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Análise de Crédito aprovada',
      template: 'approvation',
      context: {
        name: user.name,
        car,
      },
    });
  }
}

export default new ApprovationMail();
