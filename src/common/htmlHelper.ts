import dateformat from 'dateformat';

class HtmlHelper {
    public capitalizeFirstLetter(input: string): string {
        if (!input || !input.length) return input;
        return input.charAt(0).toUpperCase() + (input.length > 1 ? input.substr(1) : '');
    }

    public formatDate(input: Date): string {
        return dateformat(input, 'd. m. yyyy');
    }

    public preserveLineEndings(input: string): string | null {
        if (!input) return null;
        return input.replace('\n', '<br>');
    }
}

export const htmlHelper = new HtmlHelper();