import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}
