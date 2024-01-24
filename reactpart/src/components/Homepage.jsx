import React, { useEffect, useState } from 'react'
import {ArrowUpIcon} from '@chakra-ui/icons'
import Postcard from './Postcard'
import axios from 'axios'
import swal from 'sweetalert'
import './ScrollToTopButton.css'
import { Spinner,Text } from '@chakra-ui/react'
const Homepage = (props) => {
  const [postdata,setpostdata]=useState([])
  const [loader,setloader]=useState(0)
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 200);
    };
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  //handling post data from backend to show
  const handlegetpost=async()=>{
   try{
    setloader(1)
    const res=await axios.get(`http://localhost:4000/getpost/${props.id}`)
    setpostdata(res.data.postdata)
    setloader(0)
   }
   catch(e){
    console.log(e)
     swal('Error occured at backend')
     setloader(0)
   }
  }
  useEffect(()=>{
  handlegetpost()
  },[])
  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
         {
          loader?<Spinner size={'xl'}></Spinner>:<>
              {
                postdata.length>0?<>
                 {
                  postdata.map((u)=>{
                    return(
                      <Postcard userdata={props.usersdata} handlegetpost={handlegetpost} postid={u._id} userid={props.id} likes={u.likes} image={u.image.url}  user={u.user} likesstatus={u.likestatus} createdat={u.createdAt} description={u.caption} comments={u.comments} likescount={u.likescount}></Postcard>
                    )
                  })
                 }
                     <button
                       id="scrollToTopBtn"
                       className={isVisible ? 'show' : 'hide'}
                       onClick={scrollToTop}
                       >
                         <ArrowUpIcon />
                     </button>

                </>:
                <Text>No Post Exist</Text>
              }
          </>
         }
      </div>
    </div>
  )
}

export default Homepage
