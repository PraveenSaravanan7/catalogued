import React, { useEffect, useState } from 'react'
import { Header_two } from "../components/Header_two"
import FeatherIcon from "feather-icons-react"
import imageCompression from 'browser-image-compression';
import axios from "../api";
import { useLocation } from 'react-router-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
//var worldMapData = require('city-state-country')

export const AddPost = () => {
  var [profilepic,setprofilepic]=useState(null)
  var [showcroper,setshowcroper]=useState(false)
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  var [filename,setfilename]=useState();
  var query=new URLSearchParams(useLocation().search);
  var formData_form = new FormData()
  var [postsuccess, setpostsuccess] = useState(false)
  var [formData, updateFormData] = useState([]);
  var [loading, setloading] = useState(false);
  var [loadingpreview, setloadingpreview] = useState(false);
  var [err, seterr] = useState(false);
  // var [Country, updateCountry] = useState([]);
  // var [States, updateStates] = useState([]);
  var [imgURL, updateimgURL] = useState(null)

  async function uploadpost() {
    for (var key in formData) {
      formData_form.append(key, formData[key]);
    }
    //console.log(formData)
    setloading(true)
    seterr(false)
    try {
      const response = await axios.post('/posts', formData_form);
      if (response) {
        setloading(false)
        setpostsuccess(true)
        window.scrollTo(0, 0)
      }

    } catch (error) {
      seterr(error);
      setloading(false)
    }
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
    //formData_form.append( e.target.name,e.target.value.trim())
  };
  function handleAdd(event) {
    event.preventDefault();
    uploadpost()
    //formData_form.map((i)=>console.log(i))
  }

  // async function imgurlupd(file) {
  //   let imageDataUrl = await URL.createObjectURL(file)
  //   updateimgURL(imageDataUrl)
  // }
  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
    //  console.log(file)
      setfilename(e.target.files[0].name)
      let imageDataUrl = await URL.createObjectURL(file)
      setprofilepic(imageDataUrl)
     
      setshowcroper(true)
    }
  }
  const getCropData = () => {
    setloadingpreview(true)
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob)=>{
        imageCompression(blob, {maxSizeMB:1,maxWidthOrHeight:1000})
        .then((file)=> {
         // formData_form.append("avatar",file,filename)
         updateFormData({
                ...formData,
                avatar: file
              });
          setprofilepic(cropper.getCroppedCanvas().toDataURL())
          setshowcroper(false)
          setloadingpreview(false)
          // editprofilepic()
          // .then(setprofilepic(cropper.getCroppedCanvas().toDataURL()))
          // .then(setshowcroper(false))
        });
        
          //  console.log(profilepic)
         
      })
    
 
      
    }
  };
  // useEffect(()=>{
  //       setprofilepic(null)
  // },[])
  // const handlePhoto = (event) => {
  //   setloadingpreview(true)
  //   if (event.target.files[0]) {
  //     imageCompression(event.target.files[0], { maxSizeMB: 2, maxWidthOrHeight: 1080 })
  //       .then((file) => {
  //         //formData_form.append("avatar",file,event.target.files[0].name)
  //         updateFormData({
  //           ...formData,
  //           avatar: file
  //         });
  //         imgurlupd(file)
  //           .then(setloadingpreview(false))

  //       });
  //   }
  // };
  //   useEffect(() => {
  //     if(formData.country){
  //     updateCountry(worldMapData.searchCountry(formData.country));          
  //     }
  // }, [formData.country])
  // useEffect(() => {
  //     if(formData.state){       
  // updateStates(worldMapData.getAllStatesFromCountry(formData.country));          
  //     }
  // }, [formData.state])
  useEffect(() => {
   // console.log(query.get("type"))
    updateFormData({
      ...formData,
      type: query.get("type"),
      category: query.get("category"),
      avatar: null
    });
  }, [])
  return (
    <div className="mt70  pb-5">
      <Header_two name="Add" ></Header_two>
      {postsuccess ? <div className="text-center " >
        <h1>Upload Successfull.</h1>
      </div> : <>
          <form className="pt-1 px-2" onSubmit={(event) => handleAdd(event)}>

            <div className="form-group ">
              <span ><b>Title</b></span>
              <input type="text" className="form-control" required name="title" onChange={handleChange} />
            </div>
            <div className="form-group ">
              <span ><b>Description</b></span>
              <textarea type="text" className="form-control" required name="description" onChange={handleChange}></textarea>
            </div>
            {formData.type=="product"?
            <div className="form-group ">
              <span ><b>Price</b></span>
              <input type="number" className="form-control" required name="price" onChange={handleChange} />
            </div> :<></> }


      
            <input hidden id="postphotoinput" name="avatar" type="file" accept="image/*" required onChange={onFileChange} />

            <button type="submit" id="submitpost" hidden className="mt-3 btn  btn-primary">
              {loading ? <>Loading...</> : <>Post</>}
            </button>
          </form>
          {showcroper?  <>
                <Cropper
          style={{ height: 200, width: "90%" }}
          initialAspectRatio={9/16}

          src={profilepic}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={0}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
        <button className="btn btn-outline-primary btn-block mt-2" onClick={getCropData} >{loadingpreview? <> loading</>:<>Crop</>}</button></>
        :
            <img  src={profilepic} className="img-preview  mb-2" />
                }
          {/* {
            imgURL && <img className="img-preview  mb-2" src={imgURL} />
          } */}

          <button onClick={() => { document.getElementById('postphotoinput').click() }} className="btn btn-light btn-block mt-2" >
            {loadingpreview ? <>Loading...</> : <><FeatherIcon icon="image" ></FeatherIcon> Add Photo</>} </button>

          {err &&
            <span className="text-danger font-weight-bold">Error <br /></span>
          }
        {formData.avatar &&
          <button onClick={() => { document.getElementById('submitpost').click() }} className="mt-3 btn  btn-primary">
            {loading ? <>Loading...</> : <>Upload</>}
          </button>
}
          </>}
      {/* <button onClick={uploadpost} >test</button> */}
    </div>
  )
}
