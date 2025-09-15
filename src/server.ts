import { App } from './app';
import { config } from 'dotenv';

if (process.env.ENV === 'local') {
    config({ path: './.env.local' });
}

const serverPort = process.env.SERVER_PORT || 4200;

(async () => {
    const appBuilder = new App();
    const app = await appBuilder.build();

    app.listen(serverPort, () => {
        console.log(`Server is running on port ${serverPort}`);
    });
})().catch((err) => {
    console.error('Fatal bootstrap error:', err);
    process.exit(1);
});
