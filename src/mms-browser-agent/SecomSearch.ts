export interface ResponseSearchObject {
    searchServiceResult: SecomSearchResult[]
}

export interface SecomSearchResult {
    instanceId: string,
    version: string,
    name: string,
    status: string,
    organizationId: string,
    endpointUri: string,
    endpointType: string,
    keywords: string[],
    unlocode: string[],
    certificates: MirCertificate[]
}

export interface MirCertificate {
    certificate: string,
    start: string,
    end: string,
    serialNumber: string,
    revoked: boolean,
    revokedAt: string,
    revokeReason: string
}
