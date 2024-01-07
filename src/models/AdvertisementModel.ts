'use strict';

import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'advertisement',
})
export class AdvertisementModel extends Model {
  @PrimaryKey
  @AllowNull(false)
	@Default(DataTypes.UUIDV4)
  @Column({
    type: DataTypes.UUID,
  })
    id: string;

  @Column
    name: string;

  @Column
    location: string;

  @Column
    coords: string;

  @Column
    imageUrl: string;

  @Column
    price: string;

  @Column
    desc: string;
}
