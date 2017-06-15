const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const auth = require('./server/routes/auth')
const convert = require('koa-convert');

app.use(convert(function *(next) {
  const start = new Date();
  yield next;

  var status = this.status || 404;
  if (status === 404) this.throw(404);

  const ms = new Date() - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));

router.use('/auth', auth.routes())
app.use(router.routes())

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.listen(8889, () => {
  console.log('Koa is listening in 8889')
})

module.exports = app
