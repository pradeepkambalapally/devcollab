const TypingIndicator = ({ typingUser }) => {
  return (
    <p className="text-sm text-zinc-400 italic px-2 py-1">
      {typingUser} is typing...
    </p>
  );
};

export default TypingIndicator;