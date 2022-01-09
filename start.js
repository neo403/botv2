const {
  WAConnection,
  MessageType
} = require("@adiwajshing/baileys");
const {
  banner,
  color
} = require("./lib/function");
const fs = require("fs");
const colors = require('colors')


require('./index.js')
nocache('./index.js', module => console.log(`${module} Auto Update © Herman Chanel`))

async function starts(beta = new WAConnection()){
  beta.logger.level = 'warn';
  beta.version = [2, 2146, 9]
  beta.browserDescription = [ 'Jaexploit', 'Safari', '3.0' ];
  console.log(banner.string);
  beta.on('qr', qr => {
     console.log(
       color("[","white"),
       color("∆","red"),
       color("]","white"),
       color("Scan Qr Di Atas Agar Bisa Connecting!","purple")
       );
  });
  
  fs.existsSync('./session.json') && beta.loadAuthInfo('./session.json');
  beta.on('connecting', () => {
  	console.log("[ HC ]", color("Menghubungkan....","cyan"));
  });
  
  beta.on('open', (key) => {
  	console.log("[ HC ]",color("connected","green"));
  	beta.sendMessage(beta.user.jid, "*[ INGFO ] Bot Connect", MessageType.text);
  });

  
  await beta.connect({timeoutMs: 30*1000});
  fs.writeFileSync('./session.json', JSON.stringify(beta.base64EncodedAuthInfo(), null, '\t'));
  
  require("./index.js")(beta);
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional>
 */
function nocache(module, cb = () => {}) {
  console.log("Module", `'${module}'`, "Kami Selalu Memantau Dan Bot Kami Akan Memberikan Informasi Jika Ada Yang recode Script ini!");
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

starts();