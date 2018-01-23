export interface SimpleUserDto {

    username: string,

}

export const createSimpleUserDto = ({username}: {username: string}): SimpleUserDto => {
    return {
        username
    }
}