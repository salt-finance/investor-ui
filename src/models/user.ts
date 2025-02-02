export type IUser = {
  firstName?: string;
  lastName?: string;
  password?: string;
  taxIdNumber?: any;
  dateOfBirth?: string;
  email?: string;
  affiliation?: Affiliation;
  profilePicture?: string;
};

interface Affiliation {
  isDirectorOrMajorOwner: boolean;
  isAffiliatedToFinancialServices: boolean;
}
