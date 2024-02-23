const fs = require('fs');
const winston = require('winston');

//this is used to genrate a log file...
const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'requeest-logging'},
    transports:[
        new winston.transports.File({filename:'log.txt'},)
    ]
})

// this can also done using library- winston so more detail go to documentation.
// async function log(logData){
//     try {
//         logData = new Date().toString()+"\n"+logData+"\n";
//         await fsPromise.appendFile('log.txt', logData);
//     } catch (err) {
//         console.log(err);
//     }
//   }
  
  
   loggerMiddleware = async (req, res, next) => {
    if(!req.url.includes('singin')){
      const logData = `req URL:${req.url} \n reqBody:${JSON.stringify(req.body)}`;
    //   await log(logData);
        logger.info(logData);
    }
  };

module.exports = loggerMiddleware;