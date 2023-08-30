import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "boolean", default: false })
  isDeleted: boolean;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  referenceResourceId: string;

  @Column({ type: "varchar" })
  referenceResourceSource: string;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
