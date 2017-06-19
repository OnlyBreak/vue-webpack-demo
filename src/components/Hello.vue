<template>
  <div class="doc" v-show="outerBox">

    <div class="fill-outer-box" v-show="!dissecting">
      <div class="background-box">
        <img src="../assets/liaojieziji/informationbg.png" alt=""/>
        <div class="fill-box">
          <form action="">
            <div class="fill-style">
              <div class="tip">你的姓名：</div>
              <input type="text" maxlength="8" class="name" placeholder="最多四个汉字" id="name"
              v-on:focus="onfocus($event)" v-on:blur="onblur($event)" v-on:keyup="limitChineseNumber($event)"/>
            </div>
            <div class="fill-style fill-date">
              <div class="tip">你的生日：</div>
              <input type="date" class="date" id="date" value="1991-01-01"/>
            </div>
            <div class="sex-box fill-style">
              <div class="tip">你的性别：</div>
              <div class="male sex sex-male" data-sex="1" v-on:click="selectSex($event)"></div>
              <div class="female sex" data-sex="2" v-on:click="selectSex($event)"></div>
            </div>
          </form>
        </div>
      </div>

      <div class="dissect dissect-none-active" v-show="!dissectActive" v-on:click="IsnotFill()"></div>
      <div class="dissect dissect-active" v-show="dissectActive" v-on:click="testPersonality()"></div>
    </div>

    <div class="dissecting" v-show="dissecting">
      <img src="../assets/liaojieziji/loading.gif" alt=""/>
    </div>

    <transition name="fade"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                v-on:after-enter="afterEnter">
      <div class="select-tip" v-show="showTip">
        <div class="tip" id="tip"></div>
      </div>
    </transition>
  </div>

</template>

<script>
  import flexible from '../../static/js/flexible.js'
  import util from './common/util'
  import { classSetting, selector, event, display, style } from './common/common'
  export default {
    vuex: {
      getters: {
        wechatData: state => state.wechatData
      }
    },

    computed: {
      isWechatAuthenticated: function () {
        return Boolean(this.wechatData)
      }
    },

    data () {
      return {
        dissectActive: false,
        showTip: false,
        dissecting: false,
        outerBox: true,
        userInformation: {}
      }
    },

    mounted () {
      style.set(document.querySelector('body'), 'backgroundColor', '#FE4B68')
    },

    methods: {
      testPersonality() {
        let data = {
          name: this.fillName(),
          birthday: this.fillDate(),
          sex: this.fillSex()
        }

        this.dissecting = true
        const p1 = this.$http.post('resultPersonalityTest', data).then((resp) => {
          let data = resp.data.data
          this.userInformation = data
        })

        Promise.all([p1]).then(() => {
          let code = this.userInformation.code
          let path = this.$router._root + this.$router.stringifyPath({name: 'label'})
          let redirectUrl = path + '?code=' + code
          let url = window.location.protocol + '//' + window.location.hostname + redirectUrl

          setTimeout(() => {
            window.location = url
          }, 600)
        })
      },

      IsnotFill() {
        let tip = null
        let fillWords = (tip) => {
          let elem = document.getElementById('tip')

          elem.innerHTML = tip
          this.showTip = true
        }

        if (!this.fillName()) {
          tip = '请填写姓名'
        } else if (!this.fillDate()) {
          tip = '请选择生日'
        } else if (!this.fillSex()) {
          tip = '请选择性别'
        }
        return fillWords(tip)
      },

      selectSex(event) {
        let active = event.currentTarget
        let sex = selector.byClass('sex-box').querySelectorAll('.sex')

        for (let list of sex) {
          classSetting.remove(list, 'active')
        }
        classSetting.add(list, 'active')
        this.testIsAllFill()
      },

      testIsAllFill() {
        if (this.fillName() && this.fillDate() && this.fillSex()) {
          this.dissectActive = true
        } else {
          this.dissectActive = false
        }
      },

      limitChineseNumber(event) {
        let value = event.currentTarget.value

        if (value && /[\u4e00-\u9fa5]/g.test(value)) {
          if (value.match(/[\u4e00-\u9fa5]/g).length > 4) {
            event.currentTarget.value = value.substring(0, 4)
          }
        }
        this.testIsAllFill()
      },

      fillName() {
        let name = document.getElementById('name').value

        // http://www.cnblogs.com/grenet/archive/2009/12/11/1622117.html
        const reg = new RegExp('[^a-zA-Z\u4e00-\u9fa5]', 'g')

        if (name) {
          if (!reg.test(name)) {
            let p = /[\u4e00-\u9fa5]/g.test(name) && /[a-zA-Z]/g.test(name)

            if (!p) {
              if (/[\u4e00-\u9fa5]/g.test(name)) {
                let m1 = name.match(/[\u4e00-\u9fa5]/g)

                if (m1.length < 5) {
                  return name.trim()
                } else {
                  return false
                }
              }
              return name.trim()
            }
          }
        }
        return false
      },

      fillDate() {
        let date = document.getElementById('date')

        return date.value
      },

      fillSex() {
        let active = selector.byClass('sex-box').querySelector('.active')
        let sex = null

        if (active) {
          sex = active.getAttribute('data-sex')
        }

        return sex
      },

      onfocus(event) {
        event.currentTarget.placeholder = ''
      },

      onblur(event) {
        event.currentTarget.placeholder = '（最多四个汉字）'
      },

      afterEnter() {
        this.showTip = false
      }
    },

    transitions: {
      zoom: {
        enterClass: 'zoomIn',
        leaveClass: 'slideOutLeft'
      }
    }
  }
</script>

<style>
  @import '~animate.css';
</style>

<style lang="sass" scoped>
$rem: 75px;
@function px2rem($px) {
@return $px / $rem * 1rem
}

input[type=date] {
  background-color:transparent;
  color:#3B2C4B;
  FILTER: alpha(opacity=0); /*androd*/
  appearance:none;  /*下拉框去掉右侧图标*/
  -webkit-appearance:none;
  border: none;
  outline: none;
  font-size: px2rem(28px);
}

 img {
  display: block;
  width: 100%;
 }

.doc {
  background-color: #FE4B68;
  padding: px2rem(40px) px2rem(20px) px2rem(86px);
}

.background-box {
  position: relative;

  .fill-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: px2rem(140px);
    width: 80%;

    .fill-style {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #3B2C4B;
      padding-left: px2rem(20px);
      height: px2rem(80px);
      border-radius: 2px;
      font-size: px2rem(28px);
      color: #897A99;
      display: flex;
      align-items: center;
      .name {
        border: none;
        color: #3B2C4B;
        font-size: inherit;
        flex: auto;
        height: px2rem(60px);
      }
      .date {
        flex: auto;
        height: px2rem(60px);
      }
    }
    ::-webkit-input-placeholder {
      color: #ccc1d8;
    }
    .fill-date {
      margin: px2rem(40px) 0;
      .fill {
        display: none;
      }
    }

    ::-webkit-datetime-edit-fields-wrapper {
      // background: silver;
    }
    ::-webkit-datetime-edit-text { color: #3B2C4B;}
    ::-webkit-datetime-edit-month-field { color: #3B2C4B; }
    ::-webkit-datetime-edit-day-field { color: #3B2C4B; }
    ::-webkit-datetime-edit-year-field { color: #3B2C4B; }
    ::-webkit-inner-spin-button { display: none; }
    ::-webkit-calendar-picker-indicator { color: #3B2C4B; }

    .sex-box {
      .sex {
        width: px2rem(130px);
        height: px2rem(48px);
      }
      .sex-male {
        margin: 0 px2rem(19px) 0 px2rem(30px);
      }
      .male {
        background: url('../assets/liaojieziji/male-unuse.png') no-repeat center;
        background-size: 100%;
        &.active {
          background: url('../assets/liaojieziji/male.png') no-repeat center;
          background-size: 100%;
        }
      }
      .female {
        background: url('../assets/liaojieziji/female-unuse.png') no-repeat center;
        background-size: 100%;
        &.active {
          background: url('../assets/liaojieziji/female.png') no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
}

.dissect {
  width: 100%;
  margin: 0 auto;
  height: px2rem(120px);
}
.dissect-none-active {
  background: url('../assets/liaojieziji/analyse-button-unuse.png') no-repeat center;
  background-size: 100%;
}
.dissect-active {
  background: url('../assets/liaojieziji/analyse-button.png') no-repeat center;
  background-size: 100%;
}
.select-tip {
  background-color: rgba(0, 0, 0, 0.81);
  width: px2rem(400px);
  height: px2rem(180px);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: px2rem(28px);
  border-radius: 4px;
}
</style>

