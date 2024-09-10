var fs = require('fs');
import path from 'path'


class CaruselController {

    static getListImg() {
        const pictPath = path.resolve(__dirname, '..', '..', 'picture', 'slider')
        const files = fs.readdirSync(pictPath);
        return files
    }
}

export default CaruselController