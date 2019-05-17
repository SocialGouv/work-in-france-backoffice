export const asTimestamp = (dateUTC?: string) => {
    if (dateUTC) {
        return new Date(dateUTC).getTime();
    }
    return null;
}

export const asNumber = (args: string | undefined, defaultValue: number) => {
    if (args == null || args === undefined) {
        return defaultValue;
    }
    return Number.parseInt(args, 10)
}

export const asDate: (args: number | string | undefined | null) => Date | null = (args) => {
    if (!args) {
        return null;
    }
    return new Date(args);
}