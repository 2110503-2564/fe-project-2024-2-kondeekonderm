export interface CompanyItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  website: string,
  description: string,
  tel: string,
  __v: number,
  id: string
}
  
  export interface CompanyJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CompanyItem[]
  }

  export interface AppointmentItem {
    apptDate: string;
    user: string;
    company: string;
    createdAt: string;
  }