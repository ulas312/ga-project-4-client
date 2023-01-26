import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export default function UploadedPicture({ cloudinaryImageId }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(cloudinaryImageId);

  myImage.resize(thumbnail().width(200).height(200).gravity); // Crop the image, focusing on the face.

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
