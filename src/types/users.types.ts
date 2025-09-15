import { UserProfiles } from '../constants';

export type GreetResponse = {
    message: string;
};

export type CreateUserRequest = {
    name: string;
    username: string;
    profile: UserProfiles;
    modifierId?: string;
};

export type CreateUserResponse = {
    userId: string;
    username: string;
};
