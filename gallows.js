export default function gallows(commands) {
  return {
    examples: () => commands.map(cmd => { action: cmd.name, ...cmd.example }),
    execute: (action, attributes, body) => {
      const command = commands.find(cmd => cmd.name === action && cmd.validate(attributes, body));
      if (command) {
        return command.execute(attributes, body);
      } else {
        throw new Error(`Command '${action}' not found or invalid.`);
      }
    }
  };
}