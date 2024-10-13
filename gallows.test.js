import { expect } from 'chai';
import gallows from './gallows.js';

describe('Gallows', () => {
  describe('execute', () => {
    it('performs commands named in directives', () => {
      const result = gallows([
        {
          name: 'echo',
          validate: (attributes, body) => body !== undefined,
          execute: (attributes, body) => body,
          example: {
            attributes: {},
            body: 'Hello, Gallows!'
          },
          description: 'Echoes the provided message'
        }
      ]).execute('echo', {}, 'Hello, Gallows!');
      expect(result).to.equal('Hello, Gallows!');
    });

    it('supports command overloading', () => {
      const result = gallows([
        {
          name: 'echo',
          validate: (attributes, body) => body !== undefined,
          execute: (attributes, body) => body,
          example: {
            attributes: {},
            body: 'Hello, Gallows!'
          },
          description: 'Echoes the provided message'
        },
        {
          name: 'echo',
          validate: (attributes, body) => attributes.message !== undefined,
          execute: (attributes, body) => `Echo: ${attributes.message}`,
          example: {
            attributes: { message: 'Hello, world!' },
            body: undefined
          },
          description: 'Echoes the provided message'
        }
      ]).execute('echo', { message: 'Hello, world!' });
      expect(result).to.equal('Echo: Hello, world!');
    });
 
    it('ignores unknown commands', () => {
      expect(gallows([]).execute('echo', {})).to.equal(undefined);
    });
  });

  describe('examples', () => {
    it('provides example directives', () => {
      const result = gallows([
        {
          name: 'echo',
          validate: (attributes, body) => body !== undefined,
          execute: (attributes, body) => body,
          example: {
            attributes: {},
            body: 'Hello, Gallows!'
          },
          description: 'Echoes the provided message'
        },
        {
          name: 'echo',
          validate: (attributes, body) => attributes.message !== undefined,
          execute: (attributes, body) => `Echo: ${attributes.message}`,
          example: {
            attributes: { message: 'Hello, world!' },
            body: undefined
          },
          description: 'Echoes the provided message'
        }
      ]).examples();
      expect(result).to.deep.equal([
        { action: 'echo', attributes: {}, body: 'Hello, Gallows!' },
        { action: 'echo', attributes: { message: 'Hello, world!' }, body: undefined }
      ]);      
    })
  });
});