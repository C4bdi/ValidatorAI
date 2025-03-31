import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CategorySelector, { CategoryType } from "@/components/CategorySelector";
import AmbitionSlider from "@/components/AmbitionSlider";
import AnalysisResult, { AnalysisResultData } from "@/components/AnalysisResult";
import { analyzeBusinessIdea } from "@/lib/api";
import { validateForm } from "@/lib/validators";

const Index = () => {
  const { toast } = useToast();
  const [businessIdea, setBusinessIdea] = useState("");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [ambitionLevel, setAmbitionLevel] = useState(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResultData | null>(null);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(businessIdea.length);
  }, [businessIdea]);

  const handleAnalyze = async () => {
    const validation = validateForm(businessIdea, category, ambitionLevel);
    
    if (!validation.valid) {
      toast({
        title: "Felaktig inmatning",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const analysisResult = await analyzeBusinessIdea({
        businessIdea,
        category: category!,
        ambitionLevel
      });
      
      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysfel",
        description: error instanceof Error ? error.message : "Ett fel uppstod vid analys av din affärsidé",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-8 pb-16 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Validator AI</h1>
          <p className="text-muted-foreground">
            Avancerad analys för ditt UF-företags genomförbarhet
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-lg p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <CategorySelector selectedCategory={category} onChange={setCategory} />
                  <AmbitionSlider value={ambitionLevel} onChange={setAmbitionLevel} />
                </div>
                
                <div>
                  <h2 className="text-xl font-medium mb-4 text-secondary">Affärsidé</h2>
                  <Textarea
                    placeholder="Beskriv din affärsidé i detalj. Tänk på att inkludera: målgrupp, värdeförslag, resursbehov och potentiella utmaningar..."
                    className="min-h-[220px] text-base resize-none mb-2"
                    value={businessIdea}
                    onChange={(e) => setBusinessIdea(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      Beskrivning {characterCount} tecken
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  size="lg"
                  className="w-full md:w-auto md:px-16 py-6 bg-primary text-white text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-50 border-t-transparent" />
                      Analyserar...
                    </>
                  ) : (
                    'Analysera Affärsidé'
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <AnalysisResult data={result} isLoading={isAnalyzing} />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center mt-8"
              >
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Analysera en ny idé
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
