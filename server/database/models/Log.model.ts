import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "logs",
  timestamps: true,
})
export default class Log extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  method!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  event_summary!: string;
}
