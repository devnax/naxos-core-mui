import * as React from 'react'
import AppHandler from "../src/Apps"
import SnapChatIcon from "./demo-icons/SnapChat"
import BoardIcon from "./demo-icons/BoardIcon"
import ChatIcon from "./demo-icons/ChatIcon"
import PinterestIcon from "./demo-icons/PinterestIcon"
import VimeoIcon from "./demo-icons/VimeoIcon"
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SignalWifi3BarRoundedIcon from '@mui/icons-material/SignalWifi3BarRounded';

import SidebarView from '../src/Sidebar'
import { Typography } from "@mui/material"

import { ListView, ListPreview } from '../src/List'
import DataTable from './DataTable'
import ListHandler from './List'
import Navbar from '../src/Navbar'


import { Button, IconButton, Avatar } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerHandler from '../src/Drawer'
import Card from '../src/Card'
// import ListBuilder from '../src/ListBuilder'
import { useForm } from '../src/Form/useForm'
import FileSystem from '../src/FileSystem'
import Auth from '../src/Auth'


export default async () => {



   // AppHandler.create({
   //    id: "Snapchat",
   //    name: "Snap Chat",
   //    icon: <SnapChatIcon />,
   //    shorcutKeys: [
   //       { key: "alt+2", callback: () => alert("Alt+1") },
   //       { key: "ctrl+a", callback: () => alert("ctrl+1") }
   //    ],
   //    render: () => {
   //       return (
   //          <Stack direction="row" >
   //             <SidebarView
   //                p={1}
   //                borderRight={1}
   //                borderColor="grey.800"
   //                width={250}
   //                header={<Box>
   //                   <Typography variant="h6">Widget List</Typography>
   //                </Box>}
   //             >
   //                <ListView
   //                   handler={ListHandler}
   //                   onItemClick={(id) => {
   //                      console.log(id)
   //                   }} />
   //             </SidebarView>
   //             <Box flex={1} p={3}>
   //                <Grid container spacing={2}>
   //                   <Grid item md={4}>
   //                      <Card
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={100}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/Kids-English-Course-Thumbnail.jpg"
   //                         title="SSC পদার্থবিজ্ঞান Animated Lessons"
   //                         content="The official Discord server, in collaboration with Riot Games. Find the latest news and talk about the game!"
   //                      />
   //                   </Grid>
   //                   <Grid item md={4}>
   //                      <Card
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={100}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/Programming-for-Kids-Course-Thumbnail.jpg"
   //                         title="Programming for kids"
   //                         content="অ্যানিমেটেড ভিডিও লেসন, কুইজ, স্মার্ট নোট ও এক্সাম মডিউলে উচ্চতর গণিত ১ম পত্রের পুরো বছরের সিলেবাসের সল্যুশন এখন এক কোর্সে।"
   //                      />
   //                   </Grid>
   //                   <Grid item md={4}>
   //                      <Card
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={100}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/fb_marketing_update2_thumbnail.jpg"
   //                         title="HSC ইংরেজি Animated Lessons"
   //                         content="বুঝে পড়লে গ্রামার অথবা বাক্য গঠনে আর কখনও ভুল হবেনা। অ্যানিমেটেড ভিডিও লেসনে খুব সহজেই বুঝে নাও ইংরেজিতে তোমার সমস্যার জায়গাগুলো।"
   //                      />
   //                   </Grid>



   //                   <Grid item md={6}>
   //                      <Card
   //                         inline
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={30}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/Kids-English-Course-Thumbnail.jpg"
   //                         title="SSC পদার্থবিজ্ঞান Animated Lessons"
   //                      //content="The official VALORANT Discord server, in collaboration with Riot Games. Find the latest news and talk about the game!"
   //                      />
   //                   </Grid>
   //                   <Grid item md={6}>
   //                      <Card
   //                         inline
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={30}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/Programming-for-Kids-Course-Thumbnail.jpg"
   //                         title="Programming for kids"
   //                      //content="অ্যানিমেটেড ভিডিও লেসন, কুইজ, স্মার্ট নোট ও এক্সাম মডিউলে উচ্চতর গণিত ১ম পত্রের পুরো বছরের সিলেবাসের সল্যুশন এখন এক কোর্সে।"
   //                      />
   //                   </Grid>
   //                   <Grid item md={6}>
   //                      <Card
   //                         inline
   //                         hoverShadow
   //                         imageEffect="rotate"
   //                         imagePadded
   //                         footer={<>
   //                            <Button>Read More</Button>
   //                         </>}
   //                         contentMaxLength={30}
   //                         image="https://cdn.10minuteschool.com/md/images/skills/Updated_Thumbnail_v3/fb_marketing_update2_thumbnail.jpg"
   //                         title="HSC ইংরেজি Animated Lessons"
   //                      //content="বুঝে পড়লে গ্রামার অথবা বাক্য গঠনে আর কখনও ভুল হবেনা। অ্যানিমেটেড ভিডিও লেসনে খুব সহজেই বুঝে নাও ইংরেজিতে তোমার সমস্যার জায়গাগুলো।"
   //                      />
   //                   </Grid>
   //                </Grid>
   //             </Box>
   //          </Stack>
   //       )
   //    }
   // })
   // // AppHandler.create({
   // //    id: "white-bord",
   // //    name: "White Board",
   // //    icon: <BoardIcon />,
   // //    render: () => {
   // //       const form = useForm<any>()
   // //       return (
   // //          <Box height="100%" p={1} >
   // //             <Container maxWidth="sm">
   // //                <ListBuilder
   // //                   name="course_builder"
   // //                   form={form}
   // //                   template={BuilderTemplate}
   // //                   onAddItem={async () => {
   // //                      return { title: "New Item", id: "nice" }
   // //                   }}
   // //                />
   // //             </Container>

   // //          </Box>
   // //       )
   // //    }
   // // })
   // AppHandler.create({
   //    id: "chat",
   //    name: "Chat",
   //    icon: <ChatIcon />,
   //    render: () => <div>ChatIcon </div>
   // })
   // AppHandler.create({
   //    id: "PinterestIcon",
   //    name: "Pinterest",
   //    icon: <PinterestIcon />,
   //    render: () => <div>Pinterest </div>
   // })
   // AppHandler.create({
   //    id: "VimeoIcon",
   //    name: "Vimeo",
   //    icon: <VimeoIcon />,
   //    render: () => <div>Vimeo </div>
   // })
   // AppHandler.create({
   //    id: "Signal",
   //    name: "Signal",
   //    icon: <SignalWifi3BarRoundedIcon />,
   //    render: () => <div>
   //       <Navbar
   //          logo={'https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png'}
   //          rightContent={<>
   //             <IconButton>
   //                <NotificationsIcon />
   //             </IconButton>
   //             <IconButton>
   //                <AccountCircleIcon />
   //             </IconButton>
   //          </>}
   //          menuItems={[
   //             { label: "Home" },
   //             { label: "About" },
   //             { label: "Service" },
   //             { label: "Contact" },
   //          ]}
   //       >
   //          <Button
   //             onClick={() => {

   //             }}
   //          >Home</Button>
   //          <Button>About</Button>
   //          <Button>Service</Button>
   //          <Button>Blog</Button>
   //          <Button>Contact</Button>
   //       </Navbar>
   //    </div>
   // })
   AppHandler.create({
      id: "file",
      name: "File",
      icon: <VimeoIcon />,
      render: () => <FileSystem />
   })
   AppHandler.create({
      id: "auth",
      name: "Auth",
      icon: <AccountCircleIcon />,
      render: () => <Auth />
   })
}