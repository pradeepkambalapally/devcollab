const TypingIndicator = ({ typingUser }) => {
  return (
    <p className="text-xs md:text-sm text-zinc-400 px-4 md:px-6 pb-2">
      {typingUser} is typing...
    </p>
  );
};

export default TypingIndicator;