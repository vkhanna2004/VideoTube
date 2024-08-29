import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log(" Error :: File not found at the specified path. ");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); //deleting file locally

    return response;
  } catch (error) {
    console.error(" Error uploading to Cloudinary ::", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const deleteFromCloudinary = async (cloudinary_url, resourceType = "image") => {
  try {
    //extract public id from url
    const getPublicId = (cloudinary_url) =>
      cloudinary_url.split("/").pop().split(".")[0];

    const publicId = getPublicId(cloudinary_url);

    if (!publicId) {
      console.log(
        " Error :: File to be DELETED is not found at the specified path."
      );
      return null;
    }

    //delete the image using that public id
    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: resourceType,
    });

    if (response.result === "not found") {
      console.log(
        `Error: The resource with public ID ${public_id} was not found in Cloudinary.`
      );
      return null;
    } else if (response.result === "ok") {
      console.log(`Success: Resource with public ID ${public_id} deleted.`);
    } else {
      console.log(`Unexpected response from Cloudinary:`, response);
    }

    //checking if the deletion operation was successful or not
    const searchResult = cloudinary.search
      .expression(`public_id: ${publicId} `)
      .sort_by("public_id", "desc")
      .max_results(1)
      .execute();

    if (searchResult.total_count > 0) {
      console.log(
        `Resource with public ID ${public_id} still exists after deletion attempt.`
      );
    } else {
      console.log(
        `Resource with public ID ${public_id} has been successfully deleted.`
      );
    }

    return response;
  } catch (error) {
    console.error(" Error deleting from Cloudinary ::", error);
    return null;
  }
};
export { uploadOnCloudinary, deleteFromCloudinary };
