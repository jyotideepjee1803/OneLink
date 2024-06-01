"use client";
import { CloudUploadIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner';

const ImagePicker = ({dataUrl, setDataUrl} : { dataUrl: string | null; setDataUrl: (dataUrl? : string|null) => void;}) => {
    
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file){
          const data = new FormData();
          data.set('file', file);
          try {
            setUploading(true);
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: data,
            });
    
            if (response.ok) {
              const link:string = await response.json();
              toast.success('Uploaded!');
              setDataUrl(link);
              setUploading(false);
            } else {
              setUploading(false);
              throw new Error('Upload error!');
            }
          } catch (error) {
            toast.error('Upload error!');
            throw error;
          }
        }
    }
    
    return (
        <div className="relative w-[80px] h-[80px]">
        <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
          {dataUrl && <Image
            className="w-full h-full object-cover"
            src={dataUrl}
            alt={'avatar'}
            width={80} height={80} />
          }
        </div>
        <label
          htmlFor=""
          className="absolute bottom-0 -left-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
          <TrashIcon className="h-4 w-4" onClick={()=>setDataUrl(null)}/>
        </label>
        <label
          htmlFor="avatarIn"
          className="absolute bottom-0 -right-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
          <CloudUploadIcon className="h-4 w-4"/>
        </label>
        <input onChange={handleFileChange} id="avatarIn" type="file" className="hidden" disabled={uploading}/>
        <input type="hidden" name="avatar"/>
      </div>
    )
}

export default ImagePicker