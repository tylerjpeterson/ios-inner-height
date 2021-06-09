import {expectType} from 'tsd';
import iosInnerHeight = require('..');

expectType<() => number>(iosInnerHeight);
expectType<number>(iosInnerHeight());
