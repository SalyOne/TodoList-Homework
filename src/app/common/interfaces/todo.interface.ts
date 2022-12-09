export interface ITodo {
  id:string,
  title:string,
  description:string,
  expireDate: Date,
  createdAt: Date,
  updatedAt?: Date,
  removeAt?:Date,
  responsiblePersonId?: string,
}
