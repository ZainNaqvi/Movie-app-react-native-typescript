import { Dimensions } from "react-native";
import { scale, moderateScale } from "react-native-size-matters";


const screenWidth = Dimensions.get("window").width;
const itemSpacing = scale(12); 
const horizontalPadding = scale(24); 


export const ITEM_WIDTH = (screenWidth - horizontalPadding - itemSpacing) / 2;
