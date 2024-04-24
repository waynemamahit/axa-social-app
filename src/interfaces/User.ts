export interface IUser {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  IUserAddress;
  phone:    string;
  website:  string;
  company:  ICompany;
}

export interface IUserAddress {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name:        string;
  catchPhrase: string;
  bs:          string;
}
