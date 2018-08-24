import test from 'ava';
import match from '../src/';

const params = {
    a: 1,
    b: 2,
    c: 'a',
};

/**
 * test for the object param
 */
test.serial('Object test', (t) => {
    const result = match.parse(params, {
        d: '~{a}',
    });
    t.deepEqual(result, {
        d: 1,
    });
});
