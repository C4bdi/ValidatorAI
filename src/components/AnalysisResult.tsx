import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";

export interface AnalysisResultData {
  isPositive: boolean;
  score: number;
  summary: string;
  risks: string[];
  opportunities: string[];
  technicalRequirements: string[];
  marketSize: string;
  complexity: string;
  developmentTime: string;
  phases: {
    planning: {
      time: string;
      tasks: string[];
    };
    development: {
      time: string;
      tasks: string[];
    };
    launch: {
      time: string;
      tasks: string[];
    };
  };
}

interface AnalysisResultProps {
  data: AnalysisResultData | null;
  isLoading: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-muted rounded-md w-3/4 mx-auto" />
            <div className="h-4 bg-muted rounded-md w-full" />
            <div className="h-4 bg-muted rounded-md w-5/6" />
            <div className="h-4 bg-muted rounded-md w-4/6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-xl" />
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="h-6 bg-muted rounded-md w-1/4" />
              <div className="h-20 bg-muted rounded-md w-full" />
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="h-6 bg-muted rounded-md w-1/4" />
              <div className="h-20 bg-muted rounded-md w-full" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const { isPositive, score, summary, risks, opportunities, technicalRequirements, marketSize, complexity, developmentTime, phases } = data;
  const hasOpportunities = isPositive && opportunities && opportunities.length > 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-full mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`analysis-result-card ${isPositive ? 'positive-bg' : 'negative-bg'}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className={`verdict-badge ${isPositive ? 'positive-verdict' : 'negative-verdict'}`}>
            {isPositive ? '✓ Genomförbar Idé' : '⚠ Utmanande Idé'}
          </div>
          <p className="text-[#1957e6] mt-4 max-w-2xl mx-auto font-medium">{summary}</p>
        </motion.div>

        <div className="stats-container mb-8">
          <motion.div 
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="stat-box"
          >
            <h3 className="stat-label">Marknadsstorlek</h3>
            <p className="stat-value">{marketSize}</p>
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="stat-box"
          >
            <h3 className="stat-label">Komplexitet</h3>
            <p className="stat-value">{complexity}</p>
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="stat-box"
          >
            <h3 className="stat-label">Utvecklingstid</h3>
            <p className="stat-value">{developmentTime}</p>
          </motion.div>
        </div>

        <div className={`analysis-sections mb-8 ${hasOpportunities ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="analysis-section risks-section"
          >
            <h3 className="section-title">Risker</h3>
            <div className="section-content">
              {risks.map((risk, index) => (
                <motion.div key={index} variants={itemVariants} className="analysis-item risk-item">
                  <span className="item-icon">⚠</span>
                  <p>{risk}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {hasOpportunities && (
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="analysis-section opportunities-section"
            >
              <h3 className="section-title">Möjligheter</h3>
              <div className="section-content">
                {opportunities.map((opportunity, index) => (
                  <motion.div key={index} variants={itemVariants} className="analysis-item opportunity-item">
                    <span className="item-icon">✓</span>
                    <p>{opportunity}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h3 className="section-title mb-4">Tekniska Krav</h3>
          <div className="tech-requirements">
            {technicalRequirements.map((req, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="tech-requirement"
              >
                <p>{req}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={4}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <h3 className="section-title">Utvecklingsfaser</h3>
          
          <div className="phases-container">
            <div className="phase-card">
              <h4 className="phase-title">Planering & Design <span className="phase-time">({phases.planning.time})</span></h4>
              <div className="phase-tasks">
                {phases.planning.tasks.map((task, index) => (
                  <div key={index} className="phase-task">
                    {task}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="phase-card">
              <h4 className="phase-title">Utveckling <span className="phase-time">({phases.development.time})</span></h4>
              <div className="phase-tasks">
                {phases.development.tasks.map((task, index) => (
                  <div key={index} className="phase-task">
                    {task}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="phase-card">
              <h4 className="phase-title">Lansering <span className="phase-time">({phases.launch.time})</span></h4>
              <div className="phase-tasks">
                {phases.launch.tasks.map((task, index) => (
                  <div key={index} className="phase-task">
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalysisResult;
