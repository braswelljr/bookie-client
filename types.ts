export interface AuthenticationPayload {
  message: string
  token: string
  code: number
  payload?: User | null
}

export interface User {
  id: string
  firstname: string
  lastname: string
  othernames: string
  username: string
  dateOfBirth: string
  email: string
  phone: string
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
  pinnedAt: Date
  pinnedPosition: 1
  archived: boolean
  archivedAt: Date
  completed: boolean
  completedAt: Date
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface InputError {
  field: string
  message: string
}

export interface ErrorCause extends Error {
  cause?: { error: Error; res: Response }
}

export interface ToastI {
  id: string
  title?: string | Slottable
  description?: string | Slottable
  actions?: string[] | Slottable[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}
