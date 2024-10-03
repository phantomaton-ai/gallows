import { expect } from 'chai';
import gallows from './gallows.js';

describe('Gallows', () => {
  describe('echo', () => {
    it('should echo the provided body', () => {
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
      ]).execute(
        'echo',
        {},
        'Hello, Gallows!'
      );
      expect(result).to.equal('Hello, Gallows!');
    });

    it('should support command overloading', () => {
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
            body: ''
          },
          description: 'Echoes the provided message'
        }
      ]).execute(
        'echo',
        { message: 'Hello, world!' },
        ''
      );
      expect(result).to.equal('Echo: Hello, world!');
    });
  });
});