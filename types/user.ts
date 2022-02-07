export type userProps = {
  id: string
  name: string
  username: string
  email: string
  city: string
}

export type listProps = {
  users: null | userProps[]
}

export type tableBodyProps = {
  user: userProps
  index: number
}
