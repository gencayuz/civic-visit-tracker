
export interface LoginLog {
  id: number;
  username: string;
  loginDate: Date;
  role: string;
}

export const initialLoginLogs: LoginLog[] = [
  {
    id: 1,
    username: 'admin',
    loginDate: new Date(2024, 3, 15, 9, 30),
    role: 'admin'
  },
  {
    id: 2,
    username: 'staff',
    loginDate: new Date(2024, 3, 15, 10, 45),
    role: 'staff'
  }
];
