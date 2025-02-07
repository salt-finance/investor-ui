export type IAccount = {
  id?: string;
  fundingMethod?: IAccountFundingMethod;
  balance?: IAccountBalance;
};

interface IAccountFundingMethod {
  balance?: number;
  method?: string;
}

interface IAccountBalance {
  holdings?: number;
  cash?: number;
  roi?: number;
  total?: number;
}
