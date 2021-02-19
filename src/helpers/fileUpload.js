
export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/jaimecamargo/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {

            const cloudResp = await resp.json();
            //
            // Cloudinary retorna en la propiedad 'secure_url' la url
            // con la que podemos acceder al recurso
            return cloudResp.secure_url;
        }
        else {
            throw await resp.json();
        }

    } catch (error) {

        console.log(error);

    }
}