import {TestplaneSuite} from './types';

export const getSuitePath = (suite?: TestplaneSuite): string[] => {
    if (!suite) {
        return [];
    }

    return (suite as TestplaneSuite).root ?
        [] :
        ([] as string[]).concat(getSuitePath(suite.parent as TestplaneSuite)).concat(suite.title);
};
