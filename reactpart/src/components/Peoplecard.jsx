import React, { useState } from "react";
import { Box, Flex, Avatar, Text, Button, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import swal from "sweetalert";

const Peoplecard = ({ user,id,status,getpeople }) => {
  const [followallow,setfollowallow]=useState(status)
  const bg = useColorModeValue("white", "gray.800"); // The background color based on the color mode
  const color = useColorModeValue("gray.800", "white"); // The text color based on the color mode

  // A function to handle the follow button click
  const handleFollow = async() => {
   try{
    const datatosend={
      followid:user._id,
      myid:id
    }
    const res=await axios.post("http://localhost:4000/followandunfollow",datatosend)
    if(res.data.message=='requestsent' || res.data.message=='alreadyrequested'){
      setfollowallow('requestedbyyou')
    }else{
      swal('Sorry user not found')

    }
   }catch(e){
    swal('Error occured at backend')
    getpeople()
   }
  };

  return (
    <Box mb={'2vh'} bg={bg} color={color} w="full" maxW="700" p="4" boxShadow="md" borderRadius="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {user.avatar && user.avatar.url?<Avatar src={user.avatar.url} alt={user.name} />:<Avatar name={user.name} alt={user.name} />}
          <Text ml="4" fontWeight="bold">{user.name}</Text>
          {/* <Text>{user._id}</Text> */}
        </Flex>
       {
        followallow=='allowfollow'? <><Button colorScheme="blue" onClick={handleFollow}>
        Request to follow
      </Button></>: followallow=='requestedbyyou'?<Text>Requested by you</Text>: followallow=='requestedbyfriend'?<Text>Requested by your friend</Text>:<Text>Followed</Text>
       }
      </Flex>
    </Box>
  );
};

export default Peoplecard;

