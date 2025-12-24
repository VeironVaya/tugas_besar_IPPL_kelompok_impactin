export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "impactin_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dscz9j9ui/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};
