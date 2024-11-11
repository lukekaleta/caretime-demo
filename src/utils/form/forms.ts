export type FormRemoteValues = Record<string, unknown>;

export function formatInitials(values: FormRemoteValues): FormRemoteValues {
    const newValues: FormRemoteValues = {};

    Object.keys(values).forEach((key) => {
        // use empty string as value when is empty
        if (values[key] === null || values[key] === undefined) {
            newValues[key] = '';
            return;
        }

        // copy value to new values
        newValues[key] = values[key];
    });

    return newValues;
}
