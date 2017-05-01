<script>
  export default {
    // http://loo2k.com/blog/detecting-wechat-client/
    isWechat() {
      let ua = navigator.userAgent
      return /micromessenger/i.test(ua) || typeof navigator.wxuserAgent !== 'undefined'
    }
  }
</script>
