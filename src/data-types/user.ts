export interface UserLoginPayload {
  username: string
  password: string
}

export interface CurrentUser {
  userId: number
  username: string
}
