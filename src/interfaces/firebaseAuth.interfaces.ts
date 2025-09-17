export interface IFirebaseAuthProvider {
    verifyToken(token: string): Promise<{ email: string; uid: string } | null>;
}
