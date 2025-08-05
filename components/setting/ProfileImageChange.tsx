'use client'

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutateFetcherWithAuthAndImage } from '@/lib/mutations';

const ProfileImageChange = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { mutate } = useMutation({
    mutationFn: (data) => mutateFetcherWithAuthAndImage('/profile', data),
    onError: (error) => {
      console.error('Update failed', error);
    },
    onSuccess: () => {
      // console.log('Profile updated!');
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Basic validation (add more robust checks as needed)
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type. Please select an image.');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profile_image', selectedFile);

    try {
      await mutate(formData);
      // console.log('Image uploaded successfully');
    } catch (error) {
      // console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={onFileUpload}>
      <input type='file' onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {previewUrl && <img src={previewUrl} alt="Profile preview" className="inline-block h-14 w-14 rounded-full object-cover" />}
    </form>
  );
};

export default ProfileImageChange;