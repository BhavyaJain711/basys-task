import { cn } from "@/lib/utils.js";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobileNew items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({ items, className }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                {item.action ? (
                                    <button
                                        onClick={item.action}
                                        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                    </button>
                                ) : (
                                    <Link
                                        to={item.href}
                                        key={item.title}
                                        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({ items, className }) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};
const FloatingDockMobileNew = ({ items, className }) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <div
            // onMouseMove={(e) => mouseX.set(e.pageX)}
            // onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto md:hidden w-full grid grid-cols-6 gap-2 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    type,
    action,
    options,
    labels
}) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    switch (type) {
        case "Button":
            return (
                <button onClick={action}>
                    <motion.div
                        ref={ref}
                        style={{ width, height }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
                    >
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                                    exit={{ opacity: 0, y: 2, x: "-50%" }}
                                    className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                                >
                                    {title}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.div
                            style={{ width: widthIcon, height: heightIcon }}
                            className="flex items-center justify-center"
                        >
                            {icon}
                        </motion.div>
                    </motion.div>
                </button>
            );
        case "Link":
            return (
                <Link to={href}>
                    <motion.div
                        ref={ref}
                        style={{ width, height }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
                    >
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                                    exit={{ opacity: 0, y: 2, x: "-50%" }}
                                    className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                                >
                                    {title}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.div
                            style={{ width: widthIcon, height: heightIcon }}
                            className="flex items-center justify-center"
                        >
                            {icon}
                        </motion.div>
                    </motion.div>
                </Link>
            );
            case "Select":
                return (
                  <motion.div
                    ref={ref}
                    style={{ width, height }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onTouchStart={() => setHovered(!hovered)}
                    className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
                  >
                    <AnimatePresence>
                      {hovered && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                          >
                            {title}
                          </motion.div>
              
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 2 }}
                            className="absolute mt-8 flex gap-4 top-1/2  -translate-x-1/2 -translate-y-full flex-wrap justify-center"
                          >
                            {options?.map((option, index) => (
                              <motion.button
                                key={option}
                                onClick={() => action(option)}
                                onTouchEndCapture={() => action(option)}
                                whileHover={{
                                  scale: 1.2, // Scale up on hover
                                  y: -5, // Move upwards slightly on hover
                                  transition: { type: "spring", stiffness: 200 }, // Smooth transition
                                }}
                                initial={{
                                  opacity: 0,
                                  y: 30, // Start with a slight downward offset
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0, // Animate to original position
                                  transition: { delay: index * 0.1, duration: 0.4 }, // Stagger effect
                                }}
                                exit={{
                                  opacity: 0,
                                  y: 30, // Fade and move down on exit
                                }}
                                className="w-12 h-12 z-10 bg-gray-300 dark:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer"
                              >
                                {labels ? labels[index] : option[0]} {/* Show label or first letter */}
                              </motion.button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                    <motion.div
                      style={{ width: widthIcon, height: heightIcon }}
                      className="flex items-center justify-center"
                    >
                      {icon}
                    </motion.div>
                  </motion.div>
                );
              
        case "Picker":
            return (
                <motion.div
                    ref={ref}
                    style={{ width, height }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
                >
                    <AnimatePresence>
                        {hovered && <>
                            <motion.div
                                initial={{ opacity: 0, y: 10, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, x: "-50%" }}
                                exit={{ opacity: 0, y: 2, x: "-50%" }}
                                className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                            >
                                {title}
                            </motion.div>
                            (
                            <motion.div
                                initial={{ opacity: 0, y: 10, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, x: "-50%" }}
                                exit={{ opacity: 0, y: 2, x: "-50%" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center"
                            >
                                {/* HTML color picker */}
                                <input
                                    type="color"
                                    className="w-16 h-16 -translate-y-1/2 cursor-pointer p-0 border-none bg-transparent rounded-full opacity-0"
                                    onChange={(e) => action(e.target.value)} // Trigger action with the selected color
                                />
                            </motion.div>

                            )
                        </>}
                    </AnimatePresence>
                    <motion.div
                        style={{ width: widthIcon, height: heightIcon }}
                        className="flex items-center justify-center"
                    >
                        {icon}
                    </motion.div>
                </motion.div>
            );


        default:
            return null;
    }
}