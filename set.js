const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEdLUHpuQTFPdXZaVy9WRW9hekNFeWdEUnkvbTNvTVJaWG5XYnhSb1BFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHhId0VWc3ZKN05GOXFTRUVrVXhNUE1YQzRITXhxVlRZZnl3Ri9NMTNuMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDR2tkQjUrNXJHRzNtSkdLQXlOQ2I4SWo5MXRDR3g1RFlYNmNldTQ0REVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSQzRGVFpZZ21TN3B5azZZcVdtUVlXNG16VFBDaXBVUE1pQlRQKzVacWtRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGQjdpTEtUOG1QY3Q0VW81VGlDMEprWTMrUnFheW5hUm5OSFdvUlR2SDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlqY0VSQmZTT2M5NVdhVnZqd2ZlUjMwZDR4WDVBMHJYS2lFcmlzemNPekE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tYdko5M3pkUWNnZ1ljbXR1RzdWZEU4Z1lUdkMycTNTRVh1Y2tFcUVFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkwwR3JpNEpZSHFLdUNZU1FGQmpibGhjaEsrbVBjNHFEQm1LRzg4Vkh4TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1uOU9USGJBZTZjMFJCRUpSK2RaNzlPdUxRV2VzTUY2WUhuM3ZiNHJEb3h3ak5ScytaeTZlaWt3RjlhdEs0cktRNGYwUW1FUGxBazRzb2lZRDlZbkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiUnR1cjk5MXdKYnJad0pFYW9GUUJTb1lQN1ZoOUtiL2JLb2oyZ3lQNndmND0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicmJQTkdMRHRUM0NRNXNBZHZWNnduZyIsInBob25lSWQiOiI1OGI2NjYwZC1iNmI0LTRjMDUtOGNkMC0xNTdiYjM1NTNhNzYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajRsb0JwYjBURnMxNHJLNTNjMUlhUTBReU9jPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZNTTNoSjA4VHJ4ajJSTkZZWmo4WSt2MXVqQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJCRks1QkZWViIsIm1lIjp7ImlkIjoiMjM0OTAyNjkxOTk4ODo1OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJ+U2FtbWllfiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDJGMm80RkVLTEw0cllHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVXhVRytETDRBR0ZFNWlaem1Zd25DUVMwdUVMamo5QmlvMTBqVm53dlRWcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoienYvUytSZXAvendQNnNUc0MzSHF5N2lkYmFUV1I4bndhZkpWMmhncEdjenN0Q2RGOVZ3bkFJYzNjVkRIaW5UYjhGN0VwYXZsNXp4SnY5YzRVV1RIRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IkpMRHJiMnY4cE4zcDRaeEtMeWcyOXMrSDVSZDRDYXhPZWFpcjgrTTJBV20vb0VtZ3RQMVhEcTFTTWEvWm5seGdBd0UzUjJvNis4SE1rTTduM21zYUNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAyNjkxOTk4ODo1OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWTVZCdmd5K0FCaFJPWW1jNW1NSndrRXRMaEM0NC9RWXFOZEkxWjhMMDFiIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NDc0MjIzfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Sammie",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2349136429929", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'SAMUEL-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "Public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

