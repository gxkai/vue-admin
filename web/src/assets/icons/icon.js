/**
 * Created by 张强 on 2018/4/25.
 */

import Vue from 'vue'
import SvgIcon from '../../baseComponent/CcIcon.vue'

Vue.component('cc-icon', SvgIcon)

const content = require.context('./svg', false, /\.svg$/)
content.keys().map(content)
export default content.keys()
