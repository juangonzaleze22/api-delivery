import fs from 'fs';
import path from 'path';

const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

export const saveFile = async (base64) => {
    // Obtén la extensión de la imagen desde la cadena base64
    const extension = base64.split(";")[0].split("/")[1];
    const timestamp = Date.now();
  
    const filePath = `public/uploads/${timestamp}.${extension}`;
    const urlPath = `/uploads/${timestamp}.${extension}`;
  
    // Convierte la cadena base64 en un buffer de archivos
    const buffer = Buffer.from(base64.split(",")[1], "base64");
  
    // Escribe el archivo en el sistema de archivos
    await writeFile(path.join(__dirname, filePath), buffer);
  
    // Devuelve la URL donde se puede acceder al archivo
    return await urlPath;
  };
/* Delete file */
export const deleteFile = (url) => {

    let message = 'Delete file successfully'

    if(url != ''){
        fs.unlink('src/public/' + url, (err) => {
            if (err) {
                message = 'Error deleting file', err;
            }
            console.log(message);
        })
    }

}

/* Calculate Discount Price */

export const calcDiscountPrice = (precio, descuento) => {
    const precioNumber = parseInt(precio)
    const precioDescuento = parseInt(descuento)
    const result = (1 - precioDescuento / 100) * precioNumber;
    return result
}