import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function FullScreenDialog() {

  useEffect(()=>{
    preview();
    return()=>preview();
  })
  const preview = ()=>{
    if(!files)return false;
    const imgEl=document.querySelector('.img__box');
    const reader = new FileReader();
    reader.onload=()=>(imgEl.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(files[0]);
  }
  const [files,setFiles] = useState('');
  
  const onLoadFile = (e) =>{
    const file = e.target.files;
    console.log(file);
    setFiles(file);
  }

  const handleClick=(e)=>{
    const formdata = new FormData();
    formdata.append('uploadImage',files[0]);
    const config = {
      Headers: {
        'content-type':'multipart/form-data'
      }
    }

    axios.post('api',formdata,config);
  }

  return (
    <div>
      <div>
        <strong>업로드된 이미지</strong>
        <div>
          <img src='' alt=''/>
        </div>
      </div>
      <form>
        <input type="file" accept="img/*" onChange={onLoadFile}/>
        <label htmlFor='imgae'>파일 선택하기</label>
      </form>
      <Button variant="outlined" onChange={handleClick}>
        저장하기
      </Button>
    </div>
  );
}
