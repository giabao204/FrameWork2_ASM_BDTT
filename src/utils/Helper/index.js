const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader);
        reader.onerror = (error) => reject(error);
    });
};

export { convertFileToBase64 };