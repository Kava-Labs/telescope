import { getObjectName, lookup } from '../src/';
import { getTestProtoStore } from '../test-utils';
const store = getTestProtoStore();

it('top-level lookup', () => {
    const ref = store.findProto('cosmos/gov/v1beta1/gov.proto');
    const result = lookup(store, ref, 'VoteOption');
    expect(result).toMatchSnapshot();
    const name = getObjectName('VoteOption', result.scope);
    expect(name).toEqual('VoteOption')

});

it('nested lookup', () => {
    const ref = store.findProto('google/api/expr/conformance/v1alpha1/conformance_service.proto');
    const result = lookup(store, ref, 'Severity');
    expect(result).toMatchSnapshot();
    const name = getObjectName('Severity', result.scope);
    expect(name).toEqual('IssueDetails_Severity')
});

describe('google/api/expr/v1alpha1/checked', () => {
    const ref = store.findProto('google/api/expr/v1alpha1/checked.proto');
    it('Decl', () => {
        const Decl = lookup(store, ref, 'Decl');
        expect(Decl).toMatchSnapshot();
        const name = getObjectName('Decl', Decl.scope);
        expect(name).toEqual('Decl')
    });
    it('IdentDecl', () => {
        const IdentDecl = lookup(store, ref, 'IdentDecl');
        expect(IdentDecl).toMatchSnapshot();
        const name = getObjectName('IdentDecl', IdentDecl.scope);
        expect(name).toEqual('Decl_IdentDecl')
    })
    it('Overload', () => {
        const Overload = lookup(store, ref, 'Overload');
        expect(Overload).toMatchSnapshot();
        const name = getObjectName('Overload', Overload.scope);
        expect(name).toEqual('Decl_FunctionDecl_Overload')
    })
});
describe('recursive nested lookup', () => {
    const ref = store.findProto('cosmos/tx/signing/v1beta1/signing.proto');
    it('Multi', () => {
        const Multi = lookup(store, ref, 'Multi');
        expect(Multi).toMatchSnapshot();
        expect(Multi.scope).toMatchSnapshot();
        const result = getObjectName('Multi', Multi.scope);
        expect(result).toEqual('SignatureDescriptor_Data_Multi')

    });
    it('Data', () => {
        const Data = lookup(store, ref, 'Data');
        expect(Data).toMatchSnapshot();
        expect(Data.scope).toMatchSnapshot();
        const result = getObjectName('Data', Data.scope);
        expect(result).toEqual('SignatureDescriptor_Data')
    });
});
