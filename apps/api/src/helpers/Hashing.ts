import bcrypt from 'bcrypt';
const saltRounds = 10;

interface IHashPasswordParams {
    password: string
}

interface IComparePasswordParams {
    passwordFromClient: string,
    passwordFromDb: string
}

export const HashPassword = async ({ password }: IHashPasswordParams) => {
    return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async ({ passwordFromClient, passwordFromDb }: IComparePasswordParams) => {
    return await bcrypt.compare(passwordFromClient, passwordFromDb)
}