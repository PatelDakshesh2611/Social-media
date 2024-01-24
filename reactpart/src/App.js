import React, {  useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Allroutes from './components/Allroutes'
const App = () => {
  const [id,setid]=useState('')
  const [usersdata,setudata]=useState({
    _id:'',
    name:'',
    avatar:{
     
    },
  })
  const checker=()=>{
    if(localStorage.getItem('id') && localStorage.getItem('userdata')){
      setudata(JSON.parse(localStorage.getItem('userdata')))
      setid(localStorage.getItem('id'))
    }
  }
 useEffect(()=>{
   checker()
 },[])
const [imageloader,setimageloader]=useState(0)
  return (
    <div>
     {id?  <Navbar imageloader={imageloader} avatar={usersdata.avatar} name={usersdata.name}></Navbar>:''}
      <Allroutes id={id} imageloader={imageloader} setimageloader={setimageloader} setid={setid} usersdata={usersdata} setudata={setudata}></Allroutes>
    </div>
  )
}

export default App
