import { join, dirname } from 'path';
import { sync as mkdirp } from 'mkdirp';
import { TelescopeBuilder } from '../builder';
import pkg from '../../package.json';
import { writeContentToFile } from '../utils/files';
import { helpers } from '../helpers';

const version = process.env.NODE_ENV === 'test' ? 'latest' : pkg.version;

export const plugin = (
    builder: TelescopeBuilder
) => {

    const indexFile = 'helpers.ts';
    const indexOutFile = join(builder.outPath, indexFile);

    mkdirp(dirname(indexOutFile));

    const header = `/**
  * This file and any referenced files were automatically generated by ${pkg.name}@${version}
  * DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
  * and run the transpile command or yarn proto command to regenerate this bundle.
  */
 \n`;

    writeContentToFile(builder.outPath, builder.options, header + helpers, indexOutFile);

};