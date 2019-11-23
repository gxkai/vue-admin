/**
 * Created by 张强 on 2018/5/24.
 */

import {Entity, Column, ManyToMany, JoinTable, OneToMany} from 'typeorm'
import Role from './Role'
import BaseEntity from './BaseEntity'
import UserDashboard from './UserDashboard'

@Entity()
export default class User extends BaseEntity {

  @Column({length: 32, unique: true})
  public name: string

  @Column({length: 32})
  public password: string

  @Column({length: 32, nullable: true, unique: true})
  public tel?: string

  @Column({type: 'tinyint', default: 1})
  public sex: number

  @Column({type: 'tinyint', default: 1})
  public status: number

  @ManyToMany((type) => Role)
  @JoinTable({name: 'user-role'})
  public roles: Role[]

  @OneToMany((type) => UserDashboard, (userDashboard) => userDashboard.user)
  public userDashboards: UserDashboard[]

  // 不保存数据库的属性
  public roleIds?: string[]
  public roleString?: string
}
