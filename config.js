    module.exports = {
		
		appsecret : 'anappleadaykeepsdoctoraway',
        
        database : process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',
		
		mailgun: {
    			user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    			password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  		},
          
        socialkeys: {
          facebook: {
            clientID: process.env.FACEBOOK_ID || '754220301289665',
            clientSecret: process.env.FACEBOOK_SECRET || '41860e58c256a3d7ad8267d3c1939a4a',
          },
          twitter: {
            consumerKey: process.env.TWITTER_KEY || '6NNBDyJ2TavL407A3lWxPFKBI',
            consumerSecret: process.env.TWITTER_SECRET  || 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa',
           },
        
          google: {
            clientID: process.env.GOOGLE_ID || '828110519058.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_SECRET || 'JdZsIaWhUFIchmC1a_IZzOHb',
           }
        }
    };
