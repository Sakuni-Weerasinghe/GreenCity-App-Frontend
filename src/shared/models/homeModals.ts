export interface CollectionCenterListResponse {
    status: boolean;
    response: CollectionCenterSummary[];
}

export interface CollectionCenterSummary {
    username: string;
    centerName: string;
    wasteType: string;
    location: string;
}