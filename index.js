const fetch = require('node-fetch');
var randomize = require('randomatic');
const md5Hex = require('md5-hex');
const readlineSync = require('readline-sync');
var random = require('random-name')
const random_useragent = require('random-useragent');
const delay = require('delay');

const functionRegist = (fingerprint, reff, email, firstName, lastName) => new Promise((resolve, reject) => {
    const bodys = {
        fingerprint: fingerprint,
        referredBy: reff,
        referredAt: 1585158085684,
        referrerUrl: `https://unifyre.io/waitlist-referral/?grsf=${reff}`,
        metadata: {gdprAgreements: []},
                    reCaptchaResponse: null,
                        email: email,
                            firstName: firstName,
                                lastName: lastName
     }
   
       fetch('https://api.growsurf.com/api/v2/client/campaign/s5isz0/participant', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'Host': 'api.growsurf.com',
            'Connection': 'keep-alive',
            'Content-Length': 294,
            'Accept': 'application/json, text/plain, */*',
            'Sec-Fetch-Dest': 'empty',
            'User-Agent': random_useragent.getRandom(),
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://unifyre.io',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Referer': `https://unifyre.io/waitlist-referral/?grsf=${reff}`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
           }
       })
       .then(res => res.json())
       .then(result => {
      //  const $ = cheerio.load(result);
        // const resText = $('h7').text();
           resolve(result);
       })
       .catch(err => reject(err))
   });

(async () => {
    const reff = readlineSync.question('[?] Reff: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
    try {
       const firstName = random.first()
       const lastName = random.last()
       const nom = randomize('0', 5)
       const email = `${firstName}${nom}@gmail.com`
       const rand = randomize('Aa0', 10)
       const fingerprint = md5Hex(rand)
       await delay(5000)
       const regist = await functionRegist(fingerprint, reff, email, firstName, lastName)
       console.log(regist)
    } catch (e) {
        console.log(e)
    }
}
})()
