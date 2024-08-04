import React, { useState } from "react";
import useMeasure from "react-use-measure";
import "@/app/globals.css"
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import Link from "next/link";

export const StatusModal = () => {
  const [open, setOpen] = useState(false);
  return (
      <div className="">
        <div
            onClick={() => setOpen(true)}
            className="rounded text-indigo-400 font-bold cursor-pointer hover:translate-y-0.5 active:translate-y-1"
        >
          Click Here
        </div>

        <DragCloseDrawer open={open} setOpen={setOpen}>
          <div className="mx-auto px-auto space-y-4 text-neutral-400">
            <h2 className="text-2xl overflow-scroll scroll-smooth font-bold text-neutral-200">
              Hello devs !!
            </h2>
            <p className={"text-lg"}>Below are the links to my Github, LinkedIn, and the Projects that I want to showcase. </p>
            <div><br/>
              <span className={"text-xl font-bold text-white"}><Link href={"https://github.com/daichianoop"}>Github</Link></span><br/><br/>
              <span className={"text-xl font-bold text-blue-700"}><Link href={"https://www.linkedin.com/in/anoop-kumar-42b527285/"}>LinkedIn</Link></span><br/><br/>
              <span className={"text-xl font-bold text-red-600"}><Link href={"https://daichiflix-archives.vercel.app/"}>Project Showcase 1 ( Daichiflix Archives - Fully Responsive )</Link></span><br/><br/>
              <span className={"text-xl font-bold text-emerald-600"}><Link href={"https://welcome-to-spotify.vercel.app/"}>Project Showcase 2 ( Spotify Clone - Non Responsive )</Link></span><br/>
            </div>
          </div>
        </DragCloseDrawer>
      </div>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
      <>
        {open && (
            <motion.div
                ref={scope}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                className="fixed inset-0 z-50 bg-neutral-950/70"
            >
              <motion.div
                  id="drawer"
                  ref={drawerRef}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
                  style={{ y }}
                  drag="y"
                  dragControls={controls}
                  onDragEnd={() => {
                    if (y.get() >= 100) {
                      handleClose();
                    }
                  }}
                  dragListener={false}
                  dragConstraints={{
                    top: 0,
                    bottom: 0,
                  }}
                  dragElastic={{
                    top: 0,
                    bottom: 0.5,
                  }}
              >
                <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
                  <button
                      onPointerDown={(e) => {
                        controls.start(e);
                      }}
                      className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
                  ></button>
                </div>
                <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
                  {children}
                </div>
              </motion.div>
            </motion.div>
        )}
      </>
  );
};