/* 
* Critically Damped Ease-In/Ease-Out Smoothing
* reference: "Game Programming Gems 4" Chapter 1.10  (ISBN-13: 978-1584502951)
* https://archive.org/details/game-programming-gems-4/mode/2up  (page 96)
* Originally named "SmoothCD", but Unity calls this "SmoothDamp" so we'll stick with that for easier time with google
* I've modified this to run on an array, it makes 2 assumptions:
*  1) Every value uses the same smoothTime and maxSpeed
*  2) Every value can be modified independently of each other
*/
import { FilterInterface } from './filter-interface.js'
export class SmoothDampFilter extends FilterInterface {
    constructor({ smoothTime = 0.1, maxSpeed = Number.MAX_VALUE }) {
        super();
        this.current = [];
        this.currentVelocity = [];
        console.log("SmoothDampFilter: smoothTime",smoothTime," maxSpeed:",maxSpeed);
        this.smoothTime = Math.max(smoothTime, 0.0001);
        this.maxSpeed = maxSpeed;
        this.maxChange = this.maxSpeed * this.smoothTime;
        this.negMaxChange=-1.0*this.maxChange
        this.omega = 2.0 / smoothTime;
        this.lastTime = 0;
        this.initialized = false;
    }
    reset() {
        this.initialized = false;
    }
    /**
     * 
     * @param {number} timestamp 
     * @param {Array<number>} target 
     * @returns 
     */
    filter(timestamp, target) {
        //this.current is updated with the new matrix everytime
        if (!this.initialized) {
            this.currentVelocity= target.map(()=>0);//this.currentVelocity.fill(0, 0, target.length);
            this.current=target.map((value)=>{return value;});
            //output.push(...target);
            this.initialized = true;
        } else {
            const deltaTime = (timestamp - this.lastTime)*0.001;
            
            const x = this.omega * deltaTime;
            const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);

            //for (let i = 0; i < target.length; i++) {
            target.forEach((value,i)=>{
                const originalTo = value;
                //clamp the change between negative and positive max change
                const change = Math.min(Math.max(this.current[i] - value, this.negMaxChange), this.maxChange);
                
                const _target = this.current[i] - change;

                const temp = (this.currentVelocity[i] + this.omega * change) * deltaTime;
                this.currentVelocity[i] = (this.currentVelocity[i] - this.omega * temp) * exp;
                let out = _target + (change + temp) * exp;

                if (originalTo - this.current[i] > 0.0 == out > originalTo) {
                    out = originalTo;
                    this.currentVelocity[i] = (out - originalTo) / deltaTime;
                }
                this.current[i] = out;
            });
        }
        this.lastTime = timestamp;
        return this.current;
    }
}

