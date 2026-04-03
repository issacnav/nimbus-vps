"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type TextGenerateEffectProps = {
  words: string;
  /** Extra className applied to the outer wrapper */
  className?: string;
  /** Per-word blur-in duration (s) */
  duration?: number;
  /** Stagger delay between words (s) */
  staggerDelay?: number;
  /** Delay before the whole effect starts (s) */
  initialDelay?: number;
  /** Whether to animate a blur effect (default true) */
  filter?: boolean;
  /** HTML tag for the outer wrapper (default "div") */
  as?: keyof JSX.IntrinsicElements;
};

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  staggerDelay = 0.18,
  initialDelay = 0,
  filter = true,
  as: Tag = "div",
}: TextGenerateEffectProps): JSX.Element {
  const [scope, animate] = useAnimate();
  const wordsArray = React.useMemo(() => words.split(" "), [words]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (scope.current) {
        animate(
          "span",
          { opacity: 1, filter: filter ? "blur(0px)" : "none" },
          { duration, delay: stagger(staggerDelay) }
        );
      }
    }, initialDelay * 1000);

    return () => clearTimeout(timer);
  }, [animate, duration, filter, initialDelay, scope, staggerDelay]);

  return (
    // @ts-expect-error — dynamic tag is valid at runtime
    <Tag className={cn(className)} data-slot="text-generate-effect">
      <motion.span ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="inline-block opacity-0"
            style={{ filter: filter ? "blur(10px)" : "none" }}
          >
            {word}
            {idx < wordsArray.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
