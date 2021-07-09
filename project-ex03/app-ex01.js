/**
 * douzone-dhcho-math.js npm 모듈 테스트(모듈 패키지: 원격 레지스트리 배포)
 * 
 * npm i ../douzone-dhcho-math
 * 명령으로 설치 후, 테스트 할 것
 */

const dzMath = require('douzone-dhcho-math');

console.log(dzMath.sum(1, 2, 3, 4));
console.log(dzMath.max(-10, -20, -30, -40));
console.log(dzMath.min(-1, -2, 0, 1, 2));