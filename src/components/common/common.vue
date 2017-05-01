<script>
  class PZ_CLASS_SETTING {
    add(dom, name) {
      if (!dom.classList.contains(name)) {
        dom.classList.add(name)
      }
      return false
    }

    remove(dom, name) {
      if (dom.classList.contains(name)) {
        dom.classList.remove(name)
      }
      return false
    }

    contain(dom, name) {
      if (dom.classList.contains(name)) {
        return true
      }
      return false
    }

    toggle(dom, name) {
      if (this.contain(dom, name)) {
        this.remove(dom, name)
      } else {
        this.add(dom, name)
      }
    }
  }

  class PZ_DOM_SELECTOR {
    byId(id) {
      return document.getElementById(id)
    }

    byClass(name) {
      let dom = document.querySelectorAll('.' + name)

      if (dom.length > 1) {
        return dom
      } else {
        return document.querySelector('.' + name)
      }
      return false
    }
  }

  class PZ_EVENT_ADDITION {
    add(dom, eventName, func, bool = false) {
      dom.addEventListener(eventName, func, bool)
    }
  }

  class PZ_DISPLAY_TOGGLE {
    show(dom) {
      if (window.getComputedStyle(dom).display === 'none') {
        dom.style.display = 'block'
      }
      return false
    }

    hide(dom) {
      if(window.getComputedStyle(dom).display === 'block') {
        dom.style.display = 'none'
      }
      return false
    }
  }

  class PZ_STYLE_ATTRIBUTE {
    set(dom, name, value) {
      dom.style[name] = value
    }
  }

  let SETTING = new PZ_CLASS_SETTING()
  let SELECTOR = new PZ_DOM_SELECTOR()
  let ADDITION = new PZ_EVENT_ADDITION()
  let DISPLAY = new PZ_DISPLAY_TOGGLE()
  let STYLE = new PZ_STYLE_ATTRIBUTE()

  export {
    SETTING as classSetting,
    SELECTOR as selector,
    ADDITION as event,
    DISPLAY as display,
    STYLE as style
  };
</script>
