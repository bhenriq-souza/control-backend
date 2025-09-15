/**
 * Environment Types
 */
export type EnvVariable = {
    key: string;
    required: boolean;
    default?: string;
    description?: string;
};

export type EnvList = EnvVariable[];

/**
 * Environment Errors
 */
export class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
        Object.setPrototypeOf(this, EnvironmentError.prototype);
    }
}

export class EnvVarsNotFoundError extends EnvironmentError {
    constructor(missingVars: EnvVariable[]) {
        const message = `Missing required environment variables: ${missingVars.map((v) => v.key).join(', ')}`;
        super(message);
        this.name = 'EnvVarsNotFoundError';
        Object.setPrototypeOf(this, EnvVarsNotFoundError.prototype);
    }
}
