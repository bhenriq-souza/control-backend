import { inject, injectable } from 'tsyringe';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';

import { IFirebaseAuthProvider } from '../interfaces';
import { EnvServiceSymbol } from '../symbols';
import { EnvService } from '../common';

@injectable()
export class FirebaseAuthProvider implements IFirebaseAuthProvider {
    constructor(@inject(EnvServiceSymbol) private readonly env: EnvService) {
        this.startAdmin();
    }

    private startAdmin() {
        if (!getApps().length) {
            initializeApp({
                credential: applicationDefault(),
                projectId: this.env.getEnv('GOOGLE_CLOUD_PROJECT'),
            });
        }
    }

    public async verifyToken(token: string): Promise<{ email: string; uid: string } | null> {
        const verifier = getAuth();
        const decoded = await verifier.verifyIdToken(token);

        if (!decoded) return null;

        return { email: decoded.email, uid: decoded.uid };
    }
}
