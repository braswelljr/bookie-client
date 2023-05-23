export interface User {
  id: string
  firstname: string
  lastname: string
  othernames: string
  username: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface Login {
  email: string
  password: string
}

export interface Signup {
  firstname: string
  lastname: string
  othernames: string
  username: string
  dateOfBirth: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  country: string
}

export interface Task {
  id: string
  uid: string
  title: string
  description: string
  status: string
  category: string
  pinned: boolean
  pinned_at: Date
  pinned_position: 1
  archived: boolean
  archived_at: Date
  completed: boolean
  completed_at: Date
  color: string
  created_at: Date
  updated_at: Date
}

export interface InputError {
  field: string
  message: string
}

export interface ErrorCause extends Error {
  cause?: { error: Error; res: Response }
}
