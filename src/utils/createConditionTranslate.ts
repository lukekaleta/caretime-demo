type ConditionTranslateTypes = {
    first: string;
    second: string;
    condition: boolean;
};

const createConditionTranslate = ({
    first,
    second,
    condition,
}: ConditionTranslateTypes) => {
    if (condition) {
        return first;
    } else if (!condition) {
        return second;
    } else {
        return '';
    }
};

export default createConditionTranslate;
