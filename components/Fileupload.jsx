"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const FileUpload = () => {
    const [dragging, setDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState({});
    const [resultURL, setResultURL] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0]; // Only handle the first file
        setDragging(file);
        handleFile(file);

    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; // Only handle the first file
        setFile(file);
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        const id = setInterval(() => setLoading(!loading), 1000);
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', file, file?.name);
        axios.post("/api/remove", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: 'arraybuffer'
        }).then(res => {
            if (res.status == 200) {
                const blob = new Blob([res.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                console.log(imageUrl)
                setResultURL(imageUrl);
                setUploadedFile(null)
                clearInterval(id);
            }
        }).catch(err => {
            const msg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(err.response.data)))
            setErrors(msg.errors);
            setLoading(false);
        })
    }

    return (
        <div className='w-full flex gap-2 justify-around'>
            {(!uploadedFile && !resultURL) && <div
                className={`w-[100%] h-64 border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center  ${dragging ? 'bg-gray-200' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {(
                    <>
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileInputChange}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 mx-auto mb-3 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 0 1 .832.445l4.007 5.007a1 1 0 0 1 .11.137l.02.026A.75.75 0 0 0 15.75 9h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h2a.75.75 0 0 0 .606-.306l.02-.026a1 1 0 0 1 .11-.137l4.007-5.007A1 1 0 0 1 10 3zm0 2.62L7.568 8h4.864L10 5.62zM9 17v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-sm text-gray-600">Drag and drop a file here or click to select</p>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Select File
                                </button>
                            </div>
                        </label>
                    </>
                )}

            </div>}
            {uploadedFile && typeof uploadedFile === 'string' && (
                <div className={`text-center relative w-[70%] ${loading ? 'loading' : ''}`}>
                    <img src={uploadedFile} alt="Uploaded" className={`max-[100%]`} />
                </div>
            )}
            {
                resultURL && <div className='relative w-[70%]'>
                    <img src={resultURL} alt="Uploaded" className="max-[100%]" />
                </div>
            }
            {(resultURL || uploadedFile) && <div className='w-[40%] px-4 py-2 flex flex-col gap-5 text-center'>
                {
                    errors.map((error, key) => <div key={key} className='p-3 rounded tracking-wide bg-black text-sm text-white'>{error.title}</div>)
                }
                {
                    resultURL && <a href={resultURL} download={'remove.png'} className='px-4 py-2 text-center rounded w-[100%] bg-slate-950 text-white'>DOWNLOAD</a>
                }
                {
                    (uploadedFile && errors.length == 0) && <button onClick={() => handleRemove()} className='bg-red-300 px-4 py-2 text-center rounded w-[100%]'>Remove BG</button>
                }
                {
                    (errors.length > 0) && <button onClick={() => { setUploadedFile(null), setLoading(false), setErrors([]) }} className='px-4 py-2 text-center rounded w-[100%] border'>Upload Again</button>
                }
            </div>}
        </div>
    );
};

export default FileUpload;
