import type { Document } from 'mongodb';
import { UserProfiles } from '../constants';

export class UserEntity extends Document {
    name: string;
    username: string;
    profile: UserProfiles;
    createdAt: Date;
    lastUpdate: Date;
    modifierId: string;
}
