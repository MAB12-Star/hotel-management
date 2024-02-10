import React, { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
type Props ={
    rating:number;
}
const Rating: FC <Props> = ({rating}) => {
const fullStars = Math.floor(rating);
const decimalPart= rating - fullStars;

const fullStarEmlements= Array(fullStars).fill(<FaStar/>);

let halfStarElement = null;

if(decimalPart > 0){
    halfStarElement = <FaStarHalf/>
}
return <>
{fullStarEmlements} {halfStarElement}
</>

}

export default Rating