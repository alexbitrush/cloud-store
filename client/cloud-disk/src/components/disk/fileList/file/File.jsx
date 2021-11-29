import React from 'react'
import './File.css';
import {useDispatch, useSelector} from 'react-redux'
import folderlogo from '../../../../assets/img/folder-icon.svg'
import fileLogo from '../../../../assets/img/file-storage.svg'
import { setCurrentDir, pushToStack } from '../../../../reducers/fileReducers';
import {downloadFile} from '../../../../actions/file';

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    function openDirHandle(file){
        if(file.type === 'dir'){
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }
    function onHandleDownload(event){
        event.stopPropagation()
        downloadFile(file)
    }
    return (
        <div className='file' onClick={() => openDirHandle(file)}>
            <img src={file.type === 'dir' ? folderlogo : fileLogo} className='icon'/>
            <div className='file_name'>{file.name}</div>
            <div className='file_type'> {file.date.slice(0, 10)}</div>
            <div className='file_size'>{file.size}</div>
            {file.type !== 'dir' && <button onClick={(event) => onHandleDownload(event)} className='file_download'>Download File</button>}
            <button className='file_delete'>Delete File</button>
        </div>
    )
}
export default File