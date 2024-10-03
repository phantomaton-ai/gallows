# Gallows

Gallows is a lightweight command execution framework. It allows you to define a set of commands, each with their own validation, execution, and example. Commands can then be invoked with specified attributes and a body.

## Usage

To use Gallows, you define your commands, then execute them with directives:

```javascript
gallows([
  // Define your commands here
]).execute({
  // Execute command directives here
})
```

Each command has the following properties:

- `name`: The name of the command
- `validate(attributes, body)`: A function that validates the command's attributes and body
- `execute(attributes, body)`: A function that executes the command with the provided attributes and body
- `example`: An object with `attributes` and `body` properties, demonstrating how to use the command
- `description`: A description of what the command does

Each directive has the following properties:

- `action`: The name of the command to execute
- `attributes`: An object containing the attributes for the command
- `body`: The body of the command

Here's an example of how to define and execute a command:

```javascript
gallows([
  {
    name: 'echo',
    validate: (attributes, body) => {
      // Validate the attributes and body for the 'echo' command
    },
    execute: (attributes, body) => {
      // Execute the 'echo' command with the provided attributes and body
    },
    example: {
      attributes: { message: 'Hello, world!' },
      body: ''
    },
    description: 'Echoes the provided message'
  }
]).execute({
  action: 'echo',
  attributes: { message: 'Hello, Gallows!' },
  body: ''
})
```

Feel free to add more commands and directives to your Gallows project!
