import { FC, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

interface ItineraryProps {
  itinerary: string[];
  maxVisible?: number;
}

const Itinerary: FC<ItineraryProps> = ({ itinerary, maxVisible = 4 }) => {
  const [showAll, setShowAll] = useState(false);

  // Lógica para cortar el itinerario
  const visibleItems = showAll ? itinerary : itinerary.slice(0, maxVisible);
  const hiddenItems = itinerary.slice(maxVisible);

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-700 flex-wrap">
      {visibleItems.map((item, index) => (
        <span key={index} className="flex items-center">
          {item}
          {index < visibleItems.length - 1 && (
            <FiArrowRight className="text-blue-600 ml-2" />
          )}
        </span>
      ))}

      {/* Si hay más destinos, muestra un indicador */}
      {hiddenItems.length > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center text-blue-600 underline"
          title={hiddenItems.join(", ")}
        >
          <FiArrowRight className="text-blue-600 mr-2" /> ({hiddenItems.length} more)
        </button>
      )}
    </nav>
  );
}

export default Itinerary;