type UserValidationFields = "email" | "password" | "confirmPassword"

type UserValidationResponse = {
    statusCode?: number,
    error?:{
        [key in UserValidationFields]?: string
    }
    success?: boolean
}

export type {UserValidationFields, UserValidationResponse}