import { IncomingForm } from "formidable";
var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      var oldPath = files.file[0].filepath;
      var newPath = `./public/images/${files.file[0].originalFilename}`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json(`/images/${files.file[0].originalFilename}`);
    });
  });
};

//  import formidable from "formidable";
//  import path from "path";
// import fs from "fs/promises";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const readFile = async (req, saveLocally = true) => {
//   const options = {};
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "/public/images");
//     options.filename = (name, ext, path) => {
//       return Date.now().toString() + "_" + path.originalFilename;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;

//   const form = formidable(options);

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         const uploadedFile = files.file; // Assuming your file input has the name "file"
//         console.log(files);
//         resolve({ fields, file: uploadedFile });
//       }
//     });
//   });
// };

// export default async function handler(req, res) {
//     console.log('req.body-->',req.body);
//   if (req.method === "POST") {
//     try {
//       await fs.readdir(path.join(process.cwd(), "/public", "/images"));
//     } catch (error) {
//       await fs.mkdir(path.join(process.cwd(), "/public", "/images"));
//     }

//     try {
//       //const { file } = await readFile(req, true);

//       res.json({ done: "ok", file });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// // pages/api/upload.js

// import fs from "fs";
// import path from "path";
// import { promisify } from "util";
// import formidable from "formidable";

// const writeFile = promisify(fs.writeFile);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const form = formidable();
//   form.uploadDir = path.join(process.cwd(), "public", "images");

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Error parsing form", err);
//       res.status(500).json({ error: "Error parsing form" });
//       return;
//     }
//     //console.log(" dd: ", files);

//     //const imageBuffer = fs.readFileSync(files.file.path);
//     const imagePath= `public/images/${Date.now()}_image.png`;

//     try {
//       await writeFile(imagePath, req.body);
//       const imageUrl = `/${imagePath}`;

//       res.status(200).json({ imageUrl });
//     } catch (writeError) {
//       console.error("Error writing file", writeError);
//       res.status(500).json({ error: "Error writing file" });
//     }
//   });
// }

// const formidable = require("formidable");
// const path = require("path");
// const fs = require("fs/promises");

// const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const saveFile = async (file, destination) => {
//   const extension = file.name.split('.').pop();
//   const newFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`;
//   const newPath = path.join(destination, newFileName);

//   await fs.writeFile(newPath, file, 'binary');
//   return newFileName;
// };

// const readFile = (req, saveLocally) => {
//   const options = {};
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "public/images");
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;

//   const form = new formidable.IncomingForm(options);
//   console.log("fomr daa : ", form);

//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       console.log(files);
//       const filePath = saveLocally ? await saveFile(files, options.uploadDir) : null;

//       resolve({ fields, filePath });
//     });
//   });
// };

// const handler = async (req, res) => {
//   try {
//     await fs.readdir(path.join(process.cwd(), "public/images"));
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd(), "public/images"));
//   }

//   const { filePath } = await readFile(req, true);

//   res.status(200).json({ done: "ok", filePath });
// };

// export { handler as default, config };

// import { IncomingForm } from "formidable";
// import { promises as fs } from "fs";
// import sharp from "sharp"

// first we need to disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req, res) => {
// //console.log(req.body);
//   if (req.method === "POST") {
//     console.log(req.body);
//     // parse form with a Promise wrapper
//     // const data = await new Promise((resolve, reject) => {
//     //   const form = new IncomingForm();
//     //   form.parse(req, (err, fields, files) => {
//     //     if (err) return reject(err);
//     //     resolve({ fields, files });
//     //   });
//     // });

//     //try {

//       //const imageFile = data.fields.file;
//       //const imagePath = imageFile.filepath;
//       //console.log(imageFile);
//       // Get the original filename to use it for storing
//       //const originalFileName = req.body;
//       //console.log(originalFileName);

//       // Define the path to write the image (public folder)
//       const pathToWriteImage = `public/images/save.png`;

//       // Read the image and write it to the specified path
//       //const image = await fs.readFile(imagePath);
//       await sharp(req.body).toFile(pathToWriteImage);

//       // Store the path in the database or use it as needed
//       //const imagePathInDB = `/images/${Date.now()}_${originalFileName}`;

//       // Respond with a success message
//       res
//         .status(200)
//         .json({ message: "Image uploaded!"});
//     // } catch (error) {
//     //   // Handle errors and respond with an error message
//     //   res.status(500).json({ message: error.message });
//     //   return;
//     // }
//   }
// };

// import { promises as fs } from "fs";
// import path from "path";
// import formidable from 'formidable';
// /* Don't miss that! */
// export const config = {
//     api: {
//         bodyParser: false,
//     }
// };
// const handler = async (req, res) => {
//     let status = 200, resultBody = { status: 'ok', message: 'Files were uploaded successfully' };
//     /* Get files using formidable */
//     const files = await new Promise((resolve, reject) => {
//         const form = formidable.IncomingForm();
//         const files = [];
//         form.on('file', function (field, file) {
//             files.push([field, file]);
//         });
//         form.on('end', () => resolve(files));
//         form.on('error', err => reject(err));
//         form.parse(req, () => {
//             //
//         });
//     }).catch(e => {
//         console.log(e);
//         status = 500;
//         resultBody = {
//             status: 'fail', message: 'Upload error'
//         };
//     });
//     if (files === null || files === void 0 ? void 0 : files.length) {
//         /* Create directory for uploads */
//         const targetPath = path.join(process.cwd(), `/public/images/`);
//         try {
//             await fs.access(targetPath);
//         }
//         catch (e) {
//             await fs.mkdir(targetPath);
//         }
//         /* Move uploaded files to directory */
//         for (const file of files) {
//             const tempPath = file[1].filepath;
//             await fs.rename(tempPath, targetPath + file[1].originalFilename);
//         }
//     }
//     res.status(status).json(resultBody);
// };
// export default handler;

// import {writeFile} from "fs/promises"

// export default async function handler(req, res){
//     //console.log(req.formData);
//     const data = await req.formData();
//     //const file = data.get('file')
//     const file = req.body

//     if(!file){
//         return res.json({"message" : "no image found", success: false})
//     }

//     //const byteData = await file.arrayBuffer();
//     //const buffer = Buffer.from(byteData)
//     const path = `./public/images/save.png`
//     await writeFile(path, file)
//     return res.json({"message" : "no image found", success: true})
// }
