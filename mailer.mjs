import nodemailer from 'nodemailer';
import juice from 'juice';
import handlebars from 'handlebars';

import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export async function send(tmpl, rcpt, data) {
  const tf = (await reafFile(path.join(__dirname, 'mails', `${tmpl}.html`))).toString('utf-8');
  
  const render = handlebars.compile(tf);
  const html = render(data);

  const filtered = juice(html);

  // TODO: send
  console.log(filtered);
}

export default {
  send,
};
