import { ApolloServerErrorCode } from '@apollo/server/errors';

export function formatError(formattedError, error) {
    //MongoServerError: 'Not Found'
    if (
        formattedError.message.startsWith(
            'Cannot return null for non-nullable field Query.user'
        )
    ) {
        const message = formattedError.message;
        const idMatch = message.match(/User not found (\w+)/);
        const id = idMatch ? idMatch[1] : '';

        return {
            MongoServerError: 'Not Found',
            description: 'The requested user could not be found'
        };
    }
    if (
        formattedError.message.startsWith('Cannot read properties of undefined')
    ) {
        const message = formattedError.message;
        const idMatch = message.match(/User not found (\w+)/);
        const id = idMatch ? idMatch[1] : '';

        return {
            MongoServerError: 'Not Found',
            description:
                'The user you are trying to edit could not be found. Please ensure that you have provided the correct ID for the user.'
        };
    }
    // ApolloServerError: '400 Bad Request',
    if (
        formattedError.message.startsWith(
            'Argument passed in must be a string of 12'
        )
    ) {
        return {
            ApolloServerError: '400 Bad Request',
            description: `The Id ${formattedError.message}`
        };
    }
    // ApolloServerError: Invalid input data
    if (
        formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT
    ) {
        const stackTrace = formattedError.extensions.stacktrace[0];

        const dataTypeMatch = stackTrace.match(/;\s(.+?)\s/);
        const dataType = dataTypeMatch ? dataTypeMatch[1] : '';

        const fieldMatch = stackTrace.match(/userInput\.(.+?)(?=";)/);
        const field = fieldMatch ? fieldMatch[1].replace(/\\"/g, '') : '';

        const error = 'Invalid input data';
        const errorDescription = `The ${field} field only accepts ${dataType} values. Please ensure you provide the correct data type for each field.`;

        return {
            ApolloServerError: error,
            description: formattedError.extensions.stacktrace[0]
        };
    }
    // MongoServerError: Invalid input data
    if (formattedError.message.startsWith('MongoServerError: ')) {
        const errorLines = formattedError.message.split('\n');

        let error = '';
        let propertiesNotSatisfied = '';
        let description = '';
        console.log(formattedError.message);
        for (const line of errorLines) {
            if (line.includes('MongoServerError:')) {
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
        return {
            MongoServerError: error,
            description: description,
            propertiesNotSatisfied: propertiesNotSatisfied
        };
    }
    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
}
