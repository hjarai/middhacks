import {useState} from 'react';
import FileBase64 from 'react-file-base64';
import Pick from './Pick.js';

export default function Upload({append, setPage}) {
    const defaultimage = "./images/trees.png";
    const [picsrc, setPicSrc] = useState(defaultimage);
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [user, setUser] = useState("Anonymous");
    const [desc, setDesc] = useState("")
    const [fileData, setFileData] = useState();

    const editTime = new Date();

    const newEntry = {
        src: picsrc, 
        latitude: lat,
        longtitude: long,
        user: user,
        description: desc,
        time: editTime.toISOString()
    };

     
  const handleImage = async () => {
      return;
    // // make sure we have an image file
    // if (fileData===undefined) {
    //   alert('Please select a file.');
    // } else if (/\.(jpe?g|png)$/i.test(fileData.name)) {
    //   // create our payload 
    //   const imageData = {
    //     name:fileData.name,
    //     image:fileData.base64,
    //     id:Date.now()
    //   }

    //   //figure out suffix
    //   const header = (imageData.image.split(","))[0];
    //   const suffix = header.slice(11,header.indexOf(';'));

    //   // send it to the server
    //   const response = await fetch('/api/image',{
    //     method:'POST',
    //     body:JSON.stringify(imageData),
    //       headers: new Headers({ 'Content-type': 'application/json' }),
    //   });

    //   if (response.ok){
    //     setPicSrc(`./uploads/${imageData.id}.${suffix}`);
    //    }
    // } 
    setPicSrc(fileData);
  }

    return(
        <div className="card">
            <div>
                <img src= {picsrc} width="200" height="200"/>
                <label className = "photoLabel" htmlFor= "userImage"/>
                <input id="userImage" name="userImage" 
                    aria-label = "Import Image" type="button" value="Upload Image" onClick={handleImage} />
                <FileBase64 multiple={false} onDone={setFileData} />
                <p>Describe your experience!</p>
                <div>
                    <textarea 
                    placeholder = "Enter your hiking experience"
                    value={desc} 
                    onChange={(event)=>setDesc(event.target.value)}
                    />
                </div>
                <p>pick your coordinates</p>
                <p>latitude: {lat}</p>
                <p>longtitude: {long}</p>
                <div className = "small">
                    <Pick setLat={setLat} setLong={setLong}/>
                </div>
            </div>
            <button onClick={()=>{append(newEntry); setPage(false)}}>Submit</button>
        </div>
    );
}