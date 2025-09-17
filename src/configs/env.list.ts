import { EnvList } from '../types';

export const envList: EnvList = [
    {
        key: 'APPLICATION_NAME',
        required: true,
        description: 'Application name',
    },
    {
        key: 'APPLICATION_VERSION',
        required: true,
        description: 'Application version',
    },
    {
        key: 'ENV',
        required: true,
        description: 'Application environment (local, development, production, test)',
    },
    {
        key: 'NODE_ENV',
        required: true,
        description: 'Node environment (development, production, test)',
    },
    {
        key: 'SERVER_PORT',
        required: true,
        description: 'Express server port',
    },
    {
        key: 'MONGODB_URI',
        required: true,
        description: 'MongoDB connection URI',
    },
    {
        key: 'MONGODB_DB',
        required: true,
        description: 'MongoDB database name',
    },
    {
        key: 'USERS_COLLECTION',
        required: true,
        description: 'MongoDB users collection name',
    },
    {
        key: 'GOOGLE_CLOUD_PROJECT',
        required: true,
        description: 'Google Cloud project ID',
    },
];
