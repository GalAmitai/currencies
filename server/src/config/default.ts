import dotenv from 'dotenv';

dotenv.config();

export default {
    app_settings: {
        mode: 'dev', // dev OR production
        port: process.env.SERVER_PORT || 4000
    },
    redis: {
        host: process.env.SERVER_PORT || ''
    }
}