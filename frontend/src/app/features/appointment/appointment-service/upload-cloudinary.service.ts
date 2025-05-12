import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadCloudinaryService {
  private cloudName = 'dwygcrj5r';
  private uploadPreset = 'form_user_upload';

  uploadImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
      })
      .then((data) => data.secure_url as string);
  }
}
