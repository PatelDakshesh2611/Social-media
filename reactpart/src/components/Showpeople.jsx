import React, { useEffect, useState } from 'react'
import { Text,Spinner } from '@chakra-ui/react'
import Peoplecard from './Peoplecard'
import axios from 'axios'
import swal from 'sweetalert'

const Showpeople = (props) => {
  const [people,setpeople]=useState([])
  const status='allowfollow'
  const [show,setshowpeople]=useState([people])
  const [loader,setloader]=useState(0)
  const getpeople=async()=>{
    try{
      setloader(1)
      const res=await axios.get(`http://localhost:4000/getpeople/${props.id}`)
      setpeople(res.data.people)
      setshowpeople(res.data.people)
      setloader(0)
    }catch(e){
      setloader(0)
      swal('error occured at backend')
    }
  }
  const search=(value)=>{
    const searchdata=people.filter((u)=>{
      return u.name.toLowerCase().includes(value.toLowerCase())
    })
    
    setshowpeople(searchdata)
  }
  useEffect(()=>{
    getpeople()
  },[])
  return (
    <div>
     
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <input onChange={(e)=>search(e.target.value)} placeholder='Search for friends' style={{border:'2px solid grey',width:'30vw',height:'8vh',borderRadius:'7px',fontSize:"20px",textAlign:'center'}} type="text" name="" id="" />
        {
          loader?<Spinner/>:<>
          {
          people.length>0?<>
          {
             show.length>0?<>
             {
              show.map((u)=>{
                return<Peoplecard user={u} getpeople={getpeople} status={u.status} id={props.id}></Peoplecard>
                
               })
             }
             </>:<Text>No result found for your search</Text>
          }
          </>:<Text>No people to follow</Text>
        }
          </>
        }
    </div>
    </div>
  )
}

export default Showpeople
