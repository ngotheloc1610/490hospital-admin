export interface ITotalView {
  staff: number;
  patient: number;
  department: number;
  doctor: number;
}

export interface IDoctorDetail {
  id: string;
  name: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  specialty: string;
  startDate: string;
  endDate: string;
  education: [{ time: string; content: string }];
  specialize: [{ time: string; content: string }];
  achievement: [{ time: string; content: string }];
}

export interface IPropsFormik {
  errors: any;
}

export interface MenuItem {
  title: string;
  subMenu?: MenuItem[];
  content: any
}
