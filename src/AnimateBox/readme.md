

```js
import AnimateBox from 'naxos-core/AnimateBox'


type AnimationType = "zoom" | "zoomOver" | "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight"

interface Props extends MotionProps {
   children: ReactElement | ReactNode;
   type?: AnimationType | 'none';
}


<AnimateBox>
...
</AnimateBox>

```