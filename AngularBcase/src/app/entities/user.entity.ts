export interface UserJWTHttp {
    firstname: string
    lastname: string
    roles: string[]
    username: string
    iat: number
    exp: number
}

export interface UserJWT {
    firstname: string
    lastname: string
    roles: string[]
    username: string
}

export namespace UserJWT { //mapper
    export function fromHttp(userJWTHttp: UserJWTHttp): UserJWT {
        return {
            firstname: userJWTHttp.firstname,
            lastname: userJWTHttp.lastname,
            roles: userJWTHttp.roles,
            username: userJWTHttp.username
        };
    } 
}