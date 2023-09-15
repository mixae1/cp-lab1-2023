class InvalidArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentException';
    }
}

class Cache{
    #data

    constructor() {
        this.data = {}        
    }

    set(key, value = null, appeals = 1) {
        if (isNaN(appeals) || !Number.isInteger(appeals)) // || appeals < 1
            throw new InvalidArgumentException("Number of appeals should be integer value");
        this.data[key] = {"value": value, "appeals": appeals}
    }

    get(key) {
        if (this.data[key] === undefined) return null;
        this.data[key].appeals--;
        let temp = this.data[key].value;
        if (this.data[key].appeals == 0) {
            delete this.data[key]
        }
        return temp
    } 

    size() {
        return Object.keys(this.data).length
    }

    empty = () => this.size() == 0

    get_stat() {
        return JSON.stringify(this.data)
    }
}
export {Cache}