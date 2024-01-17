
export class FilterInterface{
    constructor(opts){}
    /**
     * Called when tracking is lost
     */
    reset(){}
    /**
     * 
     * @param {number} timestamp Passed in every frame. Usually: Date.now()
     * @param {number[]} x Matrix 
     */
    filter(timestamp, x){}
}