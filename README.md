# Gallows

Gallows is a lightweight command execution framework. It allows you to define a set of commands, each with their own validation, execution, and example. Commands can then be invoked with specified attributes and a body.

## Usage

To use Gallows, you define your commands, then execute them:

```javascript
gallows([
  // Define your commands here
]).execute(
  // Execute commands here
)
```

Each command has the following properties:

- `name`: The name of the command
- `validate(attributes, body)`: A function that validates the command's attributes and body
- `execute(attributes, body)`: A function that executes the command with the provided attributes and body and returns the result
- `example`: An object with `attributes` and `body` properties, demonstrating how to use the command
- `description`: A description of what the command does

When executing commands, you provide the following arguments:

- `action`: The name of the command to execute
- `attributes`: An object containing the attributes for the command
- `body`: The body of the command

Here's an example of how to define and execute a command:

```javascript
gallows([
  {
    name: 'echo',
    validate: (attributes, body) => {
      return body !== undefined;
    },
    execute: (attributes, body) => {
      // Execute the 'echo' command with the provided body
      return body;
    },
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
)
```

The `execute` function will return the result of the command.

## Command Overloading

Gallows supports command overloading, which means that you can define multiple commands with the same name. When executing a command, the first command that passes the `validate` function will be executed. This allows you to provide different implementations of the same command based on the provided attributes and body.

Here's an example of command overloading:

```javascript
gallows([
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
)
```

In this example, the second `echo` command will be executed, as its `validate` function matches the provided `attributes`.

Feel free to add more commands to your Gallows project!
