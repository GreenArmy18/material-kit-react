import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase-client';

export default ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    console.log('downloadImage', path);
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      console.log('data', data);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      console.log('url', url);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ width: size }} aria-live="polite">
      <Avatar
        src={avatarUrl || `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        className="avatar image"
        // style={{ height: size, width: size }}
        sx={{ width: 150, height: 150 }}
      />
      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <text className="button primary block" htmlFor="single">
            Upload an avatar
          </text>
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </>
      )}
    </div>
  );
};
