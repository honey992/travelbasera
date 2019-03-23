var _ 				= 	require('lodash');
var Q 				=	require('q');
var sendEmailModel 		= 	require('../models/sendEmailModel');
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var sesConfig 			=	require('../../config/ses_config');
var nodemailer      =   require('nodemailer');
var smtpTransport   =   require('nodemailer-smtp-transport');
var ses             =   require('nodemailer-ses-transport');
var middlewares 	= 	lib.middlewares; 
// var transporter     =   nodemailer.createTransport(ses(sesConfig));

var sendEmailService = {
	sendEmailService:function(options, cb){
        var deferred = Q.defer();
		 if(!options)
            return cb(ec.Error({status:ec.INSUFFICENT_DATA, message :"Invalid data to send a mail"}));

		      var transporter = nodemailer.createTransport({
                            service: sendEmailModel.service,
                            host: sendEmailModel.host,
                            port:sendEmailModel.port,
                            secure:sendEmailModel.secure, 
                            auth: {
                                user: sendEmailModel.auth.user,
                                pass: sendEmailModel.auth.pass
                            }
                        });  
                    var mailOptions = {
                        from: sendEmailModel.auth.user,
                        to: options.to,
                        subject: options.subject,
                        html: options.text
                    };
                    debugger;
                    transporter.sendMail(mailOptions, function (error, info) {
                        console.log(error);
                        if (error) {
                             return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Send Email", error : error}));
                        }
                        transporter.close();
                        return cb(null,info);
                    });
	}
};
module.exports = sendEmailService;
