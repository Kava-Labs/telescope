import { createAminoConverter } from './index';
import { ProtoStore } from '@osmonauts/proto-parser'
import { snake } from 'case';
import { camel } from '@osmonauts/utils';
import { prepareContext, expectCode, getTestProtoStore } from '../../../../test-utils'
const store = getTestProtoStore();
store.traverseAll();

describe('osmosis/gamm/v1beta1/tx', () => {
    const {
        context, protos, root
    } = prepareContext(store, 'osmosis/gamm/v1beta1/tx.proto')

    it('AminoConverter', () => {
        context.options.aminoEncoding.casingFn = camel;

        expectCode(createAminoConverter({
            context,
            root,
            name: 'AminoConverter',
            protos
        }))
    })
});

describe('cosmos/staking/v1beta1/tx', () => {
    const {
        context, protos, root
    } = prepareContext(store, 'cosmos/staking/v1beta1/tx.proto')

    it('AminoConverter', () => {
        context.options.aminoEncoding.casingFn = snake;

        expectCode(createAminoConverter({
            context,
            root,
            name: 'AminoConverter',
            protos
        }))
    })
});


describe('evmos/fees/v1/tx', () => {
    const {
        context, protos, root
    } = prepareContext(store, 'evmos/fees/v1/tx.proto')

    it('AminoConverter', () => {
        context.options.aminoEncoding.casingFn = snake;

        expectCode(createAminoConverter({
            context,
            root,
            name: 'AminoConverter',
            protos
        }))
    })
});

