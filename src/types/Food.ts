export interface Food {

    id: string;
    name: string;
    description?: string;
    image?: string;
    price: string;
    rating?: string;
    open?: boolean;
    logo?: string;
    createdAt?: string;
    status?: 'Open' | 'Closed';

}

