import { ApolloServerErrorCode } from '@apollo/server/errors';

export function formatError(formattedError: any, error: any) {
    // ERROR: QUERY GET-USER CANNOT RETURN A NULL VALUE
    if (
        formattedError.message.startsWith(
            'Cannot return null for non-nullable field Query.user.'
        )
    ) {
        const errorResponse = {
            DatabaseError: 'User Not Found',
            description: 'The requested user could not be found'
        };

        return errorResponse;
    }
    // ERROR: QUERY GET-POST CANNOT RETURN A NULL VALUE
    if (
        formattedError.message.startsWith(
            'Cannot return null for non-nullable field Query.post.'
        )
    ) {
        const errorResponse = {
            DatabaseError: 'Post Not Found',
            description: 'The requested post could not be found'
        };

        return errorResponse;
    }
    // ERROR: ID NOT FOUND IN THE DATABASE
    if (formattedError.message.startsWith('false')) {
        const errorResponse = {
            DatabaseError: 'User Not Found',
            description:
                'The user you are trying to edit could not be found. Please, ensure that you have provided the correct _id.'
        };

        return errorResponse;
    }
    // ERROR: INVALID USER ID
    if (
        formattedError.message.startsWith(
            'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer'
        )
    ) {
        const errorResponse = {
            ServerError: 'Invalid _id',
            description: `${formattedError.message}`
        };

        return errorResponse;
    }
    //THIS HANDLES SERVER ERROR - DATA VALIDATION
    if (
        formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT
    ) {
        const errorMessage = formattedError.message;

        const variableMatch = errorMessage.match(/Variable "\$(\w+)"/);
        const variable = variableMatch ? variableMatch[1] : '';

        const fieldMatch = errorMessage.match(/at "(.*?)";/);
        const field = fieldMatch ? fieldMatch[1].split('.').pop() : '';

        const dataTypeMatch = errorMessage.match(/; (.+?) cannot represent/);
        const dataType = dataTypeMatch ? dataTypeMatch[1] : '';

        const errorResponse = {
            ServerError: 'Invalid input',
            description: `The ${field} field of ${variable} only accepts ${dataType} values. Please ensure you provide the correct data type for each field.`
        };

        return errorResponse;
    }
    // THIS HANDLES DATABASE ERROR - DATA VALIDATION
    if (formattedError.message.startsWith('DatabaseError')) {
        const errorLines = formattedError.message.split('\n');

        let error = '';
        let propertiesNotSatisfied = '';
        let description = '';

        for (const line of errorLines) {
            if (line.includes('DatabaseError:')) {
                error = line.split(':')[1]?.trim();
            } else if (line.includes('propertiesNotSatisfied:')) {
                propertiesNotSatisfied = line
                    .split(':')[1]
                    ?.replace(/,$/, '')
                    ?.trim();
            } else if (line.includes('description:')) {
                description = line.split(':')[1]?.trim();
            }
        }

        const errorResponse = {
            DatabaseError: error,
            description: description,
            propertiesNotSatisfied: propertiesNotSatisfied
        };

        return errorResponse;
    }

    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
}
