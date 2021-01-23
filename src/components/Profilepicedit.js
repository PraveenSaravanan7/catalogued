import React, { useCallback, useEffect, useState } from 'react'
import userdp from '../assets/dp.svg'
import './Profilepicedit.css';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from '../api'
import imageCompression from 'browser-image-compression';

export const Profilepicedit = (props) => {
  const reader = new FileReader()
  var [profilepic, setprofilepic] = useState(props.pic)
  var [showcroper, setshowcroper] = useState(false)
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  var [filename, setfilename] = useState();
  //var [formData, updateFormData] = useState([]);
  var [loadingsave, setloadingdsave] = useState(false);
  var [errsave, seterrsave] = useState(false);
  var formData = new FormData();
  // console.log(profilepic)
  async function editprofilepic() {
    // console.log(formData)
    setloadingdsave(true)
    seterrsave(false)
    try {
      const response = await axios.put('/users/profilephoto', formData);
      if (response) {
        // console.log(response)
        setloadingdsave(false)
        return true
      }

    } catch (error) {
      seterrsave(error);
      setloadingdsave(false)
    }
  }

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
    setloadingdsave(true)
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob) => {
        imageCompression(blob, { maxSizeMB: 2, maxWidthOrHeight: 1000 })
          .then((file) => {
            formData.append("avatar", file, filename)
            editprofilepic()
              .then(setprofilepic(cropper.getCroppedCanvas().toDataURL()))
              .then(setshowcroper(false))
          });

        //  console.log(profilepic)

      })



    }
  };
  useEffect(() => {
    setprofilepic(props.pic != null ? props.pic : userdp)
  }, [])
  return (
    <div className="row mt-3">
      <div className="m-auto">
        {showcroper ? <>
          <Cropper
            style={{ height: 200, width: "90%" }}
            initialAspectRatio={4 / 3}
            aspectRatio={4 / 3}
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
          <button className="btn btn-outline-primary btn-block mt-2" onClick={getCropData} >{loadingsave ? <> loading</> : <>Crop & Upload</>}</button></>
          :
          <img src={profilepic} className="dp" />
        }
      </div>
      <div className="col-12 mt-3" >
        <input hidden id="photoinput" type="file" accept="image/*" onChange={onFileChange} />

        <button className="btn btn-primary btn-block" onClick={() => { document.getElementById('photoinput').click() }} > Change Image </button>
      </div>

    </div>
  )
}
