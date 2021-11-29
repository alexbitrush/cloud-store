import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getFiles from '../../actions/file'
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import  './Disk.css'
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducers"
import { uploadFile } from '../../actions/file';

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setdragEnter] = useState(false)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }
    function backHandleClick() {
      const backDirId = dirStack.pop()
      dispatch(setCurrentDir(backDirId))
    }
    function handleUploadFile(event) {
        const files =[...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    function dragDropHandlerEnter(event){
        event.preventDefault()
        event.stopPropagation()
        setdragEnter(true)
    }
    function dragDropHandlerLeave(event){
        event.preventDefault()
        event.stopPropagation()
        setdragEnter(false)
    }
    function onDrop(event){
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setdragEnter(false)
    }
    return (!dragEnter  ?
        <div className="disk" onDragEnter={dragDropHandlerEnter} onDragLeave={dragDropHandlerLeave} onDragOver={dragDropHandlerEnter}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backHandleClick()}>Back</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Create Folder</button>
                <div className='disk__upload'>
                    <label htmlFor="" className='disk__upload_file'>Upload file</label>
                    <input multiple={true} type="file" onClick={(event)=> handleUploadFile(event)} id='disk__upload_file' className='disk__upload_file'/>
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div> 
        :
        <div className='drag-area' onDrop={onDrop} onDragEnter={dragDropHandlerEnter} onDragLeave={dragDropHandlerLeave} onDragOver={dragDropHandlerEnter}>
            Please enter file here
        </div>
    );
};

export default Disk;