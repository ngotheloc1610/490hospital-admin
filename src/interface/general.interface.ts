export interface ITotalView {
  staff: number;
  patient: number;
  department: number;
  doctor: number;
}

export interface IPractitioner {
  id: string;
  username: string;
  fullname: string;
  type: string;
  room: string;
  specialty: string;
  startDate: string;
  endDate: string;
  education: [{ start: string; end: string; content: string }];
  specialize: [{ start: string; end: string; content: string }];
  achievement: [{ start: string; end: string; content: string }];
}

export interface IPropsFormik {
  errors: any;
}

export interface MenuItem {
  title: string;
  subMenu?: MenuItem[];
  content: any
}
