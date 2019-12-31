import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig";
import { Badge, ProgressBar  } from "react-bootstrap";

const storage = firebase.storage();
const storageRef = storage.ref();

const ImageUpload = ({ setUrl, url }) => {

  const [image, setImage] = useState(null);
  const [ progress, setProgress] = useState(0);


  const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleUpload = () => {
  if(!image) return;
   const uploadTask = storageRef.child(`images/${image.name}`).put(image);
   uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
          setUrl(url);
        });
      }
    );
  };

  return (
    <>
      <div>

        <br />
        <input 
        type="file"
         onChange={handleChange} 
         accept="image/*" 
         />
           <Badge 
           pill variant="warning"  
           onClick={handleUpload}
           style={{ cursor: "pointer" }}
           >Upload Your Profile Picture</Badge>
        <br /> 

        <br />
        <ProgressBar 
         now={progress}
          variant="warning"
          />
        <img
          src={url || "http://via.placeholder.com/40x30"}
          alt="Uploaded images"
          height="80"
          width="80"
          style={{ 
            borderRadius: "50%",
            margin: "0 auto",
            display:"block",
            marginTop: "20px"
            }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
