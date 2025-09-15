import { inject, injectable } from 'tsyringe';

import { IEnvService } from '../interfaces';
import { EnvListSymbol, ProcessEnvSymbol } from '../symbols';
import { EnvVariable, EnvVarsNotFoundError } from '../types';
import type { EnvList } from '../types';

@injectable()
export class EnvService implements IEnvService {
    constructor(
        @inject(ProcessEnvSymbol) private readonly env: NodeJS.ProcessEnv,
        @inject(EnvListSymbol) private readonly envList: EnvList,
    ) {
        this.loadEnvVariables();
    }

    private loadEnvVariables(): void {
        const variablesNotFound: EnvVariable[] = [];

        for (const variable of this.envList) {
            const existingValue = this.env[variable.key];

            if (existingValue !== undefined) continue;

            if (variable.default !== undefined) {
                this.env[variable.key] = variable.default;
                continue;
            }

            if (!variable.required) continue;

            variablesNotFound.push(variable);
        }

        if (variablesNotFound.length > 0) {
            throw new EnvVarsNotFoundError(variablesNotFound);
        }
    }

    getEnv(key: string): string {
        return this.env[key];
    }
}
