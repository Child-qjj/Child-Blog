import $ from 'jquery'
import Vue from 'vue'
export const addCodeBtn = _ => {
	//markdown代码存放在pre code 标签对中
  $('pre code').each(function () {
    let lines = $(this).text().split('\n').length - 1
    //添加有序列表
    let $numbering = $('<ol/>').addClass('pre-numbering')
  })
}