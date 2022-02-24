import { FC } from "react";
import { motion, Point } from "framer-motion";

interface CardsProps {
  cards: any[];
  selectedCard: any;
  onDragStart?: () => void;
  onDragEnd: (card: any) => void;
  onDrag: (point: Point) => void;
}

export const Cards: FC<CardsProps> = ({
  cards,
  selectedCard,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div className="flex gap-2">
      {cards?.map((el) => (
        <motion.div
          className="min-w-[100px] h-40 bg-white rounded-lg shadow-md px-2"
          key={el._id}
          drag
          animate={{
            translateY: el === selectedCard ? 100 : 0,
            scale: el === selectedCard ? 2 : 1,
          }}
          whileDrag={{
            scale: 0.85,
          }}
          dragSnapToOrigin
          onDrag={(_, { point }) => {
            onDrag(point);
          }}
          onDragStart={onDragStart}
          onDragEnd={() => onDragEnd(el)}
        >
          <span>{el?.phrase}</span>
        </motion.div>
      ))}
    </div>
  );
};
