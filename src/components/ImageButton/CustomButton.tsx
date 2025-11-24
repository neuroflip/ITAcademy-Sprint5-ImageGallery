import { Button } from "@/components/ui/button";
import type CustomButtonProps from './CustomButton.d';

import './css/CustomButton.css';

const CustomButton = ({ onClick, text, className, size }: CustomButtonProps) => {
    return <Button variant="outline" className={ className } size={ size } onClick={ onClick }>{ text }</Button>
}

export default CustomButton;
