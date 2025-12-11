const Resume = () => {
  return (
    <section id="resume" className="py-20 px-6 bg-muted/30">
      <div className="text-center mb-4">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Résumé
        </h2>
      </div>
      <div className="w-full aspect-[8.5/11] max-w-3xl mx-auto rounded-lg overflow-hidden shadow-inner">
        <iframe
          src="/Noah_Sun_Resume.pdf"
          title="Noah Sun Résumé"
          className="w-full h-full min-h-[60vh] border-0"
        />
      </div>
    </section>
  );
};

export default Resume;
