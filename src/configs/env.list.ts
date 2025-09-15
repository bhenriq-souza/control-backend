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
];
