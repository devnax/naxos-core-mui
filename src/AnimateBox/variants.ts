const initial = {
   opacity: 0
}

const animate = {
   opacity: 1
}

const exit = {
   opacity: 0,
   transition: { ease: "easeInOut", duration: 0.20 }
}

const zoom = {
   initial: { ...initial, scale: .7 },
   animate: { ...animate, scale: 1 },
   exit: { ...exit, scale: .7 }
}

const zoomOver = {
   initial: { ...initial, scale: 1.05 },
   animate: { ...animate, scale: 1 },
   exit: { ...exit, scale: 1.05 }
}

const fadeIn = {
   initial,
   animate,
   exit
}

const fadeInUp = {
   initial: { ...initial, y: -50 },
   animate: { ...animate, y: 0 },
   exit: { ...exit, y: -50 }
}

const fadeInDown = {
   initial: { ...initial, y: 50 },
   animate: { ...animate, y: 0 },
   exit: { ...exit, y: 50 }
}

const fadeInLeft = {
   initial: { ...initial, x: -50 },
   animate: { ...animate, x: 0 },
   exit: { ...exit, x: -50 }
}

const fadeInRight = {
   initial: { ...initial, x: 50 },
   animate: { ...animate, x: 0 },
   exit: { ...exit, x: 50 }
}


const variants = {
   zoom,
   zoomOver,
   fadeIn,
   fadeInDown,
   fadeInLeft,
   fadeInRight,
   fadeInUp
}

export default variants