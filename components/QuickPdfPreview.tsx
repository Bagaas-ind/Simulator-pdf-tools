"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud, X, ExternalLink } from "lucide-react";

export default function QuickPdfPreview() {
  const [file,setFile]=useState<File|null>(null);
  const [url,setUrl]=useState("");
  const [error,setError]=useState("");
  useEffect(()=>{ if(!file){setUrl("");return;} const next=URL.createObjectURL(file);setUrl(next);return()=>URL.revokeObjectURL(next);},[file]);
  const onDrop=useCallback((files:File[])=>{const next=files[0];if(!next)return;if(next.size>100*1024*1024){setError("Ukuran file maksimal 100 MB.");return;}setError("");setFile(next);},[]);
  const {getRootProps,getInputProps,isDragActive,open}=useDropzone({onDrop,multiple:false,noClick:true,accept:{"application/pdf":[".pdf"]},onDropRejected:()=>setError("Pilih file PDF yang valid.")});
  return <div className="quick-preview" {...getRootProps()}>
    <input {...getInputProps()}/>
    {file && url ? <div className="preview-ready">
      <div className="preview-toolbar"><span><FileText size={16}/><b className="truncate">{file.name}</b><small>{(file.size/1024/1024).toFixed(2)} MB</small></span><button type="button" onClick={()=>setFile(null)} aria-label="Hapus file"><X size={17}/></button></div>
      <iframe title="Pratinjau PDF" src={url} className="pdf-frame"/>
      <div className="preview-actions"><button type="button" onClick={open}>Ganti file</button><a href={url} target="_blank" rel="noreferrer">Buka penuh <ExternalLink size={13}/></a></div>
    </div> : <button type="button" onClick={open} className={isDragActive?"drop-target active":"drop-target"}>
      <span className="upload-orb"><UploadCloud size={24}/></span><b>{isDragActive?"Lepaskan PDF di sini":"Tarik & lepas PDF di sini"}</b><small>atau klik untuk memilih file · Maks. 100 MB</small><span className="browse-file">Pilih file PDF</span>
    </button>}
    {error&&<p role="alert" className="mt-3 text-xs text-red-500">{error}</p>}
  </div>;
}
