export interface UserProfile {
    id: string;
    email:string;
    username: string;
    numberPhone: string;
    createdAt: string;
    accountStatus: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | 'DELETED' | 'BLOCKED';
}

