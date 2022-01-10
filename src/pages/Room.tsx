import useStore from "../store";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const mockUsers = [
  {
    id: "1",
    avatar: "",
    name: "John Doe",
  },
  {
    id: "2",
    avatar: "",
    name: "Jane Doe",
  },
  {
    id: "3",
    avatar: "",
    name: "Jack Doe",
  },
];

const Room = () => {
  const user = useStore((store) => store.user);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isOnDragZone, setIsOnDragZone] = useState(false);

  const [selectedCard, setSelectedCard] = useState<any>(null);

  console.log("draggin", isDragging, "hover", isOnDragZone);

  const handleOnHoveDragZone = () => {
    setIsOnDragZone(isDragging);
  };

  return (
    <div className="grid place-content-center mt-24">
      <div className="flex gap-5 mb-10">
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <div
            className="         flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/wdym-142f1.appspot.com/o/FicqJU07SDcsTX4DFGWk_.png?alt=media&token=a08197ec-914c-4b03-9a95-c170dd6de89e"
              alt="meme"
            />
          </div>
        </div>
        <motion.div
          // ref={constraintsRef}
          onMouseEnter={handleOnHoveDragZone}
          className="h-full border-dotted w-48 border-2 flex justify-center items-center"
        >
          drag zone
        </motion.div>
      </div>
      <h4 className="text-white text-center">cards</h4>
      <div className="flex gap-2 max-w-lg">
        {[1, 2, 3, 4, 5].map((el) => (
          <motion.div
            key={el}
            drag
            animate={{
              translateY: el === selectedCard ? 200 : 0,
              scale: el === selectedCard ? 3 : 1,
            }}
            whileDrag={{
              scale: 2,
            }}
            dragSnapToOrigin
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(evt, info) => {
              if (isOnDragZone) {
                setSelectedCard(el);
              }
              setIsOnDragZone(false);
              setIsDragging(false);
            }}
            className="w-40 h-11 bg-white"
          ></motion.div>
        ))}
      </div>

      <div className="flex gap-3 mt-10">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex flex-col">
            <div className="relative inline-block">
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://www.elarraydejota.com/wp-content/uploads/2016/09/Linux-Avatar-300px.png"
                alt="Profile image"
              />
              <span className="absolute top-0 right-0 inline-block text-sm font-bold bg-white border-2 border-white rounded-full">
                10
              </span>
            </div>

            <p className="text-sm text-white">{user.name}</p>
          </div>
        ))}
        <div className="flex flex-col">
          <div className="relative inline-block">
            <img
              className="inline-block object-cover w-12 h-12 rounded-full 
              after:bg-gray-200 
              after:left-0
              after:top-0 
              after:right-0 after:bottom-0
              after:w-full after:h-full
              after:pseudo-element
            "
              src="https://www.elarraydejota.com/wp-content/uploads/2016/09/Linux-Avatar-300px.png"
              alt="Profile image"
            />
            {/* <span className="absolute top-0 right-0 inline-block text-sm font-bold bg-white border-2 border-white rounded-full">
              10
            </span> */}
          </div>

          <p className="text-sm text-white">juez</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
