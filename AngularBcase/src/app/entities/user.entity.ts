export interface UserJWTHttp {
    id: number
    firstname: string
    lastname: string
    roles: string[]
    username: string
    iat: number
    exp: number
}

export interface UserJWT {
    id: number
    firstname: string
    lastname: string
    roles: string[]
    username: string
}

export namespace UserJWT { //mapper
    export function fromHttp(userJWTHttp: UserJWTHttp): UserJWT {
        return {
            id: userJWTHttp.id,
            firstname: userJWTHttp.firstname,
            lastname: userJWTHttp.lastname,
            roles: userJWTHttp.roles,
            username: userJWTHttp.username
        };
    } 
}

export interface UserHttp {
    id: number;
    email: string;
    roles: string[];
    gender: string;
    lastname: string;
    firstname: string;
    birthdate: string;
    tag: string;
    profilpic: string;
    adress: string;
    postalcode: string;
    city: string;
    country: string;

    //spaces?: SpaceHttp[];
}

export interface User {
    id: number;
    email: string;
    roles: string[];
    gender: string;
    lastname: string;
    firstname: string;
    birthdate: string;
    tag: string;
    profilpic: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;

    //spaces?: Space[];
}

export namespace User {
    export function fromHttp(userHttp: UserHttp): User {
        const user = {
            id: userHttp.id,
            email: userHttp.email,
            roles: userHttp.roles,
            gender: userHttp.gender,
            lastname: userHttp.lastname,
            firstname: userHttp.firstname,
            birthdate: userHttp.birthdate,
            tag: userHttp.tag,
            profilpic: userHttp.profilpic,
            address: userHttp.adress,
            postalcode: userHttp.postalcode,
            city: userHttp.city,
            country: userHttp.country
        }

        // if(userHttp.spaces) {
        //     user.spaces = userHttp.spaces.map(space => Space.fromHttp(space))
        // }
        return user;
    }
}