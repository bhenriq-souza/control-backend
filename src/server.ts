import { App } from './app';
import { config } from 'dotenv';

if (process.env.ENV === 'local') {
    config({ path: './.env.local' });
}

const serverPort = process.env.SERVER_PORT || 4200;

const appBuilder = new App();
const app = appBuilder.build();

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});
