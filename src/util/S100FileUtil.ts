export const isS100File = (content: string):boolean => {
    if (content.startsWith('<?xml')) {
        return true;
    } else if (content.startsWith('FILE') && content.split('FILE').length === 3) {
        return true;
    }
    return false;
}

export const getS100FileName = (content: string):string => {
    if (content.startsWith('<?xml')) {
        return 's100.xml';
    } else if (content.startsWith('FILE') && content.split('FILE').length === 3) {
        return content.split('FILE')[1];
    }
    return '';
}