

```js

import Nabvar, {NavbarProps} from 'naxos-core/libs/Navbar'


type NavbarProps = GridProps & {
   logo?: ReactElement;
   icons?: ReactElement;
   logoProps?: GridProps;
   iconsProps?: GridProps;
   containerProps?: GridProps;
}

<Navbar
   logo={<Avatar src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" />}
   icons={<>
      <IconButton>
         <NotificationsIcon />
      </IconButton>
      <IconButton>
         <AccountCircleIcon />
      </IconButton>
   </>}
>
   <Button>Home</Button>
   <Button>About</Button>
   <Button>Service</Button>
   <Button>Blog</Button>
   <Button>Contact</Button>
</Navbar>

```