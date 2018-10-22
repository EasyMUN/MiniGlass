import path from 'path';
import crypto from 'crypto';

import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaStatic from 'koa-static';
import KoaBodyParser from 'koa-bodyparser';

import mongoose from 'mongoose';
import User from './models/user';

import Config from './config';
import Mailer from './mailer';
import BASE from './base';

mongoose.connect(Config.db);

const app = new Koa();

app.use(KoaBodyParser({
  enableTypes: ['json'],
}));

const router = new KoaRouter();

router.get('/check/:email', async ctx => {
  const user = await User.findOne({ email: ctx.params.email });
  
  return ctx.body = {
    exists: !!user,
  };
});

router.put('/reg', async ctx => {
  const data = {
    email: ctx.request.body.email,
    primary: ctx.request.body.primary,
    secondary: ctx.request.body.secondary,
  };

  for(const k in data)
    if(typeof data[k] !== 'string') return ctx.status = 400;
  
  const code
    = await new Promise(resolve => crypto.randomBytes(24, resolve)).then(e => e.digest('hex'));

  data.code = code;

  try {
    await User.insert(data);
  } catch(e) {
    return ctx.status = 400;
  }

  await Mailer.send('verify', data.email, data);
});

router.get('/verify/:code', async ctx => {
  await User.findOneAndUpdate({
    code: ctx.params.code,
  }, {
    $set: { verified: true }
  });
});

app.use(router.routes(), router.allowedMethods());
app.use(KoaStatic(path.join(BASE, 'static')));

app.listen(Config.port, () => {
  console.log(`Server up at ${Config.port}`);
});
