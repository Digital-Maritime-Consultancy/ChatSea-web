export const isS100File = (content: string):boolean => {
    if (content.startsWith('<?xml')) {
        return true;
    } else if (content.startsWith('FILE') && content.split('FILE').length === 3) {
        return true;
    }
    return false;
}