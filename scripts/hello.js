
const Conversation = require('hubot-conversation');
const request = require("request");

function retrieveData(emoji, fn){
  let options = {
      method: 'GET',
      url: 'https://api.edamam.com/search',
      qs: { q: emoji},
      headers:  {
          app_key: 'ec2f10d240950e0480ad22ff5dd9cf3d',
          app_id: '31383ea0'
      }
  };

  request(options, function (error, response, body) {
     if (error) throw new Error(error);
     const apiresults = JSON.parse(body)
     fn(apiresults)
  });
};


const outputRecipes = (results) => {
    let obj = new Object();
    let attachmentValueArray = [];
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
            }
      );
    };
    obj.attachments = attachmentValueArray
    return obj
  }


module.exports = (bot) => {
  bot.enter(res => {
    res.send("Welcome to Emoji Eats. Send me a food emoji and I'll search for some recipes you can try");
  });

  const switchBoard = new Conversation(bot);

  bot.hear(/(.*)/, res => {
    const emojiList = {
      ':apple:':          'apple',
      ':pear:':           'pear',
      ':green_apple:':    'green apple',
      ':tangerine:':      'tangerine',
      ':lemon:':          'lemon',
      ':banana:':         'banana',
      ':watermelon:':     'watermelon',
      ':grapes:':         'grapes',
      ':strawberry:':     'strawberry',
      ':melon:':          'melon',
      ':cherries:':       'cherries',
      ':peach:':          'peach',
      ':pineapple:':      'pineapple',
      ':tomato:':         'tomato',
      ':eggplant:':       'eggplant',
      ':hot_pepper:':     'hot pepper',
      ':corn:':           'corn',
      ':sweet_potato:':   'sweet potato',
      ':honey_pot:':      'honey',
      ':bread:':          'bread',
      ':cheese_wedge:':   'cheese',
      ':poultry_leg:':    'chicken',
      ':meet_on_bone:':   'beef',
      ':fried_shrimp:':   'prawn',
      ':egg:':            'egg',
      ':hamburger:':      'burger',
      ':fries:':          'fries',
      ':hotdog:':         'hotdog',
      ':pizza:':          'pizza',
      ':spaghetti:':      'spaghetti',
      ':taco:':           'taco',
      ':burrito:':        'burrito',
      ':ramen:':          'ramen',
      ':stew:':           'stew',
      ':fish_cake:':      'fish cake',
      ':sushi:':          'sushi',
      ':bento:':          'bento',
      ':curry:':          'curry',
      ':rice_ball:':      'rice ball',
      ':rice:':           'rice',
      ':rice_cracker:':   'rice cracker',
      ':oden:':           'one pot',
      ':dango:':          'sweet dumpling',
      ':shaved_ice:':     'shaved ice',
      ':ice_cream:':      'sundae',
      ':icecream:':       'icecream',
      ':cake:':           'cake',
      ':birthday:':       'birthday cake',
      ':custard:':        'custard',
      ':candy:':          'candy',
      ':lollipop:':       'lollipop',
      ':chocolate_bar:':  'chocolate',
      ':popcorn:':        'popcorn',
      ':doughnut:':       'doughnut',
      ':cookie:':         'cookie',
      ':beer:':           'ale',
      ':beers:':          'beer',
      ':wine_glass:':     'wine',
      ':cocktail:':       'cocktail',
      ':tropical_drink:': 'mocktail',
      ':champagne:':      'champagne',
      ':sake:':           'sake',
      ':tea:':            'tea',
      ':coffee:':         'coffee',
      ':baby_bottle:':    'milk',
      ':fork_and_knife:': 'fork',
      ':knife_fork_plate:':'plate'
    }

    for (var prop in emojiList) {
      if (res.match[1] === prop) {
        const dialog = switchBoard.startDialog(res, 100000);

        retrieveData(emojiList[prop], results => {
          const apidata = bot.brain.set(results)
          res.send(outputRecipes(results), function() {
            res.send('\nWould you like to see the ingredients for your favourite recipe?\nEnter the recipe number between 1-5 to see the list of ingredients\n \n1. ' + results.hits[0].recipe.label + '\n2. ' + results.hits[1].recipe.label  + '\n3. ' + results.hits[2].recipe.label + '\n4. ' + results.hits[3].recipe.label + '\n5. ' + results.hits[4].recipe.label)
            dialog.addChoice(/(.*)/i, res => {
              const ingredChoice = parseInt(res.match[1])-1
              res.reply('\nThe ingredients used in ' + apidata.data._private.hits[ingredChoice].recipe.label + ' are:\n' + apidata.data._private.hits[ingredChoice].recipe.ingredientLines.join('\r\n') + '\n\nWould you like to know how many servings are in this recipe and its diet label?')
              dialog.addChoice(/yes/, res2 => {
                  res2.reply('\nThis recipe serves ' + apidata.data._private.hits[ingredChoice].recipe.yield + ' and the diet label is ' + apidata.data._private.hits[ingredChoice].recipe.dietLabels.join(' '));
              })
              dialog.addChoice (/no/i, res2 => {
                  res2.reply('Fine...work it out yourself');
              })
            });
          });
        });
      }
    }
  });

}
