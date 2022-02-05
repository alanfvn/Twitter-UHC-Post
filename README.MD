# Twitter-UHC-Post

This twitter bot gathers tweets from a [twitter list](https://help.twitter.com/en/using-twitter/twitter-lists) and checks if there's a 'time.is' within all of the recent tweets of the list and if theres one and the tweet is not more old than 20 minutes it proceeds to post the original tweet into your account, this bot maybe useful for accounts that promote [UHC](https://www.urbandictionary.com/define.php?term=UHC) games on twitter.


## Installation

In order  to use this bot you need [Node.js](https://nodejs.org/es/download/current/) and set the following environment variables:


* `key`: Your twitter api key. 
* `secret`: Your twitter secret.
* `token`: Your twitter token.
* `token_secret`: Your twitter token secret.

*all of the above can be obtained [here](https://developer.twitter.com/apps)*

* `list_id`: The id of a twitter list 
containing all the members you want to check.

