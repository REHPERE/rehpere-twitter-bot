var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

function main(){
	client.stream('statuses/filter', {track: '#rehpere'},  function(stream) {
	  stream.on('data', function(tweet){
	    if(!tweet.retweeted_status){
				client.post('statuses/retweet/' + tweet.id_str, function(error, tweet, response) {
				  if(!error) {
				  	console.log('------ Tweet intercepted ------');
				  	console.log(tweet.text);
				    console.log("Tweet posted !");
				  } else {
				  	console.log("An error occured");
				  	console.log(error);
				  };
				});
	  	};
	  });
	  stream.on('error', function(error){
	    console.log(error);
	    setTimeout(main, 960000) // Wait at least 15mn before relaunching the stream listener
	  });
	});
};

main();