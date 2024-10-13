export default function gallows(commands) {
  return {
    examples: () => commands.map(cmd => ({ action: cmd.name, ...cmd.example })),
    execute: (action, attributes, body) => {
      const command = commands.find(cmd => cmd.name === action && cmd.validate(attributes, body));
      return command && command.execute(attributes, body);
    }
  };
}
