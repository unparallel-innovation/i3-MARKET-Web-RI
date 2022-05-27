import jwtDecode from 'jwt-decode';

export default class User {
    constructor(user) {
        this.access_token = user.access_token;
        this.id_token = user.id_token;

        const decodedAccessToken = jwtDecode(this.access_token);
        this.usernameDID = decodedAccessToken.sub;

        const decodedIdToken = jwtDecode(this.id_token);

        const claims = decodedIdToken.verified_claims.trusted.length > 0 ?
            decodedIdToken.verified_claims.trusted[0] :
            decodedIdToken.verified_claims.untrusted[0];

        const decodedClaims = jwtDecode(claims);
        this.username = decodedClaims.vc.credentialSubject.username;
        this.consumer = decodedClaims.vc.credentialSubject?.consumer;
        this.provider = decodedClaims.vc.credentialSubject?.provider;
        this.marketDID = decodedClaims.iss;

        this.role = this.consumer ? 'Consumer' : 'Provider';
    }
}
