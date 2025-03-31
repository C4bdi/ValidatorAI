
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface AmbitionSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const AmbitionSlider: React.FC<AmbitionSliderProps> = ({ value, onChange }) => {
  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const getAmbitionDescription = (level: number) => {
    switch (level) {
      case 1:
        return "Nivå 1: Enkel omfattning, låg risk";
      case 2:
        return "Nivå 2: Måttlig omfattning och ambition";
      case 3:
        return "Nivå 3: Balanserad omfattning och ambition";
      case 4:
        return "Nivå 4: Utmanande omfattning, högre risk";
      case 5:
        return "Nivå 5: Maximal ambition, hög komplexitet";
      default:
        return "Balanserad omfattning och ambition";
    }
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-medium mb-4 text-secondary">Ambitionsnivå</h2>
      <div className="mb-6">
        <Slider
          defaultValue={[3]}
          value={[value]}
          onValueChange={handleValueChange}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span className="font-medium">Låg</span>
          <span className="font-medium">Hög</span>
        </div>
      </div>
      <div className="text-sm text-foreground p-3 bg-white border border-gray-100 rounded-md shadow-sm">
        <span className="font-semibold">{getAmbitionDescription(value)}</span>
      </div>
    </div>
  );
};

export default AmbitionSlider;
