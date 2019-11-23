/**
 * Created by 张强 on 2018/5/24.
 */

import {Entity, Column, JoinTable, ManyToMany} from 'typeorm'
import Menu from './Menu'
import Resource from './Resource'
import BaseEntity from './BaseEntity'

@Entity()
export default class Role extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 32, unique: true})
  public code: string

  @Column({length: 64, nullable: true})
  public remark?: string

  @ManyToMany((type) => Menu)
  @JoinTable({name: 'role-menu'})
  public menus: Menu[]

  @ManyToMany((type) => Resource)
  @JoinTable({name: 'role-resource'})
  public resources: Resource[]

  public menuIds?: string[]
  public resourceIds?: string[]
}
