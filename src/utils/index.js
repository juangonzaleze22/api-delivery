import fs from 'fs';
import path from 'path';

/* Save file */
export const saveFile =  (file) => {
    const noSpaceName = file.name.split(" ").join("");
    const filePath = `../public/uploads/${Date.now()}-${noSpaceName}`;
    const urlPath = `uploads/${Date.now()}-${noSpaceName}`;
    let buffer = Buffer.from(file.base64.split(',')[1], 'base64');
    fs.writeFileSync(path.join(__dirname, filePath), buffer);
    return urlPath
}

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