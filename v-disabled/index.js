const utils = {
    addClass (el, className) {
      this._hasClass(el, className)
      el.className += ` ${className}`
    },
    _hasClass (el, className) {
      // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },
    removeClass (el, className) {
      if (this._hasClass(el, className)) {
        // replace方法是替换
        el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ')
      }
    }
  }
  
  export default {
    install (Vue, options) {
      Vue.directive('disabled', {
        inserted (el, binding) {
          let {time, className} = binding.value || {time: 1000, className: 'is-disabled'}
          el.addEventListener('click', (e) => {
            if (!el.disabled) {
              el.disabled = true
              utils.addClass(el, className)
              setTimeout(() => {
                el.disabled = false
                utils.removeClass(el, className)
              }, time)
            }
          })
        }
      })
    }
  }
  