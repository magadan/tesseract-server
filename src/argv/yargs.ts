import Yargs, { terminalWidth } from 'yargs';
import { tmpdir } from 'os';
import { ProcessorSettingsLineEndings } from '../processor';

export const createYargs = (argv: readonly string[], cwd?: string) =>
  Yargs(argv, cwd)
    .parserConfiguration({
      'dot-notation': false,
      'camel-case-expansion': false,
    })
    .wrap(terminalWidth())
    .scriptName('tesseract-server')
    .usage(
      [
        '$0 [options]',
        '',
        'A small lightweight http server exposing tesseract as a service.',
      ].join('\n'),
    )
    .options({
      'pool.default.min': {
        description: 'Minimum number of processes to keep waiting in each pool',
        default: 0,
        type: 'number',
      },
      'pool.default.max': {
        description:
          'Maximum number of processes to spawn for each pool after which requests are queued',
        default: 2,
        type: 'number',
      },
      'pool.default.idleTimeoutMillis': {
        description:
          'Time (in milliseconds) a processes can stay idle in queue before eviction',
        default: 5000,
        type: 'number',
      },
      'pool.default.evictionRunIntervalMillis': {
        description: 'Time interval (in milliseconds) between eviction checks',
        default: 5000,
        type: 'number',
      },
      'http.listen.address': {
        description: 'Set http listen address',
        default: process.env.HOST != null ? process.env.HOST : '127.0.0.1',
        type: 'string',
      },
      'http.listen.port': {
        description: 'Set http listen port',
        default: process.env.PORT != null ? Number(process.env.PORT) : 8884,
        type: 'number',
      },
      'http.upload.tmpDir': {
        description: 'Path to where temp uploads are saved to',
        default: tmpdir(),
        type: 'string',
      },
      'http.endpoint.status.enable': {
        description: 'Enable /status endpoint',
        default: true,
        type: 'boolean',
      },
      'http.endpoint.health.enable': {
        description:
          'Enable /.well-known/health/* endpoints and health checkers',
        default: true,
        type: 'boolean',
      },
      'http.endpoint.webui.enable': {
        description: 'Enable Web UI at /',
        default: true,
        type: 'boolean',
      },
      'http.input.optionsField': {
        description: 'Multipart field name containing OCR Options',
        default: 'options',
        type: 'string',
      },
      'http.input.fileField': {
        description: 'Multipart field name containing OCR file',
        default: 'file',
        type: 'string',
      },
      'http.output.jsonSpaces': {
        description:
          'Enable json pretty printing and set number of spaces to use for indentation',
        default: 0,
        type: 'number',
      },
      'processor.lineEndings': {
        description: 'Set line ending policy',
        type: 'string',
        default: 'auto',
        choices: [
          ProcessorSettingsLineEndings.AUTO,
          ProcessorSettingsLineEndings.LF,
          ProcessorSettingsLineEndings.CRLF,
        ],
      },
    })
    .example([
      ['$0 --http.output.jsonSpaces 2', 'Enable JSON pretty printing'],
      [
        '$0 --http.endpoint.status.enable false --http.endpoint.health.enable false',
        'Disable Status and Health endpoints',
      ],
    ])
    .epilogue(
      [
        'References:',
        '  GitHub: https://github.com/hertzg/tesseract-server',
        '  Discussions: https://github.com/hertzg/tesseract-server/discussions',
        '  Issues: https://github.com/hertzg/tesseract-server/issues',
      ].join('\n'),
    );
