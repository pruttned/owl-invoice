const baseErr = 'Failed to process request';
class Notification {
    toErrorMessage(error: any): string {
        if (error && error.graphQLErrors && error.graphQLErrors.length){
            return `${baseErr}: ${error.graphQLErrors[0].message}`;
        }
        return baseErr;
    }
}

export const notification = new Notification();
