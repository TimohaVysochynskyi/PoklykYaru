export type EventType = {
    _id?: string;
    title: string;
    path: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    buttonText?: string;
    buttonLink?: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
};
