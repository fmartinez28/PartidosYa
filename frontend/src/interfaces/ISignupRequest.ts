export interface ISignupRequest {
  name: string
  lastname: string
  birthdate: Date
  email: string
  password: string
  role: string
  country: string
  department: string
  city: string
  address?: string
}
