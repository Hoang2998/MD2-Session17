import React, { useEffect, useState } from 'react'
import { storage } from './config/firebase'
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { getAllProduct } from './store/index.js';

export default function App() {
  const [imageUpload , setImageUpload] = useState(null)
  const [urlImage,setUrlImage] = useState(null)
  const [productName,setProductName] = useState({
    name:"",
    img:""
  })
  const [products,setProduct] = useState([])
  const dispatch = useDispatch()
  useEffect(()=>{
    // setProduct(data)

    dispatch(getAllProduct())
  },[])
  const data = useSelector((state) => state.productReducer)

  const changeImage=(e)=>{
    let file = e.target.files[0];
    // console.log("1111",file[0].name)
    setImageUpload(file)
  }
  const handleAdd = ()=>{
    if(imageUpload == null) return;
    const imageRef = ref(storage,`image/${imageUpload.name}`);
    uploadBytes(imageRef,imageUpload).then((result)=>{
      getDownloadURL(result.ref).then((url)=>{
        setUrlImage(url)
        let product={
          name:productName,
          image:url
        }
        console.log(product);
        axios.post("http://localhost:8000/products",product)
        // dispatch(getAllProduct())
      })
    })
  }
  return (
    <div>
      <label htmlFor="">name</label>
      <input type="text" onChange={(e)=>{setProductName(e.target.value)}}/>
      <br />
    <input type="file" onChange={changeImage}/>
    <button onClick={handleAdd}>Add</button>
    <img src={urlImage} alt="" />
    <div>
      render
        {
          data.products?.map((item)=>{
            return <div>
              <p>{item.name}</p>
              <img src={item.image} alt="" />
            </div>
          })
        }
    </div>
    </div>
    
  )
} 