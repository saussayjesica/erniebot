
const request = require("request");

function listRecipes(emoji){
  let options = { method: 'GET',
    url: 'https://api.edamam.com/search',
    qs: { q: emoji },
    headers:
     {
       app_key: 'ec2f10d240950e0480ad22ff5dd9cf3d',
       app_id: '31383ea0' } };

    let obj = new Object();
    let attachmentValueArray = [];

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const results = JSON.parse(body)
      for(let i = 0; i < 5; i++) {
      attachmentValueArray.push(
            {
                "fallback": '' + results.hits[i].recipe.label + '',
                "color": "#36a64f",
                "author_name": '' + results.hits[i].recipe.source + '',
                "title": '' + results.hits[i].recipe.label + '',
                "title_link": '' + results.hits[i].recipe.url + '',
                "thumb_url": '' + results.hits[i].recipe.image + '',
                "footer": "Emoji Eats",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            });
      };
      obj.attachments = attachmentValueArray
      console.log(obj);
    });

};





module.exports = (bot) => {



  bot.hear(/:green_apple:/, res => {
    listRecipes('green apple');
  });

  bot.hear(/:apple:/, res => {
    listRecipes('apple');
  });

  bot.hear(/:pear:/, res => {
    listRecipes('pear');
  });

  bot.hear(/:tangerine:/, res => {
    listRecipes('tangerine');
  });

  bot.hear(/:lemon:/, res => {
    listRecipes('lemon');
  });

  bot.hear(/:banana:/, res => {
    listRecipes('banana');
  });

  bot.hear(/:watermelon:/, res => {
    listRecipes('watermelon');
  });

  bot.hear(/:grapes:/, res => {
    listRecipes('grapes');
  });








  bot.respond(/Whats your favorite food?/, res => {
    return res.send("Yeah mate")
  });

  bot.respond(/Hi Ernie! My name is (.*)/i, res => {
    // res.match is an array of matches
    console.log(res.match)

    const name = res.match[1]

    if (name === 'Ernie'){
      return res.send('You are not Ernie--I am Ernie!')
    } else {
      return res.reply(`Nice to meet you, ${name}!`)
    }
  })

  bot.respond(/add (.*) and (.*)/i, res => {
    // parseInt() turns a string into an integer
    const a = parseInt(msg.match[1])
    const b = parseInt(msg.match[2])

    const sum = a + b

    return msg.reply(`${a} + ${b} = ${sum}`)
  })

  bot.respond(/what is your favorite (.*)/, res => {
    const fav = res.match[1]

    console.log(fav)

    if (fav === 'food') {
      return res.reply('I am a robot--I do not eat food!')
    } else if (fav === 'band') {
      return res.reply('It is gotta be Daft Punk!')
    } else if (fav === 'programming language') {
      return res.reply('Javascript, of course!')
    } else {
      return res.reply(`I do not have a favorite ${fav}. What's yours?`)
    }
  })

  bot.respond(/is it a (weekend|holiday)\s?\?/i, res => {
        const today = new Date()

          if (today.getDay() === 0 || today.getDay() === 6) {
            res.reply('YES')
          } else {
            res.reply('NO')
          }

    })

    bot.hear(/i did it/i, res => {
        res.send('Congratulations! Good job!')
    })

    bot.respond(/are you there?/i, res => {
        res.reply('Yes, usually here, and listening.')
    })

    bot.respond(/convert \$(.*) to btc/i, res => {
        const usd = res.match[1]
        res.reply(`That is about  ${usd * 0.0024} in BTC`)
    })

}
