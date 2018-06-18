var _ 				= 	require('lodash');
var Q 				=	require('q');
var sendEmailModel 		= 	require('../models/sendEmailModel');
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var nodemailer      =   require('nodemailer');
var smtpTransport   =   require('nodemailer-smtp-transport');
var middlewares 	= 	lib.middlewares; 

var sendEmailService = {
	sendEmailService:function(options, cb){
        var deferred = Q.defer();
		 if(!options)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to send a mail"}));

		      var transporter = nodemailer.createTransport(smtpTransport({
                            service: sendEmailModel.service,
                            host: sendEmailModel.host,
                            auth: {
                                user: sendEmailModel.auth.user,
                                pass: sendEmailModel.auth.pass
                            }
                        }));

                    var mailOptions = {
                        from: sendEmailModel.auth.user,
                        to: options.to,
                        subject: options.subject,
                        text: options.text
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                             return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Send Email"}));
                        }
                        transporter.close();
                        return cb(null,info);
                    });
	}
};
module.exports = sendEmailService;
