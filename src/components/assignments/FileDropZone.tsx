'use client';
import { useState, useRef } from 'react';
import { Upload, File as FileIcon, FileText, Image as ImageIcon, X } from 'lucide-react';

export default function FileDropZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatUkuran = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const validateAndAddFiles = (newFiles: File[]) => {
    setError('');
    const validFiles = [];
    for (const file of newFiles) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Maksimal ukuran file adalah 10MB');
        return;
      }
      validFiles.push(file);
    }
    
    if (files.length + validFiles.length > 5) {
      setError('Maksimal 5 file yang dapat diunggah');
      return;
    }
    
    setFiles([...files, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    return <FileIcon className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-md p-8 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-10 h-10 mx-auto text-slate-400 mb-4" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Seret file ke sini atau klik untuk memilih
        </p>
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
        />
        <button type="button" className="btn-secondary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
          Pilih File
        </button>
      </div>

      {error && (
        <div className="mt-3 text-red-500 text-sm font-medium">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 overflow-hidden">
                {getFileIcon(file.type)}
                <div className="truncate">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatUkuran(file.size)}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
