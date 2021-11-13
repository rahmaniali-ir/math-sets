export interface Action<T = string, P = any> {
  type: T
  payload?: P
}
