import { Button } from "@/components/ui/button";
import { ExternalLink, FileDown } from "lucide-react";

const Resume = () => {
  return (
    <section
      id="resume"
      className="py-20 px-6 bg-gradient-to-b from-muted/35 via-muted/25 to-background"
    >
      <div className="text-center mb-4">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Résumé
        </h2>
      </div>

      <div className="max-w-3xl mx-auto mb-5 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="hero" size="sm">
          <a href="/Noah_Sun_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Résumé in New Tab
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href="/Noah_Sun_Resume.pdf" download>
            <FileDown className="w-4 h-4 mr-2" />
            Download
          </a>
        </Button>
      </div>

      <div className="w-full aspect-[8.5/11] max-w-3xl mx-auto rounded-lg overflow-hidden shadow-inner">
        <iframe
          src="/Noah_Sun_Resume.pdf#pagemode=none&navpanes=0&toolbar=0"
          title="Noah Sun Résumé"
          loading="lazy"
          tabIndex={-1}
          className="w-full h-full min-h-[60vh] border-0"
        />
      </div>
    </section>
  );
};

export default Resume;
