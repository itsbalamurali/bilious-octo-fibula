    module.exports = {
		
		appsecret : 'anappleadaykeepsdoctoraway',
        database : process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',
		
		mailgun: {
    			user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    			password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  		},
    };
