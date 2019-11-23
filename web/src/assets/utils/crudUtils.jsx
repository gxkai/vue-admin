/**
 * Created by 张强 on 2018/6/5.
 * 这个文件是动态CRUD页面的时候，为自定义列提供一些格式化方法
 * 如果要增加方法，就在CrudUtils对象里面定义一个属性，属性名以Format或者Render结尾
 * 属性值是一个对象，包含label（显示在下拉列表中的名称）和format（实际格式化的方法）
 */

import constant from './constant'
import store from '../../global/store'

const CrudUtils = {
  sexFormat: {
    label: '格式化-性别',
    format: (row, column, cellValue) => {
      return constant.SexK[cellValue]
    }
  },
  statusFormat: {
    label: '格式化-状态',
    format: (row, column, cellValue) => {
      return constant.StatusK[cellValue]
    }
  },
  dashboardTypeFormat: {
    label: '格式化-Dashboard类型',
    format: (row, column, cellValue) => {
      return constant.DashboardTypeK[cellValue]
    }
  },
  statusRender: {
    label: 'JSX-状态',
    format: (h, val) => <el-tag size='small' type={val === constant.StatusV.禁用 ? 'info' : ''}>{constant.StatusK[val]}</el-tag>
  },
  colorRender: {
    label: 'JSX-颜色',
    format: (h, val) => <div style={{ width: '24px', height: '24px', backgroundColor: val }}></div>
  }
}

export async function initOptions (data) {
  const ps = data.items.map((item) => new Promise(async (resolve, reject) => {
    const formProps = item.formProps
    if (formProps.options && typeof formProps.options === 'string') {
      const type = formProps.type
      let data = null
      // 先在常量表里面找有没有值
      if (constant.options[formProps.options]) {
        data = constant.options[formProps.options]
      } else {
        if (formProps.options.indexOf('/') === 0) {
          data = await store.dispatch('requestUrl', formProps.options)
        } else {
          if (type === 'dialog') {
            data = await store.dispatch('getPageOptions', formProps.options)
          } else {
            data = await store.dispatch('getOptions', 'options?code=' + formProps.options + '&type=' + type)
          }
        }
      }
      if (data) {
        formProps.options = data.data || data
      }
      resolve()
    } else {
      resolve()
    }
  }))
  return Promise.all(ps)
}

export default CrudUtils
