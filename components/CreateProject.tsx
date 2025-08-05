
'use client'

import { useCreateProject } from '@/reactQuery/mutation/home';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

function CreateProject() {
  const { mutate, isPending:isLoading, isError, error, isSuccess } = useCreateProject();
  
  const [formData, setFormData] = useState({
    name: '',
  });
// console.log(formData)
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // console.log(formData);
    mutate(formData);
  };

  useEffect(() => {
    if (isError) {
        // console.log(error);
      toast.error("Error creating project", {
        description: error.message || "An error occurred while trying to create the project.",
        // ... other toast properties
      });
    }
  
    if (isSuccess) {
      toast.success("Project created!", {
        description: "Your project has been created successfully.",
        // ... other toast properties
      });
    }
  }, [isError, isSuccess, error]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      {/* ... other fields ... */}
      <button type="submit" disabled={isLoading}>Create Project</button>
    </form>
  );
}

export default CreateProject;