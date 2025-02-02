import type { IUser } from 'models/user';

export interface IQuestion<T> {
  title: string;
  value?: string;
  placeholder?: string;
  prependIcon?: string;

  changeHandler(model: T, value: any): void;
}

interface IPage<T> {
  title: string;
  subtitle?: string;
  questions: IQuestion<T>[];
}

export const setupQuestionPages = (): IPage<IUser>[] => {
  return [
    {
      title: 'Getting to know you',
      subtitle:
        'Help us to understand the full scope of your financial goals and match you with the right experts.',
      questions: [
        {
          title: 'What is your First name?',
          placeholder: 'eg: Abebe',
          changeHandler: (model, value) => {
            model.firstName = value;
          }
        }
      ]
    },
    {
      title: 'Getting to know you',
      subtitle:
        'Help us to understand the full scope of your financial goals and match you with the right experts.',
      questions: [
        {
          title: 'What is your Last name?',
          placeholder: 'eg: Kebede',
          changeHandler: (model, value) => {
            model.lastName = value;
          }
        }
      ]
    },
    {
      title: 'Getting to know you',
      subtitle:
        'Help us to understand the full scope of your financial goals and match you with the right experts.',
      questions: [
        {
          title: 'When were you born?',
          placeholder: 'eg: 1998-01-17',
          changeHandler: (model, value) => {
            model.dateOfBirth = value;
          }
        }
      ]
    },
    // {
    //   title: 'Getting to know you',
    //   subtitle:
    //     'Help us to understand the full scope of your financial goals and match you with the right experts.',
    //   questions: [
    //     {
    //       title: 'Maritial status'
    //     },
    //     {
    //       title: 'Tax Id number (TIN)'
    //     }
    //   ]
    // },
    // {
    //   title: 'Contact info',
    //   subtitle:
    //     'We’ll send all your investment documents and disclosures to this address.',
    //   questions: [
    //     {
    //       title: 'Phone number'
    //     },
    //     {
    //       title: 'Country',
    //       placeholder: 'Ethiopia'
    //     },
    //     {
    //       title: 'City',
    //       placeholder: 'Addis Ababa'
    //     },
    //     {
    //       title: 'State / Zone',
    //       placeholder: 'Addis Ababa'
    //     },
    //     {
    //       title: 'Post code'
    //     }
    //   ]
    // },
    // {
    //   title: 'Financial information',
    //   subtitle:
    //     'Tell us about your financial situation and experience with investing.',
    //   questions: [
    //     {
    //       title: 'Annual income'
    //     },
    //     {
    //       title: 'Total net worth'
    //     },
    //     {
    //       title: 'Liquid net worth'
    //     },
    //     {
    //       title: 'Investment experience'
    //     }
    //   ]
    // },
    // {
    //   title: 'Affiliations',
    //   subtitle: 'Tell us about your industry affiliations.',
    //   questions: [
    //     {
    //       title:
    //         'Do you work for, or are you related to someone who works for, a financial services company, a stock exchange, a registered securities broker-dealer?',
    //       placeholder: 'Yes / No'
    //     },
    //     {
    //       title:
    //         'Are you, or someone who will benefit from this account a director or major owner (10% or more shares) of a publicly traded company?',
    //       placeholder: 'Yes / No'
    //     }
    //   ]
    // },
    {
      title: 'Review and confirm',
      subtitle: 'Confirm your personal information',
      questions: []
    }
  ];
};
