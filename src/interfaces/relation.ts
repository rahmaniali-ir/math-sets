export type OrderedPair<T = any> = [T, T]
export interface Relation {
  name: string
  source: string
  target: string
  nodes: OrderedPair[]
}
