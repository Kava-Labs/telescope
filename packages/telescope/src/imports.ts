import * as t from '@babel/types';
import { GenericParseContext, importStmt } from '@osmonauts/ast';
import { ServiceMutation } from '@osmonauts/types';

import { ImportHash, ImportObj } from './types';
import { UTILS, getRelativePath } from './utils';
import { TelescopeParseContext } from './build';

const importHashToArray = (hash: ImportHash): ImportObj[] => {
    return Object.entries(hash ?? {})
        .reduce((m, [path, names]) => {
            names.forEach(name => {
                m.push({
                    type: 'import',
                    name,
                    path
                })
            })
            return m;
        }, [])
};

const getProtoImports = (
    context: TelescopeParseContext,
    filename: string
): ImportObj[] => {
    return context.proto.imports
        .map(usage => {
            if (filename === usage.import) return;
            const importPath = getRelativePath(filename, usage.import);
            return {
                type: 'import',
                name: usage.name,
                importAs: usage.importedAs,
                path: importPath
            }
        })
        .filter(Boolean);
};

const getAminoImports = (
    context: TelescopeParseContext,
    filename: string
): ImportObj[] => {
    return context.amino.imports
        .map(usage => {
            if (filename === usage.import) return;
            const importPath = getRelativePath(filename, usage.import);
            return {
                type: 'import',
                name: usage.name,
                importAs: usage.importedAs,
                path: importPath
            }
        })
        .filter(Boolean);
};

const getGenericImports = (
    context: TelescopeParseContext,
    filename: string
): ImportObj[] => {
    return context.generic.imports
        .map(usage => {
            if (filename === usage.import) return;
            const importPath = getRelativePath(filename, usage.import);
            return {
                type: 'import',
                name: usage.name,
                importAs: usage.importedAs,
                path: importPath
            }
        })
        .filter(Boolean);
};

const getParsedImports = (
    context: TelescopeParseContext,
    parsedImports: ImportHash,
    filename: string
): ImportObj[] => {
    const imports = [];
    Object.entries(parsedImports ?? {})
        .forEach(([path, names]) => {
            if (filename === path) return;
            const importPath = getRelativePath(filename, path);
            const aliases = context.ref?.traversed?.importNames?.[path];
            names.forEach(name => {
                let importAs = name;
                if (aliases && aliases[name]) {
                    importAs = aliases[name]
                }
                imports.push({
                    type: 'import',
                    name,
                    importAs,
                    path: importPath
                })
            });
        });
    return imports;
};

const importAs = (name: string, importAs: string, importPath: string) => {
    return t.importDeclaration(
        [
            t.importSpecifier(
                t.identifier(importAs),
                t.identifier(name)
            )
        ],
        t.stringLiteral(importPath)
    )
}



// __helpers__
export const getImportStatements = (
    filepath: string,
    list: ImportObj[]
) => {

    // swap helpers with helpers file...
    const modifiedImports = list.map(imp => {
        if (imp.path === '__helpers__') {
            return {
                ...imp,
                path: getRelativePath(filepath, './helpers')
            }
        }
        return imp;
    });

    const imports = modifiedImports.reduce((m, obj) => {
        m[obj.path] = m[obj.path] || [];
        const exists = m[obj.path].find(el =>
            el.type === obj.type && el.path === obj.path && el.name === obj.name);

        // MARKED AS NOT DRY [google.protobuf names]
        // TODO some have google.protobuf.Any shows up... figure out the better way to handle this
        if (/\./.test(obj.name)) {
            obj.name = obj.name.split('.')[obj.name.split('.').length - 1];
        }

        if (!exists) {
            m[obj.path].push(obj);
        }
        return m;
    }, {})


    return Object.entries(imports)
        .reduce((m, [importPath, imports]: [string, ImportObj[]]) => {
            const defaultImports = imports.filter(a => a.type === 'default');
            if (defaultImports.length) {
                if (defaultImports.length > 1) throw new Error('more than one default name NOT allowed.')
                m.push(
                    t.importDeclaration(
                        [
                            t.importDefaultSpecifier(
                                t.identifier(defaultImports[0].name)
                            )
                        ],
                        t.stringLiteral(defaultImports[0].path)
                    )
                )
            }
            const namedImports = imports.filter(a => a.type === 'import' && (!a.importAs || (a.name === a.importAs)));
            if (namedImports.length) {
                m.push(importStmt(namedImports.map(i => i.name), namedImports[0].path));
            }
            const aliasNamedImports = imports.filter(a => a.type === 'import' && (a.importAs && (a.name !== a.importAs)));
            aliasNamedImports.forEach(imp => {
                m.push(importAs(imp.name, imp.importAs, imp.path));
            });

            const namespaced = imports.filter(a => a.type === 'namespace');
            if (namespaced.length) {
                if (namespaced.length > 1) throw new Error('more than one namespaced name NOT allowed.')
                m.push(
                    t.importDeclaration(
                        [
                            t.importNamespaceSpecifier(
                                t.identifier(namespaced[0].name)
                            )
                        ],
                        t.stringLiteral(namespaced[0].path)
                    )
                )
            }
            return m;
        }, [])
};

const convertUtilsToImports = (context: TelescopeParseContext): ImportObj[] => {
    const list = [];
    const utils = Object.keys({
        ...context.amino.utils,
        ...context.proto.utils,
        ...context.generic.utils
    });

    utils.forEach(util => {
        if (!UTILS.hasOwnProperty(util)) throw new Error('missing Util! ::' + util);
        if (typeof UTILS[util] === 'string') {
            list.push({
                type: 'import',
                path: UTILS[util],
                name: util
            });
        } else {
            list.push(UTILS[util]);
        }
    });
    return list;
};

const convertUtilsToImportsGenric = (context: GenericParseContext): ImportObj[] => {
    const list = [];
    const utils = Object.keys({
        ...context.utils
    });

    // MARKED AS NOT DRY - duplicate of above
    utils.forEach(util => {
        if (!UTILS.hasOwnProperty(util)) throw new Error('missing Util! ::' + util);
        if (typeof UTILS[util] === 'string') {
            list.push({
                type: 'import',
                path: UTILS[util],
                name: util
            });
        } else {
            list.push(UTILS[util]);
        }
    });
    return list;
};

export const buildAllImports = (
    context: TelescopeParseContext,
    allImports: ImportHash,
    filepath: string
) => {
    const imports = aggregateImports(context, allImports, filepath);
    const importStmts = getImportStatements(filepath, imports);
    return importStmts;
};

export const buildAllImportsFromGenericContext = (
    context: GenericParseContext,
    filepath: string
) => {
    const imports: ImportObj[] = convertUtilsToImportsGenric(context);
    const importStmts = getImportStatements(filepath, imports);
    return importStmts;
};

const addSDKTypesToImports = (
    context: TelescopeParseContext,
    imports: ImportObj[]
) => {
    const ref = context.ref;
    return imports.reduce((m, obj) => {
        // SDKType
        // probably wont need this until we start generating osmonauts/helpers inline
        if (obj.type === 'import' && obj.path.startsWith('.')) {
            let lookup = null;
            try {
                lookup = context.store.getImportFromRef(ref, obj.name);
            } catch (e) { }
            const SDKTypeObject = {
                ...obj,
                name: obj.name + 'SDKType',
                importAs: (obj.importAs ?? obj.name) + 'SDKType',
            };

            // MARKED AS NOT DRY [google.protobuf names]
            // TODO some have google.protobuf.Any shows up... figure out the better way to handle this
            if (/\./.test(SDKTypeObject.name)) {
                SDKTypeObject.name = SDKTypeObject.name.split('.')[SDKTypeObject.name.split('.').length - 1];
                SDKTypeObject.importAs = SDKTypeObject.importAs.split('.')[SDKTypeObject.importAs.split('.').length - 1];
            }

            if (lookup && ['Type', 'Enum'].includes(lookup.obj.type)) {
                return [
                    ...m,
                    obj,
                    SDKTypeObject
                ];

            }
        }
        return [
            ...m,
            obj
        ];
    }, []);

}

export const aggregateImports = (
    context: TelescopeParseContext,
    allImports: ImportHash,
    filepath: string
): ImportObj[] => {

    const protoImports: ImportObj[] = getProtoImports(context, filepath);
    const aminoImports: ImportObj[] = getAminoImports(context, filepath);
    const genericImports: ImportObj[] = getGenericImports(context, filepath);
    const parsedImports: ImportObj[] = getParsedImports(context, context.amino.ref.traversed.parsedImports, filepath);
    const additionalImports: ImportObj[] = importHashToArray(allImports);
    const utilities: ImportObj[] = convertUtilsToImports(context);

    const list = []
        .concat(parsedImports)
        .concat(utilities)
        .concat(protoImports)
        .concat(aminoImports)
        .concat(genericImports)
        .concat(additionalImports);

    if (context.options.useSDKTypes) {
        return addSDKTypesToImports(context, list);
    } else {
        return list;
    }
}


export const getImportsFromMutations = (mutations: ServiceMutation[]) => {
    return mutations.map(mutation => {
        return {
            import: mutation.messageImport,
            name: mutation.message
        };
    });
};

// TODO implement ServiceQuery type (it is the same)
export const getImportsFromQueries = (queries: ServiceMutation[]) => {
    return queries.reduce((m, query) => {
        const req = {
            import: query.messageImport,
            name: query.message
        };
        const res = {
            import: query.responseImport,
            name: query.response
        };
        return [...m, req, res];
    }, []);
};

export const getDepsFromMutations = (
    mutations: ServiceMutation[],
    filename: string
) => {
    return getImportsFromMutations(mutations)
        .map(imp => {
            const f = filename;
            const f2 = imp.import;
            if (f === f2) return;
            const importPath = getRelativePath(f, f2);
            return {
                ...imp,
                importPath
            };
        })
        .filter(Boolean)
        .reduce((m, v) => {
            m[v.importPath] = m[v.importPath] ?? [];
            if (!m[v.importPath].includes(v.name)) {
                m[v.importPath].push(v.name);
            }
            return m;
        }, {});
};

export const getDepsFromQueries = (
    queries: any[],
    filename: string
) => {
    return getImportsFromQueries(queries)
        .map(imp => {
            const f = filename;
            const f2 = imp.import;
            if (f === f2) return;
            const importPath = getRelativePath(f, f2);
            return {
                ...imp,
                importPath
            };
        })
        .filter(Boolean)
        .reduce((m, v) => {
            m[v.importPath] = m[v.importPath] ?? [];
            if (!m[v.importPath].includes(v.name)) {
                m[v.importPath].push(v.name);
            }
            return m;
        }, {});
};
