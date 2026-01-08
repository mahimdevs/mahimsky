import { useState, useRef, useCallback } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
}

const ImageUpload = ({ value, onChange, folder }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imageError, setImageError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'Image must be less than 5MB', variant: 'destructive' });
      return;
    }

    setUploading(true);
    setImageError(false);

    const timeoutMs = 25000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('UPLOAD_TIMEOUT')), timeoutMs)
    );

    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      const snapshot = (await Promise.race([
        uploadBytes(storageRef, file),
        timeoutPromise,
      ])) as any;

      const url = await getDownloadURL(snapshot.ref);
      onChange(url);
      toast({ title: 'Success', description: 'Image uploaded successfully' });
    } catch (error: any) {
      console.error('Upload failed:', error);

      const code = error?.code as string | undefined;
      const message = (error?.message as string | undefined) ?? String(error);

      let errorMessage = 'Failed to upload image.';
      if (message === 'UPLOAD_TIMEOUT') {
        errorMessage = 'Upload timed out. Please check Firebase Storage setup and try again.';
      } else if (code === 'storage/unauthorized') {
        errorMessage = 'Storage access denied. Please check Firebase Storage rules.';
      } else if (code === 'storage/canceled') {
        errorMessage = 'Upload was cancelled.';
      } else if (code === 'storage/unknown') {
        errorMessage = `Storage error: ${message}`;
      } else if (message) {
        errorMessage = message;
      }

      toast({ title: 'Upload Failed', description: errorMessage, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [folder, onChange, toast]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  }, [uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleRemove = () => {
    onChange('');
    setImageError(false);
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id={`image-upload-${folder}`}
      />
      
      {value && !imageError ? (
        <div className="relative w-20 h-20 rounded border border-border overflow-hidden group">
          <img 
            src={value} 
            alt="Uploaded" 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : value && imageError ? (
        <div className="relative w-20 h-20 rounded border border-destructive/50 overflow-hidden group bg-destructive/10 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-destructive/50" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`
            h-20 w-20 rounded border-2 border-dashed cursor-pointer
            flex flex-col items-center justify-center gap-1 transition-all
            ${dragOver 
              ? 'border-primary bg-primary/10 scale-105' 
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }
            ${uploading ? 'pointer-events-none opacity-70' : ''}
          `}
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className={`w-5 h-5 ${dragOver ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] ${dragOver ? 'text-primary' : 'text-muted-foreground'}`}>
                {dragOver ? 'Drop' : 'Upload'}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;