import { useId, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./ChatboxAI.css";

export default function FloatingBot({ onClick }) {
  const boundsRef = useRef(null);
  const draggedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const gradientId = useId();

  return (
    <div ref={boundsRef} className="pointer-events-none fixed inset-4 z-[60]">
      <motion.div
        drag
        dragConstraints={boundsRef}
        dragElastic={0}
        dragMomentum={false}
        onPointerDownCapture={() => {
          draggedRef.current = false;
        }}
        onDragStart={() => {
          draggedRef.current = true;
        }}
        className="nexora-floating-bot pointer-events-auto absolute bottom-2 right-2 h-20 w-20 touch-none"
      >
        <motion.button
          type="button"
          aria-label="Mở trợ lý Nexora"
          aria-expanded={false}
          aria-controls="nexora-assistant"
          onClick={(event) => {
            if (!draggedRef.current || event.detail === 0) onClick?.();
          }}
          animate={reducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reducedMotion ? undefined : { scale: 1.08, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="nexora-bot-button group"
        >
          <span aria-hidden="true" className="nexora-bot-aura" />
          <svg
            aria-hidden="true"
            className="nexora-bot-character"
            width="80"
            height="80"
            viewBox="0 0 88 88"
            fill="none"
          >
            <defs>
              <linearGradient
                id={`${gradientId}-shell`}
                x1="22"
                y1="16"
                x2="68"
                y2="74"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFD49C" />
                <stop offset="0.45" stopColor="#FF922E" />
                <stop offset="1" stopColor="#E25B14" />
              </linearGradient>
              <linearGradient
                id={`${gradientId}-face`}
                x1="24"
                y1="29"
                x2="61"
                y2="61"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#303849" />
                <stop offset="1" stopColor="#111722" />
              </linearGradient>
            </defs>
            <ellipse
              cx="44"
              cy="79"
              rx="21"
              ry="3"
              fill="#29170B"
              opacity="0.2"
            />
            <path
              d="M44 23V13"
              stroke="#FFC078"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="44" cy="10" r="5" fill="#FFBE71" />
            <circle cx="42.5" cy="8.5" r="1.5" fill="#FFF3DB" />
            <rect x="7" y="36" width="9" height="21" rx="4.5" fill="#EC7C24" />
            <rect x="72" y="36" width="9" height="21" rx="4.5" fill="#EC7C24" />
            <path
              d="M16 43C16 27 25 21 44 21C63 21 72 27 72 43V51C72 66 63 73 44 73C25 73 16 66 16 51V43Z"
              fill={`url(#${gradientId}-shell)`}
              stroke="#FFCF91"
              strokeWidth="1.2"
            />
            <path
              d="M23 35C27 29 34 27 44 27"
              stroke="#FFF1D6"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
            <rect
              x="22"
              y="32"
              width="44"
              height="31"
              rx="13"
              fill={`url(#${gradientId}-face)`}
              stroke="#AD4A18"
              strokeWidth="1"
            />
            <motion.g
              style={{ transformOrigin: "44px 44px" }}
              animate={
                reducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }
              }
              transition={{
                duration: 5,
                times: [0, 0.44, 0.46, 0.48, 1],
                repeat: Infinity,
              }}
            >
              <rect
                x="30"
                y="40"
                width="7"
                height="10"
                rx="3.5"
                fill="#C3F8FF"
              />
              <rect
                x="51"
                y="40"
                width="7"
                height="10"
                rx="3.5"
                fill="#C3F8FF"
              />
            </motion.g>
            <path
              d="M39 55Q44 59 49 55"
              stroke="#C3F8FF"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <circle cx="27.5" cy="53" r="2" fill="#FF9F75" opacity="0.65" />
            <circle cx="60.5" cy="53" r="2" fill="#FF9F75" opacity="0.65" />
          </svg>
          <span aria-hidden="true" className="nexora-bot-hint">
            xin chào các con giời đến với dự án thất nghiệp của tôi
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
