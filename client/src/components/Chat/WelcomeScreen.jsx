const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">💬</div>

        <h2 className="text-3xl font-bold mb-3">
          Welcome to DevCollab
        </h2>

        <p className="text-zinc-400">
          Search for developers and start collaborating.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;